/**
 * seed-scraper is called before a `yarn build`. It's responsible for:
 *  1) getting episode metadata
 *  2) downloading episode thumbnails to disk (if they don't already exist)
 *  3) ensuring metadata is inserted in MongoDB
 */

require('dotenv').config()

const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const mongoose = require('mongoose')
const EpisodeModel = require('./functions/Episode')

// Setup MongoDB connection
const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const IMAGE_FS_DIRECTORY = './src/images/episode-thumbnails/'
const IMDB_PAGES = [
  'https://www.imdb.com/title/tt0386676/episodes?season=1',
  'https://www.imdb.com/title/tt0386676/episodes?season=2',
  'https://www.imdb.com/title/tt0386676/episodes?season=3',
  'https://www.imdb.com/title/tt0386676/episodes?season=4',
  'https://www.imdb.com/title/tt0386676/episodes?season=5',
  'https://www.imdb.com/title/tt0386676/episodes?season=6',
  'https://www.imdb.com/title/tt0386676/episodes?season=7',
  'https://www.imdb.com/title/tt0386676/episodes?season=8',
  'https://www.imdb.com/title/tt0386676/episodes?season=9'
]


// Given a URL, get the page html as a string
const getPage = async (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        // return html data
        return resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// Returns a list of episode metadata.
// Given a page of IMDB HTML, get the episode id, name,
// description, and thumbnail image url
const parseEpisodes = (pageHtml) => {
  const $ = cheerio.load(pageHtml)
  let results = []

  $('.eplist .list_item').each((_, element) => {
    const metadata = $(element).find('.image')
    const episodeImdbLink = `https://www.imdb.com${$(metadata).find('a').attr('href')}`
    const episodeTitle = $(metadata).find('a').attr('title')
    const episodeId = $(metadata).find('div')
                                 .first().text().trim()
                                 .split(', ').join('').toLowerCase()
    const imageUri = $(metadata).find('img').attr('src')

    results.push({
      episodeId,
      episodeTitle,
      imageUri,
      episodeImdbLink
    })
  })

  return results
}

// Given an episode id and the corresponding thumbnail image,
// download the image and save it on the filesystem with the
// name of the episode id
const downloadImage = (episodeId, imageUri) => {
  return new Promise((resolve, reject) => {
    const imagePath = `${IMAGE_FS_DIRECTORY}${episodeId}.jpg`

    axios.get(imageUri, { responseType: 'stream' })
        .then(response => {
          imagedata = response.data
          // save image to disk
          response.data.pipe(fs.createWriteStream(imagePath))
          resolve()
        })
        .catch(error => {
          reject(error)
        })
  })
}


(async () => {
  try {
    // Ensure the image download folder exists
    if (!fs.existsSync(IMAGE_FS_DIRECTORY)) {
      fs.mkdirSync(IMAGE_FS_DIRECTORY)
    }

    const pages = IMDB_PAGES

    console.info('Getting metadata...')

    // Get metadata
    let metadata = []
    for (const page of pages) {
      const text = await getPage(page)
      const episodesMetada = parseEpisodes(text)
      metadata.push(...episodesMetada)
    }

    // If the number of thumnail images on disk is equal to the
    // number of thumbnails to download, assume that we have all
    // thumbnails downloaded.
    const files = fs.readdirSync(IMAGE_FS_DIRECTORY)
    const jpgFiles = files.filter(file => file.endsWith('.jpg'))

    if (jpgFiles.length === metadata.length) {
      console.info('Thumbnails already on disk')
    } else {
      console.info('Downloading thumbnails...')

      // Download images
      for (const item of metadata) {
        await downloadImage(item.episodeId, item.imageUri)
      }
    }

    console.info('Adding metadata to mongodb')
    const mongoResponse = await EpisodeModel.find({}).exec()

    if (mongoResponse.length === metadata.length) {
      // database is already seeded!
      console.info('MongoDB already seeded!')
      mongoose.disconnect()
      return
    }

    // add metadata to MongoDB
    // Create an entry for each piece of metadata
    await EpisodeModel.create(metadata)

    mongoose.disconnect()
  } catch (e) {
    mongoose.disconnect()
    throw Error(e)
  }
})()

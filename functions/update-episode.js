require('dotenv').config()

const mongoose = require('mongoose')
const EpisodeModel = require('./Episode')

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
// Accessible at /.netlify/functions/update-episode
exports.handler = async (event, context) => {
  const MONGO_URI = process.env.MONGO_URI
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    const body = JSON.parse(event.body)
    const episodeId = body.episodeId
    const watched = body.watched
    await EpisodeModel
        .updateOne(
            { episodeId: episodeId },
            { $set: { watched: watched } }
        )
        .exec()
    const response = { message: 'ok' }

    await mongoose.disconnect()

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin' : '*' // Required for CORS support to work
      },
      body: JSON.stringify(response)
    }
  } catch (err) {
    await mongoose.disconnect()
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.toString() })
    }
  }
}

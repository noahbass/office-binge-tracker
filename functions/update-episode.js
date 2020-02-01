require('dotenv').config()

const mongoose = require('mongoose')
const EpisodeModel = require('./Episode')

/**
 * Serverless Function: Retrieve a list of episodes.
 * Accessible at POST /.netlify/functions/update-episode
 * 
 * Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
 */
exports.handler = async (event, context) => {
  // If in a development environment, don't check for netlify
  // identity token. Otherwise, check if an authenticated user
  // accessed this function before continueing
  if (!process.env.NETLIFY_DEV || process.env.NETLIFY_DEV !== 'true') {
    const isAuthenticated = context.clientContext && context.clientContext.user

    if (!isAuthenticated) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'You must be signed in to call this function' })
      }
    }
  }

  const MONGO_URI = process.env.MONGO_URI
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    // Parse POST request for `episodeID` and `watched`
    const body = JSON.parse(event.body)
    const episodeId = body.episodeId
    const watched = body.watched

    // Update an episode by its episodeId
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

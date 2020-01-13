const mongoose = require('mongoose')

const EpisodeSchema = new mongoose.Schema({
  episodeId: { type: String, unique: true, index: true },
  episodeTitle: { type: String, required: true },
  imageUri: { type: String, required: true },
  episodeImdbLink: { type: String, required: true },
  watched: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Episode', EpisodeSchema)

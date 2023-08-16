const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema(
  {
    title: { type: String, unique: true, required: true, dropDups: true },
    slug: String,
    image: [ { type: Schema.Types.ObjectId, ref: 'images' } ],
  },
  { timestamps: true },
)

module.exports = mongoose.model('projects', Project)
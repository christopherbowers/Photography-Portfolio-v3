const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Image = new Schema(
  {
    image_title: String,
    year: String,
    image_url: String,
    project_id: { type: Schema.Types.ObjectId, ref: 'projects' },
  },
  { timestamps: true },
)

module.exports = mongoose.model('images', Image)
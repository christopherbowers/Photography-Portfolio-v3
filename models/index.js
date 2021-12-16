const mongoose = require('mongoose')
const { Schema } = mongoose

const Project = new Schema(
    {
        title: { type: String, unique: true, required: true, dropDups: true },
        image: [{
          title: String,
          year: String,
          image_url: String
         }]
    },
    { timestamps: true },
)

module.exports = mongoose.model('projects', Project)
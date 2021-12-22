const db = require('../db')
const Project = require('../models/projects')
const Image = require('../models/images')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const dropDbs = async () => {
  await Project.collection.drop()
  await Image.collection.drop()
  console.log('Dropped DBs')
}

const run = async () => {
  await dropDbs()
  db.close()
}

run()



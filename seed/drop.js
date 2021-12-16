const db = require('../db')
const Project = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const dropDbs = async () => {
  await Project.collection.drop()
  console.log('Dropped DBs')
}

const run = async () => {
  await dropDbs()
  db.close()
}

run()



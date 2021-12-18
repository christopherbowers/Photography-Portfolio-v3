const db = require('../db')
const Project = require('../models/')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const projects = [
  {
    title: "Constant Illuminations",
    slug: "constant-illuminations",
    image: [
      {
        image_title: "Lindsay",
        year: "2008"
      }
    ]
  },
  {
    title: "Stunts",
    slug: "stunts",
    image: [
      {
        image_title: "Wallride",
        year: "2008"
      }
    ]
  }
  ]

  await Project.insertMany(projects)
  console.log("Created projects")
}

const dropDbs = async () => {
  await Project.collection.drop()
  console.log('Dropped DBs')
}

const run = async () => {
  await dropDbs()
  await main()
  db.close()
}

run()
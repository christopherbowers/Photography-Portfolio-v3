const db = require('../db')
const Project = require('../models/projects')
const Image = require('../models/images')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const projects = async () => {
  const projects = [
  {
    title: "Constant Illuminations",
    slug: "constant-illuminations",
    image: []
  }
]
  await Project.insertMany(projects)
  console.log("Created projects")
}

const images = async () => {

const project = await Project.find({ title: 'Constant Illuminations' })

  const images = [
      {
        image_title: "Lindsay",
        year: "2008",
        image_url: "/images/lindsay.jpg",
        project_title: project[0].slug
      },
      {
        image_title: "Alyssa",
        year: "2008",
        image_url: "/images/alyssa.jpg",
        project_title: project[0].slug
      },
      {
        image_title: "Casey",
        year: "2008",
        image_url: "/images/casey.jpg",
        project_title: project[0].slug
      },
      {
        image_title: "Christopher",
        year: "2008",
        image_url: "/images/christopher.jpg",
        project_title: project[0].slug
      },
      {
        image_title: "Devlyn",
        year: "2008",
        image_url: "/images/devlyn.jpg",
        project_title: project[0].slug
      },
      {
        image_title: "erica",
        year: "2008",
        image_url: "/images/erica.jpg",
        project_title: project[0].slug
      },
      {
        image_title: "Matt",
        year: "2008",
        image_url: "/images/matt.jpg",
        project_title: project[0].slug
      },
      {
        image_title: "Pam",
        year: "2008",
        image_url: "/images/pam.jpg",
        project_title: project[0].slug
      }
    ]

  await Image.insertMany(images)
  console.log("Created images")
}

const dropDbs = async () => {
  await Project.collection.drop()
  await Image.collection.drop()
  console.log('Dropped DBs')
}

const run = async () => {
  await dropDbs()
  await projects()
  await images()
  db.close()
}

run()
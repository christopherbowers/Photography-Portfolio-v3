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
        year: "2008",
        image_url: "/images/lindsay.jpg"
      },
      {
        image_title: "Alyssa",
        year: "2008",
        image_url: "/images/alyssa.jpg"
      },
      {
        image_title: "Casey",
        year: "2008",
        image_url: "/images/casey.jpg"
      },
      {
        image_title: "Christopher",
        year: "2008",
        image_url: "/images/christopher.jpg"
      },
      {
        image_title: "Devlyn",
        year: "2008",
        image_url: "/images/devlyn.jpg"
      },
      {
        image_title: "erica",
        year: "2008",
        image_url: "/images/erica.jpg"
      },
      {
        image_title: "Matt",
        year: "2008",
        image_url: "/images/matt.jpg"
      },
      {
        image_title: "Pam",
        year: "2008",
        image_url: "/images/pam.jpg"
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
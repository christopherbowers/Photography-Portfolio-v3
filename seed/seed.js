const db = require('../db')
const Project = require('../models/')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const projects = {
      title: "Constant Illuminations",
      image: [
        {
          title: "Lindsay",
          year: "2008"
        }
      ]
    }

    await Project.insertMany(projects)
    console.log("Created projects")
}

const run = async () => {
    await main()
    db.close()
}

run()
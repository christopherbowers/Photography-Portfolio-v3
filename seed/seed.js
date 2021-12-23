const db = require('../db')
const Project = require('../models/projects')
const Image = require('../models/images')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const projects = async () => {
  const projects = [
  {
    _id: "61c391cd5186d00a6f8f9908",
    title: "Constant Illuminations",
    slug: "constant-illuminations",
    image: [
      "61c3b6b328a4d3375b83baf5",
      "61c3b6b328a4d3375b83baf0",
      "61c3b2cb0b1ac73cefd6b09b",
      "61c3b255b5f38d196bfbd18b",
      "61c3b255b5f38d196bfbd18a",
      "61c3b255b5f38d196bfbd18c",
      "61c3b6b328a4d3375b83baf5",
      "61c3ad1744c41ec39162c679",
      "61c3aca638219c178120cf74"
    ]
  },
    {
    _id: "61c4c18bb01ba9b2ca0a721c",
    title: "The Next Frame",
    slug: "the-next-frame",
    image: [
    "61c4c64b69398e159976eddd",
    "61c4c65169398e159976ede1",
    "61c4c65569398e159976ede5",
    "61c4c65869398e159976ede9",
    "61c4c65a69398e159976eded"
    ]
  }
]
  await Project.insertMany(projects)
  console.log("Created projects")
}


const images = async () => {
  const images = [
  {
      _id: "61c3aca638219c178120cf74",
      image_title: "Lindsay",
      year: "2008",
      image_url: "/images/lindsay.jpg",
      project_id: "61c391cd5186d00a6f8f9908"
    },
    {
      _id: "61c3ad1744c41ec39162c679",
      image_title: "Alyssa",
      year: "2008",
      image_url: "/images/alyssa.jpg",
      project_id: "61c391cd5186d00a6f8f9908"
    },
    {
      _id: "61c3b6b328a4d3375b83baf5",
      image_title: "Casey",
      year: "2008",
      image_url: "/images/casey.jpg",
      project_id: "61c391cd5186d00a6f8f9908"
    },
    {
      _id: "61c3b255b5f38d196bfbd18c",
      image_title: "Christopher",
      year: "2008",
      image_url: "/images/christopher.jpg",
      project_id: "61c391cd5186d00a6f8f9908"
    },
    {
      _id: "61c3b255b5f38d196bfbd18a",
      image_title: "Devlyn",
      year: "2008",
      image_url: "/images/devlyn.jpg",
      project_id: "61c391cd5186d00a6f8f9908"
    },
    {
      _id: "61c3b255b5f38d196bfbd18b",
      image_title: "erica",
      year: "2008",
      image_url: "/images/erica.jpg",
      project_id: "61c391cd5186d00a6f8f9908"
    },
    {
      _id: "61c3b2cb0b1ac73cefd6b09b",
      image_title: "Matt",
      year: "2008",
      image_url: "/images/matt.jpg",
      project_id: "61c391cd5186d00a6f8f9908"
    },
    {
      _id: "61c3b6b328a4d3375b83baf0",
      image_title: "Pam",
      year: "2008",
      image_url: "/images/pam.jpg",
      project_id: "61c391cd5186d00a6f8f9908"
    },
    {
			_id: "61c4c64b69398e159976eddd",
			image_tittle: "The Next Frame",
			year: "2008",
			image_url: "/images/1.the-next-frame.jpg",
			project_id: "61c4c18bb01ba9b2ca0a721c",
		},
		{
			_id: "61c4c65169398e159976ede1",
			image_tittle: "The Next Frame",
			year: "2008",
			image_url: "/images/2.the-next-frame.jpg",
			project_id: "61c4c18bb01ba9b2ca0a721c",
		},
		{
			_id: "61c4c65569398e159976ede5",
			image_tittle: "The Next Frame",
			year: "2008",
			image_url: "/images/3.the-next-frame.jpg",
			project_id: "61c4c18bb01ba9b2ca0a721c",
		},
		{
			_id: "61c4c65869398e159976ede9",
			image_tittle: "The Next Frame",
			year: "2008",
			image_url: "/images/4.the-next-frame.jpg",
			project_id: "61c4c18bb01ba9b2ca0a721c",
		},
		{
			_id: "61c4c65a69398e159976eded",
			image_tittle: "The Next Frame",
			year: "2008",
			image_url: "/images/5.the-next-frame.jpg",
			project_id: "61c4c18bb01ba9b2ca0a721c",
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
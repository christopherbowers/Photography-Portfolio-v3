const express = require('express')
const routes = require('./routes')
const db = require('./db')
const bodyParser = require('body-parser')
const cors = require('cors')

const multer = require('multer')
const slugify = require('slugify')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const PORT = process.env.PORT || 3001

let storage = multer.diskStorage(
  {
    destination: 'uploads/',
    filename: function ( req, file, cb ) {
      cb( null, slugify(file.originalname, {remove: /[*+~()'"!:@]/g}).toLowerCase());
    }
  }
)

const upload = multer( { storage: storage } );

const { uploadFile, getFileStream } = require('./controllers/s3')


const app = express()
const logger = require('morgan')

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(cors())

// Send files to S3
app.post('/images', upload.single('image'), async (req, res) => {
  
  const file = req.file
  console.log(file)

  const result = await uploadFile(file)
  await unlinkFile(file.path)
  console.log(result)
  const description = req.body.description
  console.log(description)
  res.send({imagePath: `/images/${result.Key}`})
  
})

// Get files from S3
app.get('/images/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})

app.use('/api', routes)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => console.log(`Express Listening on port: ${PORT}`))
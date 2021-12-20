const express = require('express')
const routes = require('./routes')
const db = require('./db')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')


const PORT = process.env.PORT || 3001


const app = express()
const logger = require('morgan')



app.use(express.static(path.join(__dirname, "client", "build")))

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(cors())


app.use('/api', routes)


db.on('error', console.error.bind(console, 'MongoDB connection error:'))


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(PORT, () => console.log(`Express Listening on port: ${PORT}`))

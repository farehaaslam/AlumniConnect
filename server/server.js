const express = require('express')
const cors = require('cors')
const helmet = require('helmet') // Import Helmet for security
const userRouter = require('./routes/user.routes')
const mongoose = require('mongoose') // Initialize express app
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())
const connectToMongoDB = async (url) => {
    try {
      await mongoose.connect(url)
      console.log('Connected to MongoDB successfully.')
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error.message)
      process.exit(1)
    }
  }

  app.use('/', userRouter)
  const startServer = async () => {
    try {
      await connectToMongoDB(process.env.URL_DB)
      app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`)
      })
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error.message)
      process.exit(1) // Exit the process with failure
    }
  }
  startServer()

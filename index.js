import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'

// files import
import TaskRoutes from './routes/taskRoutes.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(cookieParser())
app.use(cors())
app.use(morgan('common'))

app.use('/api/v1/tasks', TaskRoutes)

const PORT = process.env.PORT || 6000
// MONGODB CONNECTION

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('database connection successful')
    app.listen(PORT, (req, res) => {
      console.log(`server is lisning to port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error, "can't able to connect the database")
  })

import express from 'express'
// import bodyParser from 'body-parser'// no need to use it anymore, depracated
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'
import authRoutes from './routes/auth.routes'
import devBundle from './devBundle' // not for for production
//request for static files
import path from 'path'


const app = express()
devBundle.compile(app) // not for production 
app.use(express.json()) //no need to use bodyParser anymore
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.get('/', (req, res) => {
  res.status(200).send(Template())
 })
app.use('/', authRoutes)
//catch any errors by express-JWT
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }else if (err) {
    res.status(400).json({"error" : err.name + ": " + err.message})
    console.log(err)
  }
})

//request for static files => path
const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

export default app
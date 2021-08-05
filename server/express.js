import express from 'express'
// import bodyParser from 'body-parser'// no need to use it anymore, depracated
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template'

const app = express()

app.use(express.json()) //no need to use bodyParser anymore
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.get('/', (req, res) => {
  res.status(200).send(Template())
 })

export default app
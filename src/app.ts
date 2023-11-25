import express, { Application, Request, Response } from 'express'
const app:Application = express()
import cors from 'cors'
import router from './app/modules/user/user.route'

app.use(express.json())
app.use(cors())

app.use('/api/users',router);

app.get('/', (req:Request, res:Response) => {
  res.send('Start Assignment 2!')
})

export default app;
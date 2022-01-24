import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import favicon from 'serve-favicon'
import io from 'socket.io'
import axios from 'axios'
import translate from 'translate-google'

import config from './config'
import mongooseService from './services/mongoose'

import foodModel from './mongodb/models/foodModel'

import Html from '../client/html'

const { resolve } = require('path')

const server = express()
const httpServer = http.createServer(server)

const PORT = config.port

const middleware = [
  cors(),
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, '../dist')),
  favicon(`${__dirname}/public/favicon.ico`)
  //  setHeaders
]

middleware.forEach((it) => server.use(it))

// Set headers for nutritionix.com API
const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients'

const headers = {
  'x-app-id': config['x-app-id'],
  'x-app-key': config['x-app-key'],
  'x-remote-user-id': '0'
}

server.get('/api/v1/:product', async (req, res) => {
  const { product } = req.params

  const translatedProduct = await translate(product, { to: 'en' })
    .then((res) => res.toLowerCase())
    .catch((err) => {
      console.log(err)
      res.json({
        status: 'error',
        data: err
      })
    })

  try {
    const productCard = await foodModel.findOne({ name: translatedProduct })
    if (!productCard) {
      throw Error('Unknown product')
    }
    console.log('Product: ', productCard)
    res.json({
      status: 'success',
      data: productCard
    })
  } catch (err) {
    console.log(`No product found. Looking for ${translatedProduct} in API`)

    await axios({
      method: 'post',
      url,
      headers,
      data: {
        query: `${translatedProduct} 100g`
      }
    })
      .then(({ data }) => data.foods[0])
      .then(
        ({
          ndb_no,
          food_name,
          nf_calories,
          nf_total_fat,
          nf_total_carbohydrate,
          nf_protein
        }) => ({
          nutritionix_iddb: ndb_no,
          name: food_name,
          calories: nf_calories,
          fat: nf_total_fat,
          carbohydrate: nf_total_carbohydrate,
          protein: nf_protein
        })
      )
      .then(async (productFromAPI) => {
        try {
          const data = await foodModel.create(productFromAPI)
          console.log('New product was added')
          res.json({
            status: 'success',
            data
          })
        } catch (err) {
          console.log(err)
          res.json({
            status: 'error',
            data: err
          })
        }
      })
      .catch((error) => {
        console.log(err)
        res.json({
          status: 'error',
          data: error
        })
      })
  }
})

server.get('/', (req, res) => {
  res.send('Express Server')
})

// MongoDB
if (config.mongoEnabled) {
  // eslint-disable-next-line
  console.log('MongoDB Enabled: ', config.mongoEnabled)
  mongooseService.connect()
}

// SocketsIO
if (config.socketsEnabled) {
  // eslint-disable-next-line
  console.log('Sockets Enabled: ', config.socketsEnabled)
  const socketIO = io(httpServer, {
    path: '/ws'
  })

  socketIO.on('connection', (socket) => {
    console.log(`${socket.id} login`)

    socket.on('disconnect', () => {
      console.log(`${socket.id} logout`)
    })
  })
}

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

httpServer.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Serving at http://localhost:${PORT}`)
})

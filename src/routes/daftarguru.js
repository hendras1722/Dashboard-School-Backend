const express = require('express')
const Route = express.Router()
const corsOptions = require('../configs')
const cors = require('cors')
const upload = require('../controllers/upload')

const {
  posAll,
  insertData,
  posDetail,
  deleteData,
  updateData
} = require('../controllers/daftarguru')

const {
  reduceProduct
} = require('../controllers/order')

const {
  authentication,
  authorization
} = require('../helpers/auth')

Route
  .get('/get-daftar-guru', posAll)
  .get('/get-daftar-guru/:posId', posDetail)
  .post('/post-daftar-guru', upload.single('image'), insertData)
  .patch('/update-daftar-guru/:posId', upload.single('image'), updateData)
  .delete('/delete-daftar-guru/:posId', deleteData)


// .post('/product/reduce', reduceProduct)
module.exports = Route
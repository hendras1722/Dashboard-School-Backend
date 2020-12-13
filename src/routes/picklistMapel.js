const express = require('express')
const Route = express.Router()
const corsOptions = require('../configs')
const cors = require('cors')
const upload = require('../controllers/upload')

const {
    createMapel,
    readMapel
} = require('../controllers/picklistMapel')

const {
    reduceProduct
} = require('../controllers/order')

const {
    authentication,
    authorization
} = require('../helpers/auth')

Route
    .get('/get-daftar-listmapel', readMapel)
    //   .get('/get-daftar-guru/:posId', posDetail)
    .post('/post-daftar-listmapel', createMapel)
//   .patch('/update-daftar-guru/:posId', upload.single('image'), updateData)
//   .delete('/delete-daftar-guru/:posId', deleteData)


// .post('/product/reduce', reduceProduct)
module.exports = Route
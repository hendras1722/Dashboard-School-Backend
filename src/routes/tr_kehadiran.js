const express = require('express')
const Route = express.Router()
const corsOptions = require('../configs')
const cors = require('cors')
const upload = require('../controllers/upload')

const {
    createData,
    getData
} = require('../controllers/tr_kehadiran')

const {
    reduceProduct
} = require('../controllers/order')

const {
    authentication,
    authorization
} = require('../helpers/auth')

Route
    .get('/get-daftar-absen', authentication, authorization, getData)
    //   .get('/get-daftar-guru/:posId', posDetail)
    .post('/post-daftar-absen', createData)
//   .patch('/update-daftar-guru/:posId', upload.single('image'), updateData)
//   .delete('/delete-daftar-guru/:posId', deleteData)


// .post('/product/reduce', reduceProduct)
module.exports = Route
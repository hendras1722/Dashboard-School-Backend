const express = require('express')
const Route = express.Router()
const corsOptions = require('../configs')
const cors = require('cors')
const upload = require('../controllers/upload')

const {
    createData,
    getData,
    updateData,
    updateGuru,
    deleteData
} = require('../controllers/tugas')

const {
    reduceProduct
} = require('../controllers/order')

const {
    authentication,
    authorization
} = require('../helpers/auth')

Route
    .get('/get-daftar-tugas', getData)
    //   .get('/get-daftar-guru/:posId', posDetail)
    .post('/post-daftar-tugas', upload.single('image'), createData)
    .patch('/update-daftar-tugas/:id', upload.single('image'), updateData)
    .patch('/update-daftar-tugas-guru/:id', upload.single('image'), updateGuru)
    .delete('/delete-daftar-tugas/:id', deleteData)


// .post('/product/reduce', reduceProduct)
module.exports = Route
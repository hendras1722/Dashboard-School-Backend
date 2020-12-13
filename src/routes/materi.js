const express = require('express')
const Route = express.Router()
const corsOptions = require('../configs')
const cors = require('cors')
const upload = require('../controllers/upload')

const {
    createData,
    getData
} = require('../controllers/materi')

const {
    reduceProduct
} = require('../controllers/order')

const {
    authentication,
    authorization
} = require('../helpers/auth')

Route
    .get('/get-daftar-materi', getData)
    // .get('/get-daftar-siswa/:id', getDetail)
    .post('/post-daftar-materi', upload.single('image'), createData)
// .patch('/update-daftar-siswa/:id', upload.single('image'), updateData)
// .delete('/delete-daftar-siswa/:id', deleteData)


// .post('/product/reduce', reduceProduct)
module.exports = Route
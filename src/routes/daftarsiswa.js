const express = require('express')
const Route = express.Router()
const corsOptions = require('../configs')
const cors = require('cors')
const upload = require('../controllers/upload')

const {
    createData,
    getAll,
    getDetail,
    deleteData,
    updateData
} = require('../controllers/daftarsiswa')

const {
    reduceProduct
} = require('../controllers/order')

const {
    authentication,
    authorization
} = require('../helpers/auth')

Route
    .get('/get-daftar-siswa', getAll)
    .get('/get-daftar-siswa/:id', getDetail)
    .post('/post-daftar-siswa', upload.single('image'), createData)
    .patch('/update-daftar-siswa/:id', upload.single('image'), updateData)
    .delete('/delete-daftar-siswa/:id', deleteData)


// .post('/product/reduce', reduceProduct)
module.exports = Route
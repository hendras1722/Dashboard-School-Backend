const style = require('../models/daftarsiswa')
const myHelper = require('../helpers/status')
const { v4 } = require('uuid')
const { response } = require('express')

module.exports = {
    createData: async (request, response) => {
        try {
            const {
                id_siswa,
                kelas,
                alamat,
                Contact,
                ContactDarurat
            } = request.body
            const data = {
                id_siswa,
                kelas,
                alamat,
                foto: `http://localhost:4000/uploads/${request.file?.filename}`,
                Contact,
                ContactDarurat
            }
            const result = await style.createData(data)
            myHelper.response(response, 200, result)
        } catch (e) {
            console.log(e, 'inie')
            myHelper.customErrorResponse(response, 400, "error coy")
        }
    },
    getAll: async (request, response) => {
        const searchName = request.query.searchName
        const limit = request.query.limit || await style.countData()
        const totalData = await style.countData()
        const totalPages = Math.ceil((totalData / limit))
        const pager = {
            totalPages
        }
        const result = await style.getAll(searchName, limit)
        myHelper.customResponse(response, 200, result, pager, totalData)
        try {
        } catch (e) {
            myHelper.customErrorResponse(response, 400, "Data Tidak Ditemukan")
        }
    },
    getDetail: async (request, response) => {
        const id = request.params.id
        const result = await style.getDetail(id)
        myHelper.response(response, 200, result)
        try {
        } catch (e) {
            myHelper.customErrorResponse(response, 400, "Data Tidak Ditemukan")
        }
    },
    updateData: async (request, response) => {
        try {
            const id = request.params.id
            const data = {
                id_siswa: request.body.id_siswa,
                nama: request.body.nama,
                nis: request.body.nis,
                kelas: request.body.kelas,
                alamat: request.body.alamat,
                foto: `http://localhost:4000/uploads/${request.file?.filename}`,
                Contact: request.body.Contact,
                ContactDarurat: request.body.ContactDarurat
            }
            const result = await style.updateData(data, id)

            myHelper.response(response, 200, result)
        } catch (e) {
            myHelper.customErrorResponse(response, 400, "Data Gagal Dihapus")
        }
    },
    deleteData: async (request, response) => {
        try {
            const id = request.params.id
            const result = await style.deleteData(id)

            myHelper.response(response, 200, result)
        } catch (e) {
            myHelper.customErrorResponse(response, 400, "Data Gagal Dihapus")
        }
    }
}

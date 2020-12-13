const { v4 } = require('uuid')
const style = require('../models/materi')
const myHelper = require('../helpers/status')
const { request, response } = require('express')

module.exports = {
    createData: async (request, response) => {
        try {
            const {
                id_materi,
                kelas,
            } = request.body
            const data = {
                id_materi,
                file: `http://localhost:4000/uploads/${request.file?.filename}`,
                kelas,
                created_at: new Date(),
                updated_at: new Date()
            }
            const result = await style.createData(data)
            myHelper.response(response, 200, result)
        } catch (e) {
            myHelper.response(response, 400, "Data Tidak ditemukan")
        }
    },
    getData: async (request, response) => {
        const materi = request.query.materi
        const kelas = request.query.kelas
        const result = await style.getData(materi, kelas)
        myHelper.response(response, 200, result)
        try {
        } catch (e) {
            myHelper.customErrorResponse(response, 400, "data tidak ada")
        }
    }
}
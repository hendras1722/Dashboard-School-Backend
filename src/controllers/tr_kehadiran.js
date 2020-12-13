const { v4 } = require('uuid')
const style = require('../models/tr_kehadiran')
const myHelper = require('../helpers/status')

module.exports = {
    createData: async (request, response) => {
        try {
            const {
                id_siswa,
                kehadiran,
                catatan
            } = request.body
            const data = {
                id_siswa,
                kehadiran,
                catatan,
                created_at: new Date(),
                updated_at: new Date()
            }
            const result = await style.createData(data)
            myHelper.response(response, 200, result)
        } catch (e) {
            myHelper.customErrorResponse(response, 400, "Gagal Absen")
        }
    },
    getData: async (request, response) => {
        try {
            const idSiswa = request.query.idSiswa
            const result = await style.getData(idSiswa)
            myHelper.response(response, 200, result)
        } catch (e) {
            myHelper.customErrorResponse(response, 400, "Gagal Absen")
        }
    }
}
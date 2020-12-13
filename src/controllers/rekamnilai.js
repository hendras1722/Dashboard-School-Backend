const style = require('../models/rekamnilai')
const myHelper = require('../helpers/status')
// const {v4} = require('uuid')
const { request, response } = require('express')

module.exports = {
    createData: async (request, response) => {
        const {
            id_siswa,
            id_guru,
            mapel,
            semester,
            nilai
        } = request.body
        const data = {
            id_siswa,
            id_guru,
            mapel,
            semester,
            nilai,
            created_at: new Date(),
            updated_at: new Date()
        }
        const result = await style.createData(data)
        myHelper.response(response, 200, result)
        try {
        } catch (e) {
            myHelper.customErrorResponse(response, 400, "Data Gagal Ditambah")
        }
    },
    getData: async (request, response) => {
        try {
            const searchName = request.query.searchName
            const semester = request.query.semester

            const result = await style.getData(searchName, semester)
            myHelper.response(response, 200, result)
        } catch (e) {
            myHelper.customErrorResponse(response, 200, "Data Tidak Ada")
        }
    }
}
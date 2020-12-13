const { v4 } = require('uuid')
const style = require('../models/tugas')
const myHelper = require('../helpers/status')

module.exports = {
    createData: async (request, response) => {
        const {
            id_siswa,
            id_guru,
            mapel
        } = request.body
        const data = {
            id_file: v4(),
            id_siswa,
            id_guru,
            mapel,
            tugas: `http://192.168.1.13:4000/uploads/${request.file?.filename}`,
            created_at: new Date(),
            updated_at: new Date()
        }
        const result = await style.createDate(data)
        try {
            myHelper.response(response, 200, result)
        } catch (e) {
            myHelper.response(response, 400, "Gagal Nambah Tugas")
        }
    },
    getData: async (request, response) => {
        try {
            const mapel = request.query.mapel
            const idSiswa = request.query.idSiswa
            const result = await style.getData(mapel, idSiswa)
            myHelper.response(response, 200, result)
        } catch (e) {
            myHelper.response(response, 400, "Tidak Ada Data")
        }
    },
    updateData: async (request, response) => {
        const id = request.params.id
        const data = {
            id_file: request.body.id_file,
            id_siswa: request.body.id_siswa,
            id_guru: request.body.id_guru,
            mapel: request.body.mapel,
            status: request.body.status,
            tugas: `http://192.168.1.13:4000/uploads/${request.file?.filename}`,
            updated_at: new Date()
        }
        const result = await style.updateData(data, id)
        myHelper.response(response, 200, result)
        try {
        } catch (e) {
            myHelper.response(response, 400, "Tidak Ada Data")
        }
    },
    updateGuru: async (request, response) => {
        const id = request.params.id
        const data = {
            id_file: request.body.id_file,
            id_siswa: request.body.id_siswa,
            id_guru: request.body.id_guru,
            mapel: request.body.mapel,
            status: request.body.status,
            tugas: `http://192.168.1.13:4000/uploads/${request.file?.filename}`,
            updated_at: new Date()
        }
        const result = await style.updateGuru(data, id)
        myHelper.response(response, 200, result)
        try {
        } catch (e) {
            myHelper.response(response, 400, "Tidak Ada Data")
        }
    },
    deleteData: async (request, response) => {
        try {
            const id = request.params.id
            const result = await style.deleteData(id)
            myHelper.response(response, 200, result)
        } catch (e) {
            myHelper.customErrorResponse(response, 200, "Hapus Delete")
        }


    }
}
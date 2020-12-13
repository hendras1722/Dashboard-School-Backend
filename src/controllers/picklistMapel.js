const { response, request } = require('express')
const style = require('../models/picklistMapel')
const myHelper = require('../helpers/status')
const { v4 } = require('uuid')

module.exports = {
    createMapel: async (request, response) => {
        const id = v4()
        const loop = request.body
        await loop.list.map(item => {
            console.log(item, 'iki item')
            const data = {
                id,
                uraianLabel: item.uraianLabel,
                value: item.value
            }
            style.createMapel(data)
        })
        myHelper.response(response, 200, "Berhasil")
        try {
        } catch (e) {
            myHelper.customErrorResponse(response, 400, "Gagal Buat Picklist")
        }
    },
    readMapel: async (request, response) => {
        try {
            const result = await style.readMapel()
            myHelper.response(response, 200, result)
        } catch (e) {
            myHelper.response(response, 400, "Data Tidak Ditemukan")
        }
    }
}
const posStyle = require('../models/daftarguru')
const myConnection = require('../helpers/status')
const { port } = require('../configs')
const { v4 } = require('uuid')
// const uuid = require('uuid')

module.exports = {
    posAll: async (request, response) => {

        try {
            const limit = request.query.limit || await posStyle.countData()
            const activePage = request.query.page || 1
            const searchName = request.query.searchName || ''
            const sortBy = request.query.sortBy
            const orderBy = request.query.orderBy || 'ASC'
            const name_category = request.query.name_category || ''
            const idCat = request.query.idCat || ''
            const posId = request.params.posId
            const totalData = await posStyle.countData()
            const totalPages = Math.ceil((totalData / limit))
            const pager = {
                totalPages
            }

            const result = await posStyle.posAll(limit, activePage, searchName, sortBy, orderBy, idCat, posId, totalData)
            console.log(result, 'iniresult')
            const totalindata = {
                totalData
            }
            console.log(totalData)
            myConnection.customResponse(response, 200, result, pager, totalData)
        } catch (error) {
            myConnection.customErrorResponse(response, 404, 'Ups!!! you have problem at posAll')
        }
    },
    posDetail: async (request, response) => {
        try {
            const posId = request.params.posId
            const result = await posStyle.posDetail(posId)
            myConnection.response(response, 200, result)
        } catch (error) {
            myConnection.customErrorResponse(response, 404, 'Ups!!! you have problem at posDetail')
        }
    },
    insertData: async (request, response) => {
        const {
            id_guru,
            status_guru,
            mapel
        } = request.body

        const data = {
            id_guru,
            foto: `http://192.168.1.13:4000/uploads/${v4()}${request.file?.filename}`,
            status_guru,
            mapel,
            created_at: new Date(),
            updated_at: new Date()
        }

        const result = await posStyle.insertData(data)

        myConnection.response(response, 200, result, 'Success Uploaded')
        try {
            // const id = uuidv4()

        } catch (error) {
            myConnection.customErrorResponse(response, 404, 'Ups!!! you have problem at insertData or File not recruitment')
        }
    },
    updateData: async (request, response) => {

        const id = request.params.posId
        const data = {
            nama: request.body.nama,
            nip: request.body.nip,
            foto: `http://192.168.1.13:4000/uploads/${request.file?.filename}`,
            status_guru: request.body.status_guru,
            mapel: request.body.mapel,
            updated_at: new Date()
        }

        const result = await posStyle.updateData(data, id)
        myConnection.response(response, 200, result)
        try {

        } catch (error) {
            myConnection.customErrorResponse(response, 404, 'Ups!!! you have problem at updateData')
        }
    },
    deleteData: async (request, response) => {

        const posId = request.params.posId
        const result = await posStyle.deleteData(posId)
        console.log(posId)
        // const deleteData = {
        //     id: parseInt(posId)
        // }
        myConnection.response(response, 200, result)
        try {
        } catch (error) {
            myConnection.customErrorResponse(response, 404, 'Ups!!! you have problem at updateData')
        }
    }
}

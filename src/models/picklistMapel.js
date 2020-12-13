const { resolve } = require('path')
const connection = require('../configs/mysql')

module.exports = {
    createMapel: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO picklistmapel SET ?`, data, ((error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            }))
        })
    },
    readMapel: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM picklistmapel', ((error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            }))
        })
    }
}
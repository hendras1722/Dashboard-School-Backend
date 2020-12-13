const { resolve } = require('path')
const connection = require('../configs/mysql')

module.exports = {
    createData: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO tr_nilaisiswa SET ?', data, ((error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            }))
        })
    },
    getData: (name, semester) => {
        return new Promise((resolve, reject) => {
            if (name || semester) {
                connection.query(`SELECT tr_nilaisiswa.*, picklistmapel.uraianLabel AS mapel, user.name AS siswa, user_guru.name AS guru FROM tr_nilaisiswa INNER JOIN picklistmapel ON tr_nilaisiswa.mapel = picklistmapel.value LEFT JOIN user ON tr_nilaisiswa.id_siswa = user.id INNER JOIN user_guru ON tr_nilaisiswa.id_guru = user_guru.id WHERE user.name LIKE "%${name}%" AND tr_nilaisiswa.semester LIKE "%${semester}%"`, ((error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                }))
            } else {
                connection.query(`SELECT tr_nilaisiswa.*, picklistmapel.uraianLabel AS mapel, user.name AS siswa, user_guru.name AS guru FROM tr_nilaisiswa INNER JOIN picklistmapel ON tr_nilaisiswa.mapel = picklistmapel.value LEFT JOIN user ON tr_nilaisiswa.id_siswa = user.id INNER JOIN user_guru ON tr_nilaisiswa.id_guru = user_guru.id`, ((error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                }))
            }
        })
    }
}

// SELECT tr_nilaisiswa.*, picklistmapel.uraianLabel AS mapel, user.name AS siswa, user.name AS guru FROM `tr_nilaisiswa` INNER JOIN picklistmapel ON tr_nilaisiswa.mapel = picklistmapel.value LEFT JOIN user ON tr_nilaisiswa.id_siswa = user.id

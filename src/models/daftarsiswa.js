const { resolve } = require('path')
const connection = require('../configs/mysql')

module.exports = {
    createData: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO tr_daftarsiswa SET ?`, data, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    getAll: (searchName, limit) => {
        return new Promise((resolve, reject) => {
            if (searchName) {
                connection.query(`SELECT tr_daftarsiswa.*, user.id, user.name,user.ni, user.status FROM tr_daftarsiswa
                INNER JOIN user ON tr_daftarsiswa.id_siswa = user.id
                WHERE user.name LIKE '%${searchName}%' LIMIT ${limit}`, (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            } else {
                connection.query(`SELECT tr_daftarsiswa.*, user.id, user.name,user.ni, user.status FROM tr_daftarsiswa
                INNER JOIN user ON tr_daftarsiswa.id_siswa = user.id`, (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            }
        })
    },
    getDetail: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT tr_daftarsiswa.*, user.id, user.name,user.ni, user.status FROM tr_daftarsiswa INNER JOIN user ON tr_daftarsiswa.id_siswa = user.id WHERE tr_daftarsiswa.id_siswa = ?', id, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    updateData: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE tr_daftarsiswa SET ? WHERE id_siswa = ?', [data, id], (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    deleteData: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM tr_daftarsiswa WHERE id_siswa = ?', id, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    countData: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT count(*) as totalData FROM tr_daftarsiswa', (error, result) => {
                resolve(result[0].totalData)
            })
        })
    }
}
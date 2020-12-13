const connection = require('../configs/mysql')

module.exports = {
    createData: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO tr_absen SET ?', data, ((error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            }))
        })
    },
    getData: (data) => {
        return new Promise((resolve, reject) => {
            if (data) {
                const sql = `SELECT tr_absen.*,user.name FROM tr_absen INNER JOIN user ON tr_absen.id_siswa = user.id WHERE tr_absen.id_siswa LIKE "%${data}%"`
                console.log(sql, 'insql')
                connection.query(sql, ((error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                }))
            } else {
                connection.query('SELECT tr_absen.*,user.name FROM tr_absen INNER JOIN user ON tr_absen.id_siswa = user.id', ((error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                }))
            }
        })
    }
}
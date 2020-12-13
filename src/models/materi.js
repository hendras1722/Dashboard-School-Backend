const connection = require('../configs/mysql')

module.exports = {
    createData: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO tr_materi SET ?', data, ((error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            }))
        })
    },
    getData: (materi, kelas) => {
        return new Promise((resolve, reject) => {
            if (materi) {
                const sql = `SELECT tr_materi.*, picklistmapel.uraianLabel, tr_kelas.kelas FROM tr_materi INNER JOIN picklistmapel ON tr_materi.id_materi = picklistmapel.id INNER JOIN tr_kelas ON tr_materi.kelas = tr_kelas.id_kelas WHERE tr_materi.id_materi = "${materi}"`
                console.log(sql, 'inisql')
                connection.query(sql, ((error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                }))
            } if (kelas) {
                const sql = `SELECT tr_materi.*, picklistmapel.uraianLabel, tr_kelas.kelas FROM tr_materi INNER JOIN picklistmapel ON tr_materi.id_materi = picklistmapel.id INNER JOIN tr_kelas ON tr_materi.kelas = tr_kelas.id_kelas WHERE tr_materi.kelas = ${kelas}`
                console.log(sql, 'inisql')
                connection.query(sql, ((error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                }))
            } if (kelas && materi) {
                const sql = `SELECT tr_materi.*, picklistmapel.uraianLabel, tr_kelas.kelas FROM tr_materi INNER JOIN picklistmapel ON tr_materi.id_materi = picklistmapel.id INNER JOIN tr_kelas ON tr_materi.kelas = tr_kelas.id_kelas WHERE tr_materi.id_materi = ${kelas} OR tr_materi.id_materi = ${materi}`
                console.log(sql, 'inisql')
                connection.query(sql, ((error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                }))
            } else {
                connection.query('SELECT tr_materi.*, picklistmapel.uraianLabel, tr_kelas.kelas FROM tr_materi INNER JOIN picklistmapel ON tr_materi.id_materi = picklistmapel.id INNER JOIN tr_kelas ON tr_materi.kelas = tr_kelas.id_kelas', ((error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                }))
            }
        })
    }
}
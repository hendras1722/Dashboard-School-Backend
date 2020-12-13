const { resolve } = require('path')
const connection = require('../configs/mysql')
const fs = require('fs');

module.exports = {
    createDate: (data) => {
        return new Promise((resolve, reject) => {
            // status 1 = sedang dikoreksi, 2 = mohon direvisi, 3 = tugas selesai
            console.log(data.tugas)
            const sql = `INSERT INTO tr_tugas (id_file, id_siswa, id_guru, mapel, tugas, status, created_at, updated_at) VALUES ("${data.id_file}", "${data.id_siswa}", "${data.id_guru}", ${data.mapel}, "${data.tugas}", 1, current_timestamp(), current_timestamp())`
            console.log(sql);
            connection.query(sql, ((error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            }))
        })
    },
    getData: (data, data1) => {
        return new Promise((resolve, reject) => {
            if (data && data1) {
                const sql = `SELECT tr_tugas.*, user.name AS Siswa, user_guru.name AS Guru ,picklistmapel.uraianLabel FROM tr_tugas INNER JOIN user ON tr_tugas.id_siswa = user.id INNER JOIN picklistmapel ON tr_tugas.mapel = picklistmapel.value INNER JOIN user_guru on tr_tugas.id_guru = user_guru.id WHERE tr_tugas.mapel LIKE "%${data}%" AND tr_tugas.id_siswa LIKE "%${data1}%"`
                console.log(sql, 'inisql')
                connection.query(sql, ((error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                }))
            } else if (data) {
                const sql = `SELECT tr_tugas.*, user.name AS Siswa, user_guru.name AS Guru ,picklistmapel.uraianLabel FROM tr_tugas INNER JOIN user ON tr_tugas.id_siswa = user.id INNER JOIN picklistmapel ON tr_tugas.mapel = picklistmapel.value INNER JOIN user_guru on tr_tugas.id_guru = user_guru.id WHERE tr_tugas.mapel LIKE "%${data}%"`
                console.log(sql, 'inisql')
                connection.query(sql, ((error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                }))
            } else if (data1) {
                const sql = `SELECT tr_tugas.*, user.name AS Siswa, user_guru.name AS Guru ,picklistmapel.uraianLabel FROM tr_tugas INNER JOIN user ON tr_tugas.id_siswa = user.id INNER JOIN picklistmapel ON tr_tugas.mapel = picklistmapel.value INNER JOIN user_guru on tr_tugas.id_guru = user_guru.id WHERE tr_tugas.id_siswa LIKE "%${data1}%"`
                console.log(sql, 'inisql')
                connection.query(sql, ((error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                }))
            } else {
                connection.query(`SELECT tr_tugas.*, user.name AS Siswa, user_guru.name AS Guru ,picklistmapel.uraianLabel FROM tr_tugas INNER JOIN user ON tr_tugas.id_siswa = user.id INNER JOIN picklistmapel ON tr_tugas.mapel = picklistmapel.value INNER JOIN user_guru on tr_tugas.id_guru = user_guru.id`, ((error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                }))
            }
        })
    },
    updateData: (data, id) => {
        return new Promise((resolve, reject) => {
            // status 1 = sedang dikoreksi, 2 = mohon direvisi, 3 = tugas selesai
            console.log(data.tugas)
            const sql = `UPDATE tr_tugas SET id_file = "${data.id_file}", id_siswa = "${data.id_siswa}", id_guru = "${data.id_guru}", mapel = ${data.mapel}, tugas = "${data.tugas}", status = 1, updated_at = current_timestamp() WHERE id_file = "${id}"`
            console.log(sql);
            connection.query(sql, ((error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            }))
        })
    },
    updateGuru: (data, id) => {
        return new Promise((resolve, reject) => {
            // status 1 = sedang dikoreksi, 2 = mohon direvisi, 3 = tugas selesai
            console.log(data.tugas)
            const sql = `UPDATE tr_tugas SET id_file = "${data.id_file}", id_siswa = "${data.id_siswa}", id_guru = "${data.id_guru}", mapel = ${data.mapel}, tugas = "${data.tugas}", status = ${data.status}, updated_at = current_timestamp() WHERE id_file = "${id}"`
            console.log(sql);
            connection.query(sql, ((error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            }))
        })
    },
    deleteData: (id) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT tr_tugas.*, user.name AS Siswa, user_guru.name AS Guru ,picklistmapel.uraianLabel FROM tr_tugas INNER JOIN user ON tr_tugas.id_siswa = user.id INNER JOIN picklistmapel ON tr_tugas.mapel = picklistmapel.value INNER JOIN user_guru on tr_tugas.id_guru = user_guru.id WHERE tr_tugas.id_file LIKE "%${id}%"`
            console.log(sql, 'ini sql')
            connection.query(sql, ((error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    let filesnya = result[0]?.tugas
                    const split = filesnya.split("/")
                    console.log(split[4], 'ini delete')
                    connection.query('DELETE FROM tr_tugas WHERE id_file = ?', id, ((error, result) => {
                        if (error) {
                            reject(new Error(error))
                        } else {
                            resolve(result)
                            const path = "/project school/backend/posapp-backend-jsexpress/uploads/" + `${split[4]}`
                            fs.unlink(path, (err) => {
                                // if (err) throw err;
                                console.log(err, 'inierror')
                                // if no error, file has been deleted successfully
                                console.log('File deleted!');
                            });
                        }
                    }))

                }
            }))
        })
    }
}
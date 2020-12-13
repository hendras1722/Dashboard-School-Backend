const connection = require('../configs/mysql')

module.exports = {
  posAll: (limit, activePage, searchName, sortBy, orderBy, name_category, idCat, posId, totalData) => {
    return new Promise((resolve, reject) => {
      const totalData = connection.query('SELECT count (*) as totalData FROM tr_gurulist')
      const totalPages = Math.ceil(totalData / limit)
      const firstData = ((limit * activePage) - limit)
      const sqle = `SELECT tr_gurulist.*, user.id, user.name, user.ni, user.status, picklistmapel.uraianLabel FROM tr_gurulist INNER JOIN user ON tr_gurulist.id_guru = user.id INNER JOIN picklistmapel ON tr_gurulist.mapel = picklistmapel.value WHERE user.name LIKE "%${searchName}%" AND user.status = "guru"`
      console.log(sqle)
      if (searchName) {
        connection.query(`SELECT tr_gurulist.*, user.id, user.name, user.ni, user.status, picklistmapel.uraianLabel FROM tr_gurulist INNER JOIN user ON tr_gurulist.id_guru = user.id INNER JOIN picklistmapel ON tr_gurulist.mapel = picklistmapel.value WHERE user.name LIKE '%${searchName}%' AND user.status = 'guru'`,
          (error, result) => {
            if (error) reject(new Error(error))
            resolve(result)
          })
      } else {
        connection.query(`SELECT tr_gurulist.*, user.id, user.name, user.ni, user.status, picklistmapel.uraianLabel FROM tr_gurulist INNER JOIN user ON tr_gurulist.id_guru = user.id INNER JOIN picklistmapel ON tr_gurulist.mapel = picklistmapel.value WHERE user.status = 'guru'`,
          (error, result) => {
            if (error) reject(new Error(error))
            resolve(result)
          })
      }
    })
  },
  posDetail: (posId) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT tr_gurulist.*, user.id, user.name, user.ni, user.status, picklistmapel.uraianLabel FROM tr_gurulist INNER JOIN user ON tr_gurulist.id_guru = user.id INNER JOIN picklistmapel ON tr_gurulist.mapel = picklistmapel.value WHERE id_guru = ?', posId, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
    })
  },
  insertData: (data) => {
    return new Promise((resolve, reject) => {
      // console.log(data, 'inidata guru')
      // connection.query('ALTER TABLE products AUTO_INCREMENT = 1')
      connection.query('INSERT INTO tr_gurulist SET ?', data, (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
      // connection.query(`SELECT * FROM school LEFT JOIN category ON products.id_category = category.id`)
    })
  },

  updateData: (data, id) => {
    // const posId = data.id_guru
    console.log(data)
    // console.log(connection.query('UPDATE tr_gurulist SET ? WHERE id_guru = ?', [data, posId], (error, result) => {
    //   if (error) reject(new Error(error))
    //   resolve(result)
    // })
    return new Promise((resolve, reject) => {
      connection.query('UPDATE tr_gurulist SET ? WHERE id_guru = ?', [data, id], (error, result) => {
        if (error) reject(new Error(error))
        resolve(result)
      })
      // connection.query('SELECT products.*, category.name_category FROM products LEFT JOIN category ON products.id_category = category.id ')
    })
  },

  deleteData: (posId) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM tr_gurulist WHERE id_guru = ?', posId, (error, result) => {
        if (error) reject(new Error(error))
        // connectio?n.query('ALTER TABLE products AUTO_INCREMENT = 1')
        // connection.query('ALTER TABLE products DROP id')
        // connection.query('ALTER TABLE products ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST')
        resolve(result)
      })
      // connection.query('SELECT * FROM tr_gurulist')
    })
  },
  countData: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT count(*) as totalData FROM tr_gurulist', (error, result) => {
        resolve(result[0].totalData)
      })
    })
  }
}

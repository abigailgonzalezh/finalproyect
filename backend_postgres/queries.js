const Pool = require('pg').Pool
const pool = new Pool({
  user: 'feri',
  host: 'localhost',
  database: 'ika',
  password: '1234',
  port: 5432,
})

const getEmpleados = (request, response) => {
  pool.query('SELECT * FROM empleado', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getEmpleados,
}
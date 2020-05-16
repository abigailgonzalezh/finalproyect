const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ika',
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

const getEmpleadosById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM empleado WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const deleteEmpleados = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM empleados WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getEmpleados,
  getEmpleadosById,
  deleteEmpleados,
}
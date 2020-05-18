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

  pool.query('DELETE FROM empleado WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const postEmpleados = (request, response) =>{
  const nombre = request.params.nombre1;
  const apellido = request.params.apellido1;
  const salario =request.params.salario1;
  console.log("------POST--------");
  console.log(nombre);
  
  pool.query("INSERT INTO empleado (nombre, apellido, salario) VALUES ($1, $2, $3)", [nombre, apellido, salario], (error, results) =>{
    if (error){
      throw error;
    }
    response.status(200).json(`User added with name: ${nombre}`)
  })
}

const putEmpleados = (request, response) => {
  const nombre = request.params.nombre2;
  const apellido = request.params.apellido2;
  const salario =request.params.salario2;
  const id = parseInt(request.params.id);
  console.log("------PUT--------");
  console.log(nombre);

  pool.query("UPDATE empleado nombre = $1, apellido = $2, salario = $3 WHERE id = $4", [nombre, apellido, salario, id], (error, results) =>{
    if (error){
      throw error;
    }
    response.status(200).json(`User edited with ID: ${id}`)
  })
}

module.exports = {
  getEmpleados,
  getEmpleadosById,
  deleteEmpleados,
  postEmpleados,
  putEmpleados,
}
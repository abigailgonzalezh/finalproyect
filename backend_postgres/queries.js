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
  //const nombre = request.params.nombre;
  //const apellido = request.params.apellido;
  //const salario =request.params.salario;
  const { mail, password, nombre, apellido, salario } = request.body
  console.log("------POST--------");
  console.log(nombre);

  pool.query("INSERT INTO empleado (mail, password, nombre, apellido, salario) VALUES ($1, $2, $3, $4, $5)", [mail, password, nombre, apellido, salario], (error, results) =>{
    if (error){
      throw error;
    }
    response.status(201).send(`User added with Id: ${results.insertId}`)
  })
}

const putEmpleados = (request, response) => {
  //const nombre = request.body;
  //const apellido = request.body;
  //const salario = request.body;
  //const id = request.body;
  const { mail, password, nombre, apellido, salario, id} = request.body;
  //const id = parseInt(request.params.id);
  console.log("------PUT--------");
  console.log(nombre);
  console.log(apellido);
  console.log(salario);
  console.log(id);

  pool.query("UPDATE empleado SET mail = $1, password = $2, nombre = $3, apellido = $4, salario = $5 WHERE id = $6", [mail, password, nombre, apellido, salario, id], (error, results) =>{
    if (error){
      throw error;
      console.log(error);
    }
    response.status(200).json(`User edited with ID: ${results.editId}`)
  })
}

module.exports = {
  getEmpleados,
  getEmpleadosById,
  deleteEmpleados,
  postEmpleados,
  putEmpleados,
}

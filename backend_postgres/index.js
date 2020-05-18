const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3002

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/empleados', db.getEmpleados)
app.delete('/empleados/:id', db.deleteEmpleados)
app.get('/empleados/:id', db.getEmpleadosById)
app.post('/empleados', db.postEmpleados)
app.put('/empleados', db.putEmpleados)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
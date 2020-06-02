var util = require('util');
var express = require('express');
var app = express();
var passport = require("passport");
var JWTMiddleware = express.Router();
var fs = require('fs');
var request = require('request');
const { Pool, Client } = require('pg')
const bcrypt= require('bcryptjs')
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const secret = "Just keep guessing";

app.use(express.static('public'));

const LocalStrategy = require('passport-local').Strategy;

var currentAccountsData = [];

const pool = new Pool({
  user: 'ika',
  host: 'localhost',
  database: 'ika',
  password: '1234',
  port: 5432,
})

module.exports = function (app) {

	app.post('/join', async function (req, res) {

		try{
			const client = await pool.connect()
			await client.query('BEGIN')
			var pwd = await bcrypt.hash(req.body.password, 5);
			await JSON.stringify(client.query('SELECT id FROM "empleado" WHERE "mail"=$1', [req.body.nombre], function(err, result) {
				if(result.rows[0]){
					req.flash('warning', "This email address is already registered. <a href='/login'>Log in!</a>");
					res.redirect('/join');
				}
				else{
					client.query('INSERT INTO empleado (mail, password, nombre, apellido, salario, tipo) VALUES ($1, $2, $3, $4, $5, 2)', [req.body.mail,pwd, req.body.nombre, req.body.apellido, req.body.salario], function(err, result) {
						if(err){console.log(err);}
						else {

						client.query('COMMIT')
							console.log(result)
							req.flash('success','User created.')
							res.redirect('/login');
							return;
						}
					});


				}

			}));
			client.release();
		}
		catch(e){throw(e)}
	});


	app.get('/logout', function(req, res){

		console.log(req.isAuthenticated());
		req.logout();
		console.log(req.isAuthenticated());
		req.flash('success', "Logged out. See you soon!");
		res.redirect('/');
	});

	app.post('/login', 	function(req, res) {
    loginAttempt();
    async function loginAttempt() {
      const client = await pool.connect()
  		try{
  			await client.query('BEGIN')
  			var currentAccountsData = await JSON.stringify(client.query('SELECT id, "nombre", "mail", "password", "tipo" FROM "empleado" WHERE "mail"=$1', [req.body.mail], function(err, result) {

  				if(err) {
  					return done(err)
  				}
  				if(result.rows[0] == null){
  					console.log('danger', "Oops. Incorrect login details.");
  				}
  				else{
  					bcrypt.compare(req.body.password, result.rows[0].password, function(err, check) {
  						if (err){
  							console.log('Error while checking password');
  						}
  						else if (check){
  							console.log('Bien');
                const token = jwt.sign({id: result.rows[0].id}, secret)
                res.setHeader("authorization", `Bearer ${token}`);
                return res.json(result.rows[0].tipo);
  						}
  						else{
  							console.log('danger', "Oops. Incorrect login details.");
  						}
  					});
  				}
  			}))
  		}

  		catch(e){throw (e);}
  	};
	});

  app.put('/edit', async function(req, res) {
    try{
			const client = await pool.connect()
			await client.query('BEGIN')
      const mail = req.body.mail;
      const nombre = req.body.nombre;
      const apellido = req.body.apellido;
      const salario = req.body.salario;
			var pwd = await bcrypt.hash(req.body.password, 5);
					client.query("UPDATE empleado SET nombre = $1, apellido = $2, salario = $3, mail = $4, password = $5 WHERE id = $6", [nombre, apellido, salario, mail, pwd, id], function(err, result) {
						if(err){console.log(err);}
						else {

						  client.query('COMMIT')
							console.log(result)
							console.log('success','User updated.')
							return;
						}
					});
			client.release();
		}
		catch(e){throw(e)}
      res.status(200).json(`User edited`)
  });

  app.delete('/delete', async function(req, res) {
    try{
      const client = await pool.connect()
      await client.query('BEGIN')
      const id = req.body.id;
          client.query("DELETE FROM empleado WHERE id = $1", [id], function(err, result) {
            if(err){console.log(err);}
            else {

            client.query('COMMIT')
              console.log(result)
              console.log('success','User deleted.')
              return;
            }
          });
      client.release();
    }
    catch(e){throw(e)}
      res.status(200).json(`User edited`)
  });

  app.get('/empleados', async function(req, res) {
    pool.query('SELECT * FROM empleado', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  });

  app.get('/salario', async function(req, res) {
    pool.query('select sum(salario) as salario from empleado;', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  });
}
JWTMiddleware.use((req, res, next) => {
    //console.log(req.headers);
    const token = req.headers['authorization'] ?
          req.headers['authorization'].slice(7) : null;

    //console.log(token);

    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(401).send('Authentication failed');
        } else {
          //console.log(decoded);
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.send('Authentication failed');
    }
  });

import React, { useState} from 'react';
import {grommet, Image, Box, Form, FormField, TextInput, Grommet,Button, Clock} from "grommet";
import Carrousel from './Carrousel.js'
import imagen from "./Imagenes/logo3.png"
import images from "./Imagenes/Koy.jpg"
import { hp } from "grommet-theme-hp"
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//import Images from src="https://drive.google.com/file/d/1KzbF8eiyXl_ilicnuWKMd9_cSfPWl-Vy/view?usp=sharing";
function Index(props) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const history = useHistory()
  localStorage.removeItem('token');


  const iniciarSesion = async () => {
      console.log("INICIAR SESION");
      console.log(correo);
      console.log(contraseña);
      const res = await fetch("/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          mail: correo,
          password: contraseña,
        })
      })
      const response = await res.json();

      console.log(response)
      if(response == 1){
        localStorage.setItem('token', response)
        history.push('/productos');
       }
      else{
        if (response == 2) {
          localStorage.setItem('token', response)
          history.push('/ventas');
        } else{
          console.log("error");
        }
      }
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      background: 'url(https://drive.google.com/uc?export=download&id=1kDsOopsNwwkQOdMVC9zlvzvYI5RbYMzs)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
  }));
    const classes = useStyles();
    return (

      <Grommet theme={hp}>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
                <Image
                src={imagen}
                />
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Correo"
                id="corr"
                name="correo"
                onChange={(ev) => setCorreo(ev.target.value)}
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Contraseña"
                type="password"
                id="contras"
                name="contraseña"
                autoComplete="current-password"
                onChange={(ev) => setContraseña(ev.target.value)}
              />
                <Box align="center" pad="medium">
              <Button
                primary
                label="Iniciar sesion"
                onClick={iniciarSesion}
                />
                </Box>
              <Grid container>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
  </Grommet>
    );
}
export default Index;

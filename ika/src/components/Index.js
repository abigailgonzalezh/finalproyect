import React, { useState} from 'react';
import {grommet, Image, Box, Form, FormField, TextInput, Grommet,Button, Clock} from "grommet";
import Carrousel from './Carrousel.js'
import imagen from "./Imagenes/logo3.png"
import { hp } from "grommet-theme-hp"
import { useHistory } from "react-router-dom";

function Index(props) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const history = useHistory()

  const iniciarSesion = async () => {
      console.log("INICIAR SESION");
      console.log(correo);
      console.log(contraseña);
      const res = await fetch("/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: correo,
          password: contraseña,
        })
      })
      console.log(res);
      if (res.url=='http://localhost:4000/productos') {
        history.push('/productos');
      }
      //const response = await res.json();
      //console.log(res);
  }

    return (
      <Grommet theme={hp}>

      <Box align="end" justify="start" pad="small">
  <Clock type="digital" />
</Box>
<Box align="center">
<Image
src={imagen}
/>
</Box>
<Carrousel/>
    <Box align="center" pad="medium">
      <Form>
        <Box border gap="medium" pad="large" width="medium">
          <FormField htmlFor="enabled-id" name="enabled" label="Usuario">
            <TextInput
              id="corr"
              name="correo"
              placeholder="Ingrese su correo"
              onChange={(ev) => setCorreo(ev.target.value)}
            />
          </FormField>

          <FormField htmlFor="focus-id" name="focus" label="Contraseña">
            <TextInput
              id="contras"
              name="contraseña"
              placeholder="Ingrese contraseña"
               type="password"
               onChange={(ev) => setContraseña(ev.target.value)}
            />
          </FormField>
          <Button
            primary
            label="Iniciar sesion"
            onClick={iniciarSesion}
            />
        </Box>
      </Form>
    </Box>
  </Grommet>
    );
}
export default Index;

import React, {useEffect, useState} from 'react';
import { Hide, View } from "grommet-icons";
import {grommet, Image, Box, Form, FormField, TextInput, Grommet,Button, Clock} from "grommet";
import imagen from "./logo3.png"

function Index(props) {


    return (
      <Grommet theme={grommet} >
      <Box align="end" justify="start" pad="small">
  <Clock type="digital" />
</Box>
<Box align="center">
<Image
src={imagen}
/>
</Box>
    <Box align="center" pad="medium">
      <Form>
        <Box border gap="medium" pad="large" width="medium">
          <FormField htmlFor="enabled-id" name="enabled" label="Usuario">
            <TextInput
              id="enabled-id"
              placeholder="Ingrese usuario"
            />
          </FormField>

          <FormField htmlFor="focus-id" name="focus" label="Constraseña">
            <TextInput
              id="focus-id"
              placeholder="Ingrese contraseña"
               type="password"
            />
          </FormField>
          <Button
            primary
            label="Iniciar sesion"
            />
        </Box>
      </Form>
    </Box>
  </Grommet>
    );
}
export default Index;

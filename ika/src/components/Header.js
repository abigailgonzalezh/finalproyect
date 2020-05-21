import React from 'react';
import Button from '@material-ui/core/Button';
import { grommet } from "grommet/themes";
import imagen from "./Imagenes/logo.png"
import { Anchor, Box, Grommet, Header, Image } from "grommet";
import { hp } from "grommet-theme-hp"



function Headers(props) {
  const { classes } = props;

  return (
    <Grommet theme={hp}>
    <Header elevation="medium"  background="light-2" pad="xsmall">
    <Image
    src={imagen}
  />
      <Box direction="row" gap="medium">
        <Anchor label="Productos" href="/productos" />
        <Anchor label="Historial" href="/Historial"/>
        <Anchor label="Corte de caja" href="/corte"/>
        <Anchor label="Balance" href="/Balance" />
        <Anchor label="Sugerencias" href="/sugerencias" />
        <Button label="Iniciar sesion"></Button>
      </Box>
    </Header>
  </Grommet>
  );
}


export default Headers;

import React from 'react';
import Button from '@material-ui/core/Button';
import { grommet } from "grommet/themes";
import imagen from "./Imagenes/logo.png"
import { Anchor, Box, Grommet, Header, Image, Clock } from "grommet";
import { hp } from "grommet-theme-hp"

function logOff(){
    localStorage.removeItem('token');
    window.location.replace("http://localhost:4000/")
  }

function Headers(props) {
  const { classes } = props;

  const DigitalClock = () => (
    <Grommet theme={grommet}>
      <Box align="center" justify="start"  background="light-3">
        <Clock type="digital" />
      </Box>
    </Grommet>
  );
  return (
    <Grommet theme={hp}>
    <Header elevation="medium"  background="light-2" pad="xsmall">
    <Image
    src={imagen}
  />
      <Box direction="row" gap="medium">
         <DigitalClock />
        <Anchor label="Cerrar sesion" onClick={() => logOff()}>Cerrar Sesion</Anchor>
      </Box>
    </Header>
  </Grommet>
  );
}


export default Headers;

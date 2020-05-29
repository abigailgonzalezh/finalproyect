import React from 'react';
import Button from '@material-ui/core/Button';
import { grommet } from "grommet/themes";
import imagen from "./Imagenes/logo.png"
import { Anchor, Box, Grommet, Header, Image } from "grommet";
import { hp } from "grommet-theme-hp"



function Headers(props) {

  return (
    <Grommet theme={hp}>
    <Header elevation="medium"  background="light-2" pad="xsmall">
    <Image
    src={imagen}
  />
      <Box direction="row" gap="medium">
       Siguenos en nuestras redes sociales para más información 
      </Box>
    </Header>
  </Grommet>
  );
}


export default Headers;

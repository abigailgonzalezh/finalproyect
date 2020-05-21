import React from 'react';
import Button from '@material-ui/core/Button';
import { grommet } from "grommet/themes";
import imagen from "./Imagenes/logo.png"
import { Anchor, Box, Grommet, Footer, Image, Grid, ResponsiveContext } from "grommet";
import { hp } from "grommet-theme-hp"
import { Facebook } from 'grommet-icons';
import { Instagram } from 'grommet-icons';


function Footers(props) {
  const { classes } = props;

  return (
    <Grommet theme={hp}>
    <Footer plain="true" background="transparent" pad="small">
      <Box align="center" direction="row" gap="xsmall">
      </Box>
      <Box align="center" direction="row" gap="xsmall">
        <Anchor
          href="https://www.facebook.com/IKA-Aquarium-2190325601035930"
          icon={<Facebook color="plain" size="large"/>}
        />
        <Anchor
          href="https://www.instagram.com/ikaacuarium/"
          icon={<Instagram color="plain" size="large"/>}
        />
        </Box>
        <Box>
      </Box>
       </Footer>
  </Grommet>
  );
}


export default Footers;

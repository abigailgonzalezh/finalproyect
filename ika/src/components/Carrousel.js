import React from 'react';
import { Grommet,Image, Box, Carousel } from "grommet";
import imagen from "./Imagenes/globo.gif"
import imagen1 from './Imagenes/pez.gif'
import imagen2 from './Imagenes/solo.gif'
function Carrousel() {

  return (
    <Grommet  >
      <Box align="center">
        <Carousel controls={false} play={3500}>
        <Box  >
          <Image src={imagen} fit="cover" />
        </Box>
          <Box>
          <Image src={imagen1} fit="cover" />
          </Box>
          <Box>
          <Image src={imagen2} fit="cover" />
          </Box>
        </Carousel>
      </Box>
    </Grommet>
  );
}
export default Carrousel;

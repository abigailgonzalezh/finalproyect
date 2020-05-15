import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { grommet } from "grommet/themes";
import imagen from './logo.png'
import { Anchor, Box, Grommet, Header, Image } from "grommet";
const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

});


function Pricing(props) {
  const { classes } = props;

  return (
    <Grommet >
    <Header elevation="medium"  background="light-3" pad="xsmall">
    <Image
    src={imagen}
  />
      <Box direction="row" gap="medium">
        <Anchor label="Productos" href="#" />
        <Anchor label="Historial" href="#" />
        <Anchor label="Corte de caja" href="#" />
        <Anchor label="Balance" href="#" />
        <Anchor label="Sugerencias" href="#" />
        <Button label="Iniciar sesion"></Button>
      </Box>
    </Header>
  </Grommet>
  );
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pricing);
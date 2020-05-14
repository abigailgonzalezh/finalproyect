import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Grommet, Box, Image } from "grommet";
import { grommet } from "grommet/themes";
import imagen from './logo.png'

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
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
  <Image
  margin={{ top: 'small' }}
    src={imagen}
  />
          </Typography>
          <Button>Productos</Button>
          <Button>Historial</Button>
          <Button>Sugerencias</Button>
          <Button>Corte de caja</Button>
          <Button>Balance</Button>
          <Button color="primary" variant="outlined">
            Iniciar sesion
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>

      </main>
     
    </React.Fragment>
  );
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pricing);
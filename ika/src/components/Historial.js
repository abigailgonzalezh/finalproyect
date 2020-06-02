import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import {
  Box,
  Grommet,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
  Text,
  Button
} from "grommet";
import { grommet } from "grommet/themes";
import Moment from 'react-moment';
import * as moment from 'moment';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function Historial(props) {
const [productos, setProductos] = useState([]);

  useEffect(() => {
    const getProductos = async () => {
      const res = await fetch("/his", {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
      })
      //console.log(res);
      const response = await res.json();
      setProductos(response);
    }
    getProductos();
  })

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
  //console.log(plot);

  const mystlye = {
    minWidth: "50%",
    minHeight: 50
  };

  //
  const classes = useStyles();
  const gettoken = localStorage.getItem('token');

  if(gettoken==1){
    return (
      <div>
         <Header/>
          <br />
        <Grid container spacing={3}>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
      <Grommet theme={grommet}>
        <Box align="center" pad="large">
        <Table className={classes.table}>
          <TableHeader>
            <TableRow>
            <TableCell scope="col" border="bottom" align="center"><strong>Producto</strong></TableCell>
            <TableCell scope="col" border="bottom" align="center"><strong>Precio de Compra</strong></TableCell>
            <TableCell scope="col" border="bottom" align="center"><strong>Precio de Venta</strong></TableCell>
            <TableCell scope="col" border="bottom" align="center"><strong>Cantidad</strong></TableCell>
            <TableCell scope="col" border="bottom" align="center"><strong>Accion</strong></TableCell>
            <TableCell scope="col" border="bottom" align="center"><strong>Fecha</strong></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((producto) =>
              <TableRow className="data-row">
                <TableCell align="center" >{producto.producto}</TableCell>
                <TableCell align="center" >{producto.precio_compra}</TableCell>
                <TableCell align="center" >{producto.precio_venta}</TableCell>
                <TableCell align="center" >{producto.cantidad}</TableCell>
                <TableCell align="center" >{producto.action}</TableCell>
                <TableCell align="center" ><Moment format="DD-MM-YYYY">{producto.changedate}</Moment></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </Box>
          </Grommet>
      </div>
    );
  } else{
    if (gettoken == 2) {
      return(
        <p>El acceso a esta página es solo para personal autorizado</p>
      );
    } else{
      return(
        <p>Tienes que iniciar sesion</p>
      );
    }

  }
}

export default Historial;

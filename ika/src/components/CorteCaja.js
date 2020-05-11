import React, {useEffect, useState} from 'react';
import {Button, TableHead, TableRow, TableCell, TableBody, Table, Dialog, DialogTitle,
DialogContent, DialogContentText, DialogActions} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

function CorteCaja(props) {
const [productos, setProductos] = useState([]);

  useEffect(() => {
    const getProductos = async () => {
      const res = await fetch("/procedimientos", {
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
  return (
    <div>
        <br />
      <Grid container spacing={3}>
      <Grid item xs={3}></Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={3}>
      </Grid>
    </Grid>
    <br />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Fecha</StyledTableCell>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Cantidad</StyledTableCell>
            <StyledTableCell>Total Venta</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto) =>
            <TableRow className="data-row">
              <StyledTableCell>{producto.fecha}</StyledTableCell>
              <StyledTableCell>{producto.nombre}</StyledTableCell>
              <StyledTableCell>{producto.cantidad}</StyledTableCell>
              <StyledTableCell>{producto.totalVenta}</StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CorteCaja;
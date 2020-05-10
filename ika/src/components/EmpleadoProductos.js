import React, {useEffect, useState} from 'react';
import {Button, TableHead, TableRow, TableCell, TableBody, Table, Dialog, DialogTitle,
DialogContent, DialogContentText, DialogActions} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Venta from './Venta';

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

function Ventas(props) {
  const [productos, setProductos] = useState([]);
  const [cantidad, setCantidad] = useState('');
  const [id, setId] = useState('');
  const [open, setOpen] = React.useState(false);
  
    const handleClose = () => {
      setOpen(false);
      var compri = document.getElementById("cant");
      compri.value = " ";
    };  

  useEffect(() => {
    const getProductos = async () => {
      const res = await fetch("/productos", {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
      })
      //console.log(res);
      const response = await res.json();
      setProductos(response);
    }
    getProductos();
  })

  function vender(producto){
    console.log(producto.id);
    setId(producto.id);
  }

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
         {id && 
         <Venta venta={id} />
         }
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
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Precio</StyledTableCell>
            <StyledTableCell>Categoria</StyledTableCell>
            <StyledTableCell>Cantidad</StyledTableCell>
            <StyledTableCell>Ventas</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto) =>
            <TableRow className="data-row">
              <StyledTableCell>{producto.nombre}</StyledTableCell>
              <StyledTableCell>{producto.precio_venta}</StyledTableCell>
              <StyledTableCell>{producto.categorias_id}</StyledTableCell>
              <StyledTableCell>{producto.cantidad}</StyledTableCell>
              <StyledTableCell>
                  <Button variant="contained" color="primary" onClick={() => vender(producto)}>
                    Vender
                  </Button>
              </StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Ventas;
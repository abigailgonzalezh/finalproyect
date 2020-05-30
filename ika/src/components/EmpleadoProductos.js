import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Venta from './Venta';
import Header from './HeaderEmpleado';
import { hp } from "grommet-theme-hp";
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
      const res = await fetch("/products", {
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
    <Grommet theme={hp}>
      <Header/>
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
      <Box align="center" pad="large">
        <Table className={classes.table} >
        <TableHeader>
          <TableRow>
          <TableCell align="center" size="small" scope="col" border="bottom"><strong>Imagen</strong></TableCell>
          <TableCell align="center" size="small" scope="col" border="bottom"><strong>Nombre</strong></TableCell>
          <TableCell scope="col" border="bottom"><strong>Precio</strong></TableCell>
          <TableCell align="center" size="small" scope="col" border="bottom"><strong>Categoria</strong></TableCell>
          <TableCell align="center" scope="col" border="bottom"><strong>Cantidad</strong></TableCell>
          <TableCell align="center" scope="col" border="bottom"><strong>Ventas</strong></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productos.map((producto) =>
            <TableRow className="row">
              <TableCell align="center">
                <img src={producto.imagen} width="100" height="100"/>
              </TableCell>
              <TableCell align="center" >{producto.nombre}</TableCell>
              <TableCell align="center" >{producto.precio_venta}</TableCell>
              <TableCell align="center" >{producto.categorias_id}</TableCell>
              <TableCell align="center" >{producto.cantidad}</TableCell>
              <TableCell>
                <Button label="vender" hoverIndicator="true" onClick={() => vender(producto)}></Button>
                </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </Box>
        </Grommet>
  );
}

export default Ventas;

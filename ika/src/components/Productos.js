import React, {useEffect, useState} from 'react';
import {Button, TableHead, 
  TableRow, TableCell, TableBody, Table} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';

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

function Productos(props) {
    const [productos, setProductos] = useState([]);
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
        <br/>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Precio de Compra</StyledTableCell>
              <StyledTableCell>Precio de Venta</StyledTableCell>
              <StyledTableCell>Cantidad</StyledTableCell>
              <StyledTableCell>Categoria</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto) =>
              <TableRow className="data-row">
                <StyledTableCell>{producto.id}</StyledTableCell>
                <StyledTableCell>{producto.nombre}</StyledTableCell>
                <StyledTableCell>{producto.precio_compra}</StyledTableCell>
                <StyledTableCell>{producto.precio_venta}</StyledTableCell>
                <StyledTableCell>{producto.cantidad}</StyledTableCell>
                <StyledTableCell>{producto.categorias_id}</StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
  
      </div>
    );
}

export default Productos;
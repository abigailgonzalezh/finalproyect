import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InsertarSugerencias from './InsertarSugerencias';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Header from './Header';
import {
  Box,
  Grommet,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
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

function Productos(props) {
    const [productos, setProductos] = useState([]);
    const [id, setId] = useState('');
    var id2 = '';

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
        <Header/>
          <br />
        <Grid container spacing={3}>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={3}>
         <InsertarSugerencias/>
        </Grid>
      </Grid>
      <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Table className={classes.table}>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom"><strong>Nombre</strong></TableCell>
              <TableCell scope="col" border="bottom"><strong>Precio</strong></TableCell>
              <TableCell scope="col" border="bottom"><strong>Categoria</strong></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((producto) =>
              <TableRow className="data-row">
                <TableCell align="center" >{producto.nombre}</TableCell>
                <TableCell align="center" >{producto.precio_venta}</TableCell>
                <TableCell align="center" >{producto.categorias_id}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </Box>
        </Grommet>
      </div>
    );
}

export default Productos;
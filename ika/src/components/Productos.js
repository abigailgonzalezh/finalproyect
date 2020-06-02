import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InsertarProductos from './InsertarProductos';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditarProductos from './EditarProductos';
import Header from './Header';
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

function Productos(props) {
    const [productos, setProductos] = useState([]);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [precioCompra, setPrecioCompra] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [open, setOpen] = React.useState(false);
    const [url, setUrl] = useState('');
    var id2 = '';

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

    function editar(producto){
      console.log("entro 1");
      console.log(producto.id);
      setId(producto.id);
      setNombre(producto.nombre);
      setPrecioCompra(producto.precio_compra);
      setPrecioVenta(producto.precio_venta);
      setCantidad(producto.cantidad);
      setCategoria(producto.categorias_id);
      setUrl(producto.imagen);
      setOpen(true);
    }

    function eliminar(producto){
      console.log(producto.id);
      id2 = producto.id;
      deleteProductos();
      //window.location.reload();
    }

    const deleteProductos = async () => {
      console.log("entro");
      console.log(id2);
      const res = await fetch("/products", {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: id2
          })
      })
      const response = await res.json();
    }

    const handleClose = () => {
      setOpen(false);
    };

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
        <Grommet theme={hp} >
        <Header/>
          {id && nombre && precioCompra && precioVenta && cantidad && open && url && categoria &&
           <EditarProductos productoEdit={id} productoNombre={nombre} productoPrecioCompra ={precioCompra}
           productoPrecioVenta = {precioVenta} productoCantidad = {cantidad} productoCategoria = {categoria}
           isOpen = {open} isClose = {handleClose} productoUrl = {url}/>
           }
           {id2}
        <br />
          <Grid container spacing={3}>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}>
           <InsertarProductos productoInsert="fer"/>
          </Grid>
        </Grid>
        <Box align="center" pad="large">
          <Table className={classes.table} >
            <TableHeader>
              <TableRow>
                <TableCell scope="col" border="bottom"><strong>ID</strong></TableCell>
                <TableCell align="center" size="small" scope="col" border="bottom"><strong>Nombre</strong></TableCell>
                <TableCell scope="col" border="bottom"><strong>Precio de Compra</strong></TableCell>
                <TableCell align="center" size="small" scope="col" border="bottom"><strong>Precio de Venta</strong></TableCell>
                <TableCell scope="col" border="bottom"><strong>Cantidad</strong></TableCell>
                <TableCell align="center" size="small" scope="col" border="bottom"><strong>Imagen</strong></TableCell>
                <TableCell align="center" size="small" scope="col" border="bottom"><strong>Categoria</strong></TableCell>
                <TableCell align="end"scope="col" border="bottom"><strong></strong></TableCell>
                <TableCell scope="col" border="bottom"><strong></strong></TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productos.map((producto) =>
                <TableRow scope="row">
                  <TableCell >{producto.id}</TableCell>
                  <TableCell align="center" >{producto.nombre}</TableCell>
                  <TableCell align="center">{producto.precio_compra}</TableCell>
                  <TableCell align="center">{producto.precio_venta}</TableCell>
                  <TableCell align="center">{producto.cantidad}</TableCell>
                  <TableCell align="center">
                    <img src={producto.imagen} width="100" height="100"/>
                  </TableCell>
                  <TableCell align="center">{producto.categorias_id}</TableCell>
                  <TableCell>
                  <Button hoverIndicator="true" onClick={() => editar(producto)}><EditIcon /></Button>
                  </TableCell>
                  <TableCell>
                  <Button hoverIndicator="true" variant="outlined" onClick={() => eliminar(producto)} ><DeleteIcon /> </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          </Box>
          </Grommet>
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

export default Productos;

import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InsertarReview from './InsertarReview';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Header from './Header';
import Footer from './Footer';
import { hp } from "grommet-theme-hp"
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
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {setOpen(false);};
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

    function review(producto){
      console.log(producto.id);
      setId(producto.id);
      setOpen(true);
    }

    //
    const classes = useStyles();
    return (
      <Grommet theme={hp} full>
        {id && open && <InsertarReview rev={id} isOpen = {open} isClose = {handleClose} /> }
        <Header/>
          <br />
        <Grid container spacing={3}>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
      <Box align="center" pad="large">
        <Table className={classes.table}>
          <TableHeader>
            <TableRow>
              <TableCell align="center" scope="col" border="bottom"><strong>Nombre</strong></TableCell>
              <TableCell align="center" scope="col" border="bottom"><strong>Precio</strong></TableCell>
              <TableCell align="center" scope="col" border="bottom"><strong>Categoria</strong></TableCell>
              <TableCell align="center" scope="col" border="bottom"><strong>Reseñas</strong></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((producto) =>
              <TableRow className="data-row">
                <TableCell align="center" >{producto.nombre}</TableCell>
                <TableCell align="center" >{producto.precio_venta}</TableCell>
                <TableCell align="center" >{producto.categorias_id}</TableCell>
                <TableCell align="center" >
                  <Button variant="outlined" onClick={() => review(producto)} > <EditIcon/> </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </Box>
        <Footer/>
        </Grommet>
    );
}

export default Productos;

import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
import InsertarCategoria from "./InsertarCategoria";
import EditarCategoria from "./EditarCategoria";

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

function Categorias(props){
    const [categorias, setCategorias] = useState([]);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [open, setOpen] = React.useState(false);
    var id2 = '';

    useEffect(() => {

        const getCategorias = async () => {
          const res = await fetch("/categories", {
              method: 'GET',
              headers: {'Content-Type': 'application/json'},
          })
          //console.log(res);
          const response = await res.json();
          setCategorias(response);
          console.log(categorias);
        }
        getCategorias();
    })

    function editar(categoria){
        console.log("entro 1");
        console.log(categoria.id);
        setId(categoria.id);
        setNombre(categoria.nombre);
        setOpen(true);
    }

    function eliminar(categoria){
        console.log(categoria.id);
        id2 = categoria.id;
        deleteCategorias();
    }

    const deleteCategorias = async () => {
        console.log("entro");
        console.log(id2);
        const res = await fetch("/categories", {
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

    const mystlye = {
        minWidth: "50%",
        minHeight: 50
    };

    const classes = useStyles();
    const gettoken = localStorage.getItem('token');
    if(gettoken==1){
      return (
          <Grommet theme={hp}>
              <Header/>
              {id && nombre && open &&
              <EditarCategoria categoriaEdit={id} categoriaNombre={nombre} isOpen = {open} isClose = {handleClose}/>
              }
              {id2}
              <br/>
              <Grid container spacing={3}>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={3}>
                      <InsertarCategoria categoriasInsert="fer"/>
                  </Grid>
              </Grid>
              <Box align="center" pad="large">
                  <Table className={classes.table} >
                      <TableHeader>
                          <TableRow>
                              <TableCell scope="col" border="bottom"><strong>ID</strong></TableCell>
                              <TableCell align="center" size="small" scope="col" border="bottom"><strong>Nombre</strong></TableCell>
                              <TableCell align="end"scope="col" border="bottom"><strong></strong></TableCell>
                              <TableCell scope="col" border="bottom"><strong></strong></TableCell>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {categorias.map((categoria) =>
                              <TableRow scope="row">
                                  <TableCell >{categoria.id}</TableCell>
                                  <TableCell align="center" >{categoria.nombre}</TableCell>
                                  <TableCell>
                                      <Button hoverIndicator="true" onClick={() => editar(categoria)}><EditIcon /></Button>
                                  </TableCell>
                                  <TableCell>
                                      <Button hoverIndicator="true" variant="outlined" onClick={() => eliminar(categoria)} ><DeleteIcon /> </Button>
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

export default Categorias;

import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from './Header';
import EmpleadoInsert from './InsertarEmpleado';
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

function Empleados (props) {
const [empleados, setEmpleados] = useState([]);
var id2 = '';
  useEffect(() => {
    const getEmpleados = async () => {
      const res = await fetch("/empleados", {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
      })
      //console.log(res);
      const response = await res.json();
      setEmpleados(response);
    }
    getEmpleados();
  })

  function eliminar(empleado){
    console.log(empleado.id);
    id2 = empleado.id;
    deleteEmpleado();
  }

  const deleteEmpleado = async () => {
    console.log("aqui");
    console.log(id2);
    const res = await fetch("/empleados/"+id2+"", {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    const response = await res.json();
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
      <Header/>
        <br />
      <Grid container spacing={3}>
      <Grid item xs={3}></Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={3}>
      < EmpleadoInsert InsertarEmpleado/>
      </Grid>
    </Grid>
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Table className={classes.table} >
        <TableHeader>
          <TableRow>
          <TableCell scope="col" border="bottom"><strong>ID</strong></TableCell>
          <TableCell align="center" size="small" scope="col" border="bottom"><strong>Nombre</strong></TableCell>
          <TableCell align="center" size="small" scope="col" border="bottom"><strong>Apellido</strong></TableCell>
          <TableCell align="center" size="small" scope="col" border="bottom"><strong>Salario</strong></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {empleados.map((empleado) =>
            <TableRow className="data-row">
              <TableCell align="center" >{empleado.id}</TableCell>
              <TableCell align="center" >{empleado.nombre}</TableCell>
              <TableCell align="center" >{empleado.apellido}</TableCell>
              <TableCell align="center" >{empleado.salario}</TableCell>
              <TableCell align="center" >
                <Button hoverIndicator="true" variant="outlined" onClick={() => eliminar(empleado)} ><DeleteIcon /> </Button>
                </TableCell>
            </TableRow>
          )}
        </TableBody>
        </Table>
        </Box>
        </Grommet>
    </div>
  );
}

export default Empleados;

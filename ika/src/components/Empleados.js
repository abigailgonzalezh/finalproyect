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

function Empleados (props) {
const [empleados, setEmpleados] = useState([]);

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
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Apellido</StyledTableCell>
            <StyledTableCell>Salario</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empleados.map((empleado) =>
            <TableRow className="data-row">
              <StyledTableCell>{empleado.id}</StyledTableCell>
              <StyledTableCell>{empleado.nombre}</StyledTableCell>
              <StyledTableCell>{empleado.apellido}</StyledTableCell>
              <StyledTableCell>{empleado.salario}</StyledTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Empleados;
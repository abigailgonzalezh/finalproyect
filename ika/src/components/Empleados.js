import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from './Header';
import EmpleadoInsert from './InsertarEmpleado';
import EditarEmpleados from './EditarEmpleados';
import EditIcon from '@material-ui/icons/Edit';
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

function Empleados (props) {
const [empleados, setEmpleados] = useState([]);
const [mail, setMail] = useState('');
const [password, setPassword] = useState('');
const [id, setId] = useState('');
const [nombre, setNombre] = useState('');
const [apellido, setApellido] = useState('');
const [salario, setSalario] = useState('');
const [open, setOpen] = React.useState(false);

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

  function editar(empleado){
    console.log("entro 1");
    console.log(empleado.id);
    setId(empleado.id);
    setMail(empleado.mail);
    setPassword(empleado.password);
    setNombre(empleado.nombre);
    setApellido(empleado.apellido);
    setMail(empleado.mail);
    setPassword(empleado.password);
    setSalario(empleado.salario);
    setOpen(true);
  }

  const deleteEmpleado = async () => {
    const res = await fetch("/delete/", {
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
      <Grommet theme={hp}>
        <Header/>
        {id && nombre && apellido && salario && open && mail && password &&
        <EditarEmpleados empleadoEdit={id} empleadoNombre = {nombre} empleadoApellido = {apellido} empleadoSalario = {salario}
         empleadoMail = {mail} empleadoPassword = {password} isOpen = {open} isClose = {handleClose}/>
        }
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
        <Box align="center" pad="large">
          <Table className={classes.table} >
          <TableHeader>
            <TableRow>
            <TableCell scope="col" border="bottom"><strong>ID</strong></TableCell>
            <TableCell align="center" size="small" scope="col" border="bottom"><strong>Nombre</strong></TableCell>
            <TableCell align="center" size="small" scope="col" border="bottom"><strong>Apellido</strong></TableCell>
            <TableCell align="center" size="small" scope="col" border="bottom"><strong>Correo</strong></TableCell>
            <TableCell align="center" size="small" scope="col" border="bottom"><strong>Salario</strong></TableCell>
            <TableCell align="end"scope="col" border="bottom"><strong></strong></TableCell>
            <TableCell align="end"scope="col" border="bottom"><strong></strong></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empleados.map((empleado) =>
              <TableRow className="data-row">
                <TableCell align="center" >{empleado.id}</TableCell>
                <TableCell align="center" >{empleado.nombre}</TableCell>
                <TableCell align="center" >{empleado.apellido}</TableCell>
                <TableCell align="center" >{empleado.mail}</TableCell>
                <TableCell align="center" >{empleado.salario}</TableCell>
                <TableCell align="center">
                  <Button hoverIndicator="true" onClick={() => editar(empleado)}><EditIcon /></Button>
                </TableCell>
                <TableCell align="center" >
                  <Button hoverIndicator="true" variant="outlined" onClick={() => eliminar(empleado)} ><DeleteIcon /> </Button>
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

export default Empleados;

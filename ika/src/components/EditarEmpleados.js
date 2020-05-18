import React, {useState} from 'react';
import { Grommet, Box, Image, Button } from "grommet";
import {TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

function EditarEmpleados(props){
    const idEmpleado = props.empleadoEdit;
    const nombreEmpleado = props.empleadoNombre;
    const apellidoEmpleado = props.empleadoApellido;
    const salarioEmpleado = props.empleadoSalario;

    const [id, setId] = useState(idEmpleado);
    const [nombre, setNombre] = useState(nombreEmpleado);
    const [apellido, setApellido] = useState(apellidoEmpleado);
    const [salario, setSalario] = useState(salarioEmpleado);
    const [open, setOpen] = React.useState(props.isOpen);

    const editEmpleados = async () => {
      const res = await fetch("/empleados", {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: id,
            nombre: nombre,
            apellido: apellido,
            salario: salario
          })
      })
        console.log(res);
        const response = await res.json();
        console.log(response);
    }
    
    function editar(){
      handleClose();
      editEmpleados();
      //window.location.reload();
    }
    //console.log(plot);

    const handleClose = () => {
      setOpen(props.isClose);
      console.log(open);
      var limpiarn = document.getElementById("nombr");
      limpiarn.value = " ";
      var apellidov = document.getElementById("apell");
      apellidov.value = " ";
      var salariov = document.getElementById("sal");
      salariov.value = " ";
      setId('');
    }; 
  
    const mystlye = {
      minWidth: "50%",
      minHeight: 50
    };

    const mystlye1 = {
        minWidth: "30%",
        minHeight: 50,
        top: 20,
        right: 30
      };

    const mystlye2 = {
        minWidth: "30%",
        minHeight: 50,
        top: 20
        
      };
    
      const mystlye3 = {
        minWidth: "30%",
        minHeight: 50,
        marginTop: 40,
        right: 30
      };
    
      const styletable = {
         width: "100%",
         marginTop:20
      };

    // getProductos();
  
    return (
      <div>
      <Dialog open={props.isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Agregar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Llene el formulario para agregar empleados
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nombr"
            value={nombre}
            onChange={(ev) => setNombre(ev.target.value)}
            label="Nombre"
            variant="outlined"
            fullWidth
          />
          <TextField
            margin="dense"
            id="apell"
            value={apellido}
            onChange={(ev) => setApellido(ev.target.value)}
            label="Apellido"
            variant="outlined"
            fullWidth
          />
          <TextField
            margin="dense"
            id="sal"
            value={salario}
            onChange={(ev) => setSalario(ev.target.value)}
            label="Salario"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button  size="medium" label="Cancelar" onClick={handleClose} >
          </Button>
          <Button id="submit-button"
              onClick={() => editar()}
              size="large"
              size="medium" label="Editar">
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}

export default EditarEmpleados;
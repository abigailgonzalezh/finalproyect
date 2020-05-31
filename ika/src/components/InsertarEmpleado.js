import React, {useState} from 'react';
import { Grommet, Box, Image, Button } from "grommet";
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function InsertarEmpleados(props) {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [salario, setSalario] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      var limpiarn = document.getElementById("nombr");
      limpiarn.value = " ";
      var apellidov = document.getElementById("apell");
      apellidov.value = " ";
      var salariov = document.getElementById("sal");
      salariov.value = " ";
      var mailv = document.getElementById("mail");
      mailv.value = " ";
      var passv = document.getElementById("pass");
      passv.value = " ";
    };

    const postEmpleados = async () => {
        const res = await fetch("/join", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            mail: mail,
            password: password,
            nombre: nombre,
            apellido: apellido,
            salario: salario
          })
        })
        const response = await res.json();
    }

    function agregar(){    const [password, setPassword] = ('');

      handleClose();
      postEmpleados();
    }

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

      const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
        },
      }));


    return (
      <div>
        <Button primary size="medium" label="Agregar empleado" onClick={handleClickOpen}/>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Agregar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Llene el formulario para agregar empleados
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="mail"
            //value={nombre}
            onChange={(ev) => setMail(ev.target.value)}
            label="Mail"
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="pass"
            //value={nombre}
            onChange={(ev) => setPassword(ev.target.value)}
            label="Password"
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="nombr"
            //value={nombre}
            onChange={(ev) => setNombre(ev.target.value)}
            label="Nombre"
            variant="outlined"
            fullWidth
          />
          <TextField
            margin="dense"
            id="apell"
            //value={precioCompra}
            onChange={(ev) => setApellido(ev.target.value)}
            label="Apellido"
            variant="outlined"
            fullWidth
          />
          <TextField
            margin="dense"
            id="sal"
            //value={precioVenta}
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
              onClick={() => agregar()}
              size="large"
              size="medium" label="Agregar">
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}

export default InsertarEmpleados;

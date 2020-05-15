import React, {useState} from 'react';
import { Grommet, Box, Image, Button } from "grommet";
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'

function InsertarSugerencias(props) {
    const [nombre, setNombre] = useState('');
    const [peticion1, setPeticion1] = useState('');
    //console.log("La respuesta es");

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      var limpiar = document.getElementById("client");
      limpiar.value = " ";
      var comprav = document.getElementById("sugerenci");
      comprav.value = " ";
    };  

    const postSugerencias = async () => {
      const res = await fetch("/sugerencias", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            cliente: nombre,
            peticion: peticion1,
          })
      })
      //console.log(res);
      const response = await res.json();
      //setSugerencias(response);
    }
    
    function agregar(){
      handleClose();
      postSugerencias();
    }
    //console.log(plot);
  
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

    // getSugerencias();
  
    return (
      <div>
      <Button primary size="medium" label="Añadir sugerencias" onClick={handleClickOpen}>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sugerencias</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Llene el formulario para agregar una Sugerencias
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="client"
            //value={nombre}
            onChange={(ev) => setNombre(ev.target.value)}
            label="Nombre del cliente"
            variant="outlined"
            fullWidth
          />
          <TextField
            margin="dense"
            id="sugerenci"
            //value={precioCompra}
            onChange={(ev) => setPeticion1(ev.target.value)}
            label="Sugerencia"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button   size="medium" label="Cancelar" onClick={handleClose} >
          </Button>
          <Button id="submit-button"
              onClick={() => agregar()}
              variant="outlined"
              size="large"
              size="medium" label="Agregar">
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}

export default InsertarSugerencias;
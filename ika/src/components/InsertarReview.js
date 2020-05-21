import React, {useState} from 'react';
import { Grommet, Box, Image, Button } from "grommet";
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

function InsertarSugerencias(props) {
    const [nombre, setNombre] = useState('');
    const [peticion1, setPeticion1] = useState('');
    const [value, setValue] = React.useState(2);
    const [open, setOpen] = React.useState(false);
    const [hover, setHover] = React.useState(-1);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      var comprav = document.getElementById("sugerenci");
      comprav.value = " ";
    };

    const postSugerencias = async () => {
      const res = await fetch("/suggestions", {
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

      const labels = {
        1: 'Muy malo',
        2: 'Malo',
        3: 'Regular',
        4: 'Bueno',
        5: 'Excelente',
      };

    // getSugerencias();

    return (
      <div>
      <Button primary size="medium" label="Añadir Reseña" onClick={handleClickOpen}>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reseñas</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Llene el formulario para agregar una reseña
          </DialogContentText>

          <Rating
            name="hover-feedback"
            value={value}
            precision={1}
            onChange={(event, newValue) => {
              setValue(newValue);
              }}
             onChangeActive={(event, newHover) => {
               setHover(newHover);
             }}
            />

          <TextField
            margin="dense"
            id="sugerenci"
            //value={precioCompra}
            onChange={(ev) => setPeticion1(ev.target.value)}
            label="Reseña"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
          />

          <input id="file-upload" type="file" accept="image/*" />

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

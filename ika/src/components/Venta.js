import React, {useState} from 'react';
import { Grommet, Box, Image, Button } from "grommet";
import {TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import { hp } from "grommet-theme-hp";
import NumberFormat from 'react-number-format';
function Venta(props){
    const [cantidad, setCantidad] = useState('');
    const idProducto = props.venta;

    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      var compri = document.getElementById("cant");
      compri.value = " ";
    };

    const venta = async () => {
        const res = await fetch("/procedimientos", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id1:idProducto,
              cantidad1: cantidad
            })
        })
        var compri = document.getElementById("cant");
        compri.value = " ";
      }

    function vender(){
      handleClose();
      venta();
      //window.location.reload();
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

    // getProductos();
    const gettoken = localStorage.getItem('token');
    if(gettoken!=null){
      return (
        <Grommet theme={hp}>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Vender</DialogTitle>
          <DialogContent>
            <DialogContentText>
               Digite el numero de productos a vender
            </DialogContentText>
            <NumberFormat
              autoFocus
              margin="dense"
              id="cant"
              //value={cantidad}
              onChange={(ev) => setCantidad(ev.target.value)}
              customInput={TextField}
              label="Cantidad"
              variant="outlined"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button  size="medium" label="Cancelar" onClick={handleClose} >
            </Button>
            <Button id="submit-button"
                onClick={() => vender()}
                size="large"
                size="medium" label="Vender">
            </Button>
          </DialogActions>
        </Dialog>
      </Grommet>
      );
    }else{
      return(
        <p>Necesitas inciar sesion</p>
      );
    }
}

export default Venta;

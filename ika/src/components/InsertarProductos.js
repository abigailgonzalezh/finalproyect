import React, {useState} from 'react';

import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'

function InsertarProductos(props) {
    const [nombre, setNombre] = useState('');
    const [precioCompra, setPrecioCompra] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [cantidad, setCantidad] = useState('');
    //const [categoria, setCategoria] = useState('');
    //console.log("La respuesta es");

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };  

    const postProductos = async () => {
      const res = await fetch("/productos", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            nombre1: nombre,
            precioCompra1: precioCompra,
            precioVenta1: precioVenta,
            cantidad1: cantidad
          })
      })
      //console.log(res);
      const response = await res.json();
      //setProductos(response);

    }
    
    function agregar(){
      handleClose();
      postProductos();
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
  
    return (
      <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Insertar Producto
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Agregar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Llene el formulario para agregar productos
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Nombre"
            value={nombre}
            onChange={(ev) => setNombre(ev.target.value)}
            label="Nombre"
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="Precio de Compra"
            value={precioCompra}
            onChange={(ev) => setPrecioCompra(ev.target.value)}
            label="Precio de Compra"
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="Precio de Venta"
            value={precioVenta}
            onChange={(ev) => setPrecioVenta(ev.target.value)}
            label="Precio de Venta"
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="Cantidad"
            value={cantidad}
            onChange={(ev) => setCantidad(ev.target.value)}
            label="Cantidad"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button id="submit-button"
              onClick={() => agregar()}
              variant="outlined"
              size="large"
              color="primary"color="primary">
            Agregar Producto
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}

export default InsertarProductos;
import React, {useState} from 'react';
import { Grommet, Box, Image, Button } from "grommet";
import {TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

function EditarProductos(props){
    const idProducto = props.productoEdit;
    const nombreProducto = props.productoNombre;
    const precioCompraProducto = props.productoPrecioCompra;
    const precioVentaProducto = props.productoPrecioVenta;
    const cantidadProducto = props.productoCantidad;
    const abierto = props.isOpen;

    const [id, setId] = useState(idProducto);
    const [nombre, setNombre] = useState(nombreProducto);
    const [precioCompra, setPrecioCompra] = useState(precioCompraProducto);
    const [precioVenta, setPrecioVenta] = useState(precioVentaProducto);
    const [cantidad, setCantidad] = useState(cantidadProducto);
    const [open, setOpen] = React.useState(abierto);
  
    const handleClose = () => {
      setOpen(false);
      var limpiar = document.getElementById("nombr");
      limpiar.value = " ";
      var comprav = document.getElementById("compr");
      comprav.value = " ";
      var venti = document.getElementById("vent");
      venti.value = " ";
      var compri = document.getElementById("cant");
      compri.value = " ";
      setId('');
    };  

    const editProductos = async () => {
      const res = await fetch("/productos", {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: idProducto,
            nombre1: nombre,
            precioCompra1: precioCompra,
            precioVenta1: precioVenta,
            cantidad1: cantidad
          })
      })
      //console.log(res);
      const response = await res.json();
      //setProductos(response);

      var limpiar = document.getElementById("nombr");
      limpiar.value = " ";
      var comprav = document.getElementById("compr");
      comprav.value = " ";
      var venti = document.getElementById("vent");
      venti.value = " ";
      var compri = document.getElementById("cant");
      compri.value = " ";
      setId('');
      setOpen(false);
    }
    
    function editar(){
      handleClose();
      editProductos();
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
  
    return (
      <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Llene el formulario para editar productos
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
            id="compr"
            value={precioCompra}
            onChange={(ev) => setPrecioCompra(ev.target.value)}
            label="Precio de Compra"
            variant="outlined"
            fullWidth
          />
          <TextField
            margin="dense"
            id="vent"
            value={precioVenta}
            onChange={(ev) => setPrecioVenta(ev.target.value)}
            label="Precio de Venta"
            variant="outlined"
            fullWidth
          />
          <TextField
            margin="dense"
            id="cant"
            value={cantidad}
            onChange={(ev) => setCantidad(ev.target.value)}
            label="Cantidad"
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

export default EditarProductos;
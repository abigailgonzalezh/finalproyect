import React, {useState} from 'react';

import {Button, TextField} from '@material-ui/core'

function InsertarProductos(props) {
    const [nombre, setNombre] = useState('');
    const [precioCompra, setPrecioCompra] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [cantidad, setCantidad] = useState('');
    //const [categoria, setCategoria] = useState('');
    //console.log("La respuesta es");

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
         <div> 
            <TextField
                    id="Nombre"
                    value={nombre}
                    onChange={(ev) => setNombre(ev.target.value)}
                    label="Nombre"
                    variant="outlined"
                    style={mystlye1}
                />
            <TextField
                    id="Precio de Compra"
                    value={precioCompra}
                    onChange={(ev) => setPrecioCompra(ev.target.value)}
                    label="Precio de Compra"
                    variant="outlined"
                    style={mystlye2}
            />
            <br></br>
            <TextField
                    id="Precio de Venta"
                    value={precioVenta}
                    onChange={(ev) => setPrecioVenta(ev.target.value)}
                    label="Precio de Venta"
                    variant="outlined"
                    style={mystlye1}
                />
            <TextField
                    id="Cantidad"
                    value={cantidad}
                    onChange={(ev) => setCantidad(ev.target.value)}
                    label="Cantidad"
                    variant="outlined"
                    style={mystlye2}
            />
        </div>
        <div>  
        <Button
              id="submit-button"
              onClick={() => postProductos()}
              variant="outlined"
              size="large"
              color="primary"
              style={mystlye3} >
          Agregar Producto
          </Button>
        </div>
  
      </div>
    );
}

export default InsertarProductos;
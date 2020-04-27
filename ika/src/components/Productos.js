import React, {useState} from 'react';

import {Button, TableHead, 
  TableRow, TableCell, TableBody} from '@material-ui/core'

function Productos(props) {
    const [productos, setProductos] = useState([]);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [compra, setCompra] = useState('');
    const [venta, setVenta] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categorias, setCategorias] = useState('');
    console.log("La respuesta es");

    const getProductos = async () => {
      const res = await fetch("/productos", {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
      })
      //console.log(res);
      const response = await res.json();
      //console.log(response[].id);
      const nombre1 = response[0].nombre;
      setNombre(nombre1);
      const id1 = response[0].id;
      setId(id1);
      const compra1 = response[0].precio_compra;
      setCompra(compra1);
      const venta1 = response[0].precio_venta;
      setVenta(venta1);
      const cantidad1 = response[0].cantidad;
      setCantidad(cantidad1);
      const categorias1 = response[0].categorias_id;
      setCategorias(categorias1);
    }
    
    //console.log(plot);
  
    const mystlye = {
      minWidth: "50%",
      minHeight: 50
    };
  
    return (
      <div>
        <div>
        <Button
              id="submit-button"
              onClick={() => getProductos()}
              variant="outlined"
              size="large"
              color="primary"
              style={mystlye} >
          GET PRODUCTOS
          </Button>
        </div>
        <br/>
        <table style={{width: "100%"}}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio de Compra</TableCell>
              <TableCell>Precio de Venta</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className="data-row">
              <TableCell>{id}</TableCell>
              <TableCell>{nombre}</TableCell>
              <TableCell>{compra}</TableCell>
              <TableCell>{venta}</TableCell>
              <TableCell>{cantidad}</TableCell>
              <TableCell>{categorias}</TableCell>
            </TableRow>
          </TableBody>
        </table>
  
      </div>
    );
}

export default Productos;
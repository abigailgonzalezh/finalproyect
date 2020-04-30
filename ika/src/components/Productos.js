import React, {useState} from 'react';

import {Button, TableHead, 
  TableRow, TableCell, TableBody} from '@material-ui/core'

function Productos(props) {
    const [productos, setProductos] = useState([]);
    console.log("La respuesta es");

    const getProductos = async () => {
      const res = await fetch("/productos", {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
      })
      //console.log(res);
      const response = await res.json();
      setProductos(response);
    }
    
    //console.log(plot);
  
    const mystlye = {
      minWidth: "50%",
      minHeight: 50
    };

    //getProductos();
  
    return (
      <div>
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
            {productos.map((producto) =>
              <TableRow className="data-row">
                <TableCell>{producto.id}</TableCell>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.precio_compra}</TableCell>
                <TableCell>{producto.precio_venta}</TableCell>
                <TableCell>{producto.cantidad}</TableCell>
                <TableCell>{producto.categorias_id}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </table>
  
      </div>
    );
}

export default Productos;
import React from 'react';
import './App.css';
import Productos from './components/Productos';
import InsertarProductos from './components/InsertarProductos';

function App() {
  return (
    <div className="App">
      <InsertarProductos productoInsert="fer"/>
      <Productos producto="oscar" />
    </div>
  );
}

export default App;

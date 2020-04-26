import React from 'react';
import logo from './logo.svg';
import './App.css';
import Productos from './components/productos/productos';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Productos/> 
    </div>
  );
}

export default App;

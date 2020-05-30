import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Productos from './components/Productos';
import Reviews from './components/Reviews';
import Cliente from './components/ClienteProductos';
import Ventas from './components/EmpleadoProductos';
import Corte from './components/CorteCaja';
import Historial from './components/Historial';
import Empleado from './components/Empleados';
import Categorias from './components/Categorias';
import Index from './components/Index';
import Chart from './components/Chart';
function App() {
  return (
    <Router>
        <Switch>
          <Route path="/personal">
            <Empleado/>
          </Route>
          <Route path="/Historial">
            <Historial/>
          </Route>
          <Route path="/corte">
            <Corte/>
          </Route>
          <Route path="/ventas">
            <Ventas/>
          </Route>
          <Route path="/cliente">
            <Cliente/>
          </Route>
          <Route path="/review">
           <Reviews/>
          </Route>
          <Route path="/productos">
            <Productos/>
          </Route>
          <Route path="/categorias">
            <Categorias/>
          </Route>
          <Route path="/">
            <Index/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;

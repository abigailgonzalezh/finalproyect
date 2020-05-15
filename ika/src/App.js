import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Productos from './components/Productos';
import Sugerencias from './components/Sugerencias';
import Cliente from './components/ClienteProductos';
import Ventas from './components/EmpleadoProductos';
import Corte from './components/CorteCaja';
import Balance from './components/Balance';
import Historial from './components/Historial';
import Empleado from './components/Empleados';
import Index from './components/Index';
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
          <Route path="/bal">
            <Balance/>
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
          <Route path="/sug">
           <Sugerencias/>
          </Route>
          <Route path="/prod">
            <Productos/>
          </Route>
          <Route path="/">
            <Index/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;

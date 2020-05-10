import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Productos from './components/Productos';
import Sugerencias from './components/Sugerencias';
import Cliente from './components/ClienteProductos';
import Ventas from './components/EmpleadoProductos';
import { Container } from '@material-ui/core';


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/ventas">
            <Ventas/>
          </Route>
          <Route path="/cliente">
            <Cliente/>
          </Route>
          <Route path="/sug">
           <Sugerencias/>
          </Route>
          <Route path="/">
            <Productos/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;

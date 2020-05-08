import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Productos from './components/Productos';
import Sugerencias from './components/Sugerencias';
import { Container } from '@material-ui/core';


function App() {
  return (
    <Router>
      <Container>
        <p/>
        <Switch>
          <Route path="/sug">
           <Sugerencias/>
          </Route>
          <Route path="/">
            <Productos/>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;

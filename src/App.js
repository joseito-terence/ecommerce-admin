import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import SideNav from './Components/SideNav/';

import Home from './Components/Home';
import Products from './Components/Products';

function App() {
  return (
    <div className="App">
      <Router>
        <SideNav />

        <main className="content-frame">
          <Switch>
            <Route path='/products' component={Products} />
            <Route path='/' component={Home} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;

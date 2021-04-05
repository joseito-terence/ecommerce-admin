import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { selectRecord, setPrevImages } from './redux/actions';
import { useDispatch } from 'react-redux';
import './App.css';
import SideNav from './Components/SideNav/';

import Home from './Components/Home';
import Products from './Components/Products';
import Orders from './Components/Orders';
import Sellers from './Components/Sellers';
import Customers from './Components/Customers';
import OptionBar from './Components/OptionBar';

function App() {
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if(location.pathname !== '/'){
      const table = document.querySelector('table');        // get ref to the table.
      table.onclick = e => {                                // onClick event listener on the table.
        const targetRow = e.target.parentElement
        const recordId = targetRow.id;                      // get recordId.
        dispatch(selectRecord(recordId, location.pathname.slice(1)));

        if (location.pathname === '/products') {
          const images = targetRow.dataset.images;
          dispatch(setPrevImages(images));
        }
      }
    }
  }, [dispatch, location.pathname]);                      // execute effect everytime path changes.


  return (
    <div className="App">
      <SideNav />
    
      <div>
        {location.pathname !== '/' && 
          <OptionBar />
        }

        <main className="content-frame" style={{ minHeight: location.pathname === '/' && '100vh' }}>
          <Switch>
            <Route path='/sellers' component={Sellers} />
            <Route path='/customers' component={Customers} />
            <Route path='/orders' component={Orders} />
            <Route path='/products' component={Products} />
            <Route path='/' component={Home} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default App;

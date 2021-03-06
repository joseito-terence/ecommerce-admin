import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { changeAuthState, selectRecord, setPrevImages, setUserStatus } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { searchTableAndFilter } from './Utilities';

import SideNav from './Components/SideNav/';
import Home from './Components/Home';
import Products from './Components/Products';
import Orders from './Components/Orders';
import Sellers from './Components/Sellers';
import Customers from './Components/Customers';
import OptionBar from './Components/OptionBar';
import Toast from './Components/Toast';
import Promocodes from './Components/Promocodes';
import Login from './Components/Login';
import Preloader from './Components/Preloader';

function App() {
  let location = useLocation();
  const dispatch = useDispatch(); 
  const authUser = useSelector(state => state.authUser);
  const searchKey = useSelector(state => state.searchKey);

  useEffect(() => {
    if(location.pathname !== '/'){
      const table = document.querySelector('table');        // get ref to the table.
      try {
        table.onclick = e => {                                // onClick event listener on the table.
          const targetRow = e.target.parentElement
          const recordId = targetRow.id;                      // get recordId.
          dispatch(selectRecord(recordId, location.pathname.slice(1)));
          
  
          switch(location.pathname) {
            case '/products':
              const images = targetRow.dataset.images;
              dispatch(setPrevImages(images));
              break;
            
            case '/sellers':
            case '/customers':
              const disabled = targetRow.dataset.disabled;
              dispatch(setUserStatus(disabled));
              break; 
  
            default: break;
          }
        }
      }
      catch (e) {
        console.error(e);
      } 
    }
  }, [dispatch, location.pathname]);                      // execute effect everytime path changes.

  useEffect(() => {
    if(location.pathname !== '/'){
      searchTableAndFilter(searchKey);
    }
  }, [searchKey, location.pathname]);

  useEffect(() => {
    const localStorage_authUser = localStorage.getItem('localStorage_authUser');
    if(localStorage_authUser && localStorage_authUser !== 'null') {
      dispatch(changeAuthState({ username: localStorage_authUser }));
    }
  }, [dispatch]);

  return (
    <div className="App">
      {authUser ? (
        <>
          <SideNav />
    
          <div>
            {location.pathname !== '/' && 
              <OptionBar />
            }

            <main className="content-frame" style={{ minHeight: location.pathname === '/' && '100vh' }}>
              <Switch>
                <Route path='/promocodes' component={Promocodes} />
                <Route path='/sellers' component={Sellers} />
                <Route path='/customers' component={Customers} />
                <Route path='/orders' component={Orders} />
                <Route path='/products' component={Products} />
                <Route path='/' component={Home} />
              </Switch>
            </main>
          </div>
          
          <Preloader />
          <Toast />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

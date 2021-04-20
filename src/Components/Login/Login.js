import React, { useState } from 'react';
import './Login.css';
import { ReactComponent as AdminSVG } from '../../Assets/administrator.svg';
import db from '../../firebase';
import { useDispatch } from 'react-redux';
import { changeAuthState } from '../../redux/actions';

function Login() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('');

  const handleChange = ({ target }) => {
    let value = (target.id === 'rememberMe') ? target.checked : target.value;
    setState({ ...state, [target.id]: value });
  };


  const login = event => {
    event.preventDefault();

    db.doc(`admins/${state.username}`)
      .get()
      .then(doc => {
        if(doc.exists) {
          if(doc.data().password === state.password) {
            console.log("you're in");
            setError('');
            dispatch(changeAuthState(doc.data()));
            localStorage.setItem('localStorage_authUser', state.username);
          } else {
            setError('Incorrect password');
          }
        }
        else 
          setError('User not found!');
      })
      .catch(err => {
        setError(err.message);
      })
  }

  return (
    <div className='login'>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="login__form">
              <h2>Sign In</h2>
              <form onSubmit={login}>
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input type="username" className="form-control" id="username" onChange={handleChange} value={state.username} required />

                <label htmlFor="password" className="form-label mt-1">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control mb-2"
                  id="password"
                  onChange={handleChange}
                  value={state.password}
                  required
                />

                <div className="text-danger">
                  {error}
                </div> 

                <input type="submit" className="btn btn-primary mt-2" value="Sign in" />
 
              </form>
            </div>
          </div>
          <div className="col">
            <AdminSVG />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login;
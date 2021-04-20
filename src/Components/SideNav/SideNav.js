import React from 'react';
import './SideNav.css';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../../Assets/logo001SVG.svg';
import { useDispatch } from 'react-redux';
import { changeAuthState } from '../../redux/actions';

function SideNav() {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(changeAuthState(null));
    history.push('/');
    localStorage.setItem('localStorage_authUser', null);
  }

  return (
    <div className='sidenav'>
      <header>
        <Link to="/">
          <div className="header__logo">
            <Logo />
          </div>
        </Link>
        <nav>
          <NavItem text="Products" link="/products" />
          <NavItem text="Orders" link="/orders" />
          <NavItem text="Customers" link="/customers" />
          <NavItem text="Sellers" link="/sellers" />
          <NavItem text="Promocodes" link="/promocodes" />
        </nav>
      </header>   

      <footer>
        <button className="fas fa-sign-out-alt btn btn-secondary w-100" onClick={logout}>
          {' '} Logout
        </button>
      </footer>
    </div>
  )
}

export default SideNav;

function NavItem({ text, link, icon }) {
  return (
    <NavLink
      exact
      className="sidenav__link btn text-light w-100 my-1"
      activeClassName="sidenav__link-active"
      to={link}
    >
      <i className={`fas fa-${icon}`}></i> {text}
    </NavLink>
  );
}

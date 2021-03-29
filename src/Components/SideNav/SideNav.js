import React from 'react';
import './SideNav.css';
import { Link, NavLink } from 'react-router-dom';

function SideNav() {
  return (
    <div className='sidenav'>
      <header>
        <Link to="/">
          <img  className="header__logo" src="https://josephreisigl.files.wordpress.com/2015/08/amazonlogo.png" alt="logo" />
        </Link>
        <nav>
          <NavItem text="Products" link="/products" />
          <NavItem text="Orders" link="/orders" />
          <NavItem text="Customers" link="/customers" />
          <NavItem text="Sellers" link="/sellers" />
        </nav>
      </header>   

      <footer>
        <button className="fas fa-sign-out-alt btn btn-secondary w-100">
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

import React from "react";
import "./Home.css";
import { Link } from 'react-router-dom';

import { ReactComponent as ProductsIcon } from '../../Assets/products.svg';
import { ReactComponent as OrdersIcon } from '../../Assets/orders.svg';
import { ReactComponent as CustomerIcon } from '../../Assets/customers.svg';
import { ReactComponent as SellerIcon } from '../../Assets/sellers.svg';

function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="card">
          <ProductsIcon />
          <Link to='/products' className='stretched-link' />
          <h4>Products</h4>
        </div>
        <div className="card">
          <OrdersIcon />
          <Link to='/orders' className='stretched-link' />
          <h4>Orders</h4>
        </div>
        <div className="card">
          <CustomerIcon />
          <Link to='/customers' className='stretched-link' />
          <h4>Customers</h4>
        </div>
        <div className="card">
          <SellerIcon />
          <Link to='/sellers' className='stretched-link' />
          <h4>Sellers</h4>
        </div>
      </div>
    </div>
  );
}
export default Home;

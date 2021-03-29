import React, { useState, useEffect } from 'react';
import './Products.css';
import db, { auth, storage } from '../../firebase';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('products')
      .limit(5)
      .onSnapshot(snap => {
        setProducts(
          snap.docs.map((doc) => 
            ({ ...doc.data(), id: doc.id })
          )
        );
      })
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <div className='products'>
      <table className="productsTable table table-striped">
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
        {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td className='text-wrap'>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td className='text-wrap'>{product.tags.map(tag => `${tag}, `)}</td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}
export default Products;
import React, { useState, useEffect } from 'react';
import './Products.css';
import db from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { deselectRecord } from '../../redux/actions';

function Products() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const selection = useSelector(state => state.selection);

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
      dispatch(deselectRecord());
    }
  }, [dispatch]);

  return (
    <div className='products'>
      <table className="table table-striped">
        <thead className='thead-sticky'>
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
          <tr key={product.id} id={product.id} className={`${selection === product.id && 'tr-selected'}`}>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td className='text-wrap' style={{ minWidth: '250px' }}>{product.description}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td className='text-nowrap'>{product.tags.map(tag => `${tag}, `)}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}
export default Products;
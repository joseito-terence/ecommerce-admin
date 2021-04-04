import React, { useEffect, useState } from 'react';
import db from '../../firebase';
import './Sellers.css';
import { useDispatch, useSelector } from 'react-redux';
import { deselectRecord } from '../../redux/actions';

function Sellers() {
  const [sellers, setSellers] = useState([]);
  const dispatch = useDispatch();
  const selection = useSelector(state => state.selection);
  
  useEffect(() => {
    const unsubscribe = db.collection('sellers')
      .onSnapshot(snap => setSellers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))))
    
    return () => {
      unsubscribe();
      dispatch(deselectRecord());
    }
  }, [dispatch]);

  return (
    <div className='sellers'> 
      <table className="table table-striped">
        <thead className="thead-sticky">
          <tr>
            <th>Seller ID</th>
            <th>Email</th>
            <th>Phone No.</th>
            <th>Owner Name</th>
            <th>Store No.</th>
            <th>Store Name</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map(seller => (
            <tr key={seller.id} id={seller.id} className={`${selection === seller.id && 'tr-selected'}`}>
              <td>{seller.id}</td>
              <td>{seller.email}</td>
              <td>{seller.phone}</td>
              <td>{seller.billingInfo.accHoldersName}</td>
              <td>{seller.businessInfo.shopNo}</td>
              <td>{seller.businessInfo.storeName}</td>
              <td>{seller.businessInfo.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Sellers;
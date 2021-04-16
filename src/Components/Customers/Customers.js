import React, { useState, useEffect } from "react";
import db from "../../firebase";
import { useDispatch, useSelector } from 'react-redux';
import { deselectRecord } from '../../redux/actions';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const dispatch = useDispatch();
  const selection = useSelector(state => state.selection);
  
  useEffect(() => {
    const unsubscribe = db.collection('customers')
      .onSnapshot(snap => setCustomers(
        snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      ))

    return () => {
      unsubscribe();
      dispatch(deselectRecord());
    }
  }, [dispatch]);

  
  return (
    <div className='customers'>
      <table className="table table-striped">
        <thead className="thead-sticky">
          <tr>
            <th>Customer Id</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Landmark</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Pincode</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr 
              key={customer.uid} 
              id={customer.id} 
              className={`${selection === customer.id && 'tr-selected'}`}
              data-disabled={`${customer?.disabled}`}
            >
              <td>{customer.uid}</td>
              <td>{customer.id}</td>
              <td>{customer.phno}</td>
              <td>{customer.address?.address}</td>
              <td>{customer.address?.landmark}</td>
              <td>{customer.address?.city}</td>
              <td>{customer.address?.state}</td>
              <td>{customer.address?.country}</td>
              <td>{customer.address?.pincode}</td>
              <td>{customer?.disabled ? 'disabled' : 'Active'}</td>
            </tr>
          ))}
        </tbody>
      </table>   
    </div>
  )
}
export default Customers;
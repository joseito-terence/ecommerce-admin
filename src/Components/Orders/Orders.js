import React, { useState, useEffect } from "react";
import db from "../../firebase";
import "./Orders.css";
import { useDispatch, useSelector } from 'react-redux';
import { deselectRecord } from '../../redux/actions';

function Orders() {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const selection = useSelector(state => state.selection);
  
  useEffect(() => {
    const unsubscribe = db
      .collection("orders")
      .orderBy("order_date", "desc")
      .onSnapshot((snap) =>
        setOrders(
          snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            order_date: doc.data().order_date.toDate().toString().slice(0, 24),
          }))
        )
      );

    return () => {
      unsubscribe();
      dispatch(deselectRecord());
    };
  }, [dispatch]);

  return (
    <div className="orders">
      <table className="table table-striped">
        <thead className="thead-sticky">
          <tr>
            <th>Order Id</th>
            <th>Order Date</th>
            <th>Title</th>
            <th>Qty</th>
            <th>Customer Id</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} id={order.id} className={`${selection === order.id && 'tr-selected'}`}>
              <td>{order.id}</td>
              <td>{order.order_date}</td>
              <td>{order.title}</td>
              <td>{order.qty}</td>
              <td>{order.customerId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Orders;

import React, { useState, useEffect } from "react";
import db from "../../firebase";
import { useDispatch, useSelector } from 'react-redux';
import { deselectRecord } from '../../redux/actions';
import { dateToString } from "../../Utilities";

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
            ...doc.data(),
            id: doc.id,
            productId: doc.data().id,
            order_date: dateToString(doc.data().order_date),
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
            <th style={{ minWidth: '218px' }}>Order Date</th>
            <th style={{ minWidth: '218px' }}>Title</th>
            <th>Qty</th>
            <th>Product Id</th>
            <th>Customer Id</th>
            <th>Payment Id</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} id={order.id} className={`${selection === order.id && 'tr-selected'}`}>
              <td>{order.id}</td>
              <td>{order.order_date}</td>
              <td>{order.title}</td>
              <td>{order.qty}</td>
              <td>{order.productId}</td>
              <td>{order.customerId}</td>
              <td>{order.razorpay_payment_id}</td>
              <td>{!order?.status ? 'Order Placed' : 'Cancelled'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Orders;

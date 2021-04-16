import React, { useState, useEffect } from 'react';
import db from '../../firebase';
import Modal from '../Modal';
import AddPromocode from './AddPromocode';
import { useDispatch, useSelector } from 'react-redux';
import { deselectRecord } from '../../redux/actions';
import { dateToString } from '../../Utilities';

function Promocodes() {
  const [promocodes, setPromocodes] = useState([]);
  const dispatch = useDispatch();
  const selection = useSelector(state => state.selection);

  useEffect(() => {
    const unsubscribe = db.collection('promocodes')
      .limit(5)
      .onSnapshot(snap => {
        setPromocodes(
          snap.docs.map((doc) => 
            ({ ...doc.data(), created_on: dateToString(doc.data().created_on) })
          )
        );
      })
    return () => {
      unsubscribe();
      dispatch(deselectRecord());
    }
  }, [dispatch]);

  return (
    <div className='promocodes'>   
      <Modal id='addPromocodeModal' title='Add Promocode' className='d-none'>
        <AddPromocode />
      </Modal>
      <table className="table table-striped">
        <thead className="thead-sticky">
          <tr>
            <th style={{ width: '220px' }}>Date of Creation</th>
            <th>Code</th>
            <th>Expiry (DateTime)</th>
          </tr>
        </thead>
        <tbody>
          {promocodes.map(promocode => (
            <tr key={promocode.code} id={promocode.code} className={`${selection === promocode.code && 'tr-selected'}`}>
              <td>{promocode.created_on}</td>
              <td>{promocode.code}</td>
              <td>{promocode.expiry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Promocodes;
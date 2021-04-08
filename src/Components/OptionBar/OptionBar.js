import React from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deselectRecord } from '../../redux/actions';
import './OptionBar.css';
import Modal from '../Modal';
import ViewImages from './ViewImages';
import deleteProduct from '../../Utilities/deleteRecord';
import axios from 'axios';

function OptionBar() {
  const { pathname } = useLocation();
  const selection = useSelector(state => state.selection);
  const productImages = useSelector(state => state.productImages);
  const userStatus = useSelector(state => state.userStatus);
  const tableName = useSelector(state => state.tableName);
  const dispatch = useDispatch();

  const clearSelection = () => {
    dispatch(deselectRecord());
  }

  const deleteUser = (uid, userType) => {
    if(window.confirm("This process can't be undone. Delete User?")){
      axios.delete(`https://tybca-project-api.herokuapp.com/user/${uid}`, { userType });
    }
  }

  const deleteRecord = () => {
    switch(pathname){
      case '/products':
        deleteProduct(selection, productImages);
        break;
      
      case '/sellers':
      case '/customers':
        deleteUser(selection, tableName);
        break;
      
      default: break;
    }
  }

  const disableUser = () => {
    // confirm disable/enable
    // make api request with axios
    // done
    const option = !userStatus ? 'disable' : 'enable';

    if(window.confirm(`Do you want to ${option} this user?`)){
      axios.put(`https://tybca-project-api.herokuapp.com/user/${option}`, { 
        uid: selection,
        userType: tableName,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }
  }

  return (
    <div className='optionBar'>   
      <div className='optionBar__left'>
        <button disabled={!selection} onClick={clearSelection} className="optionBar__btn btn far fa-minus-square" data-toggle="tooltip" data-placement="bottom" title="Deselect"></button>
      </div>
      
      <div className="optionBar__right">
        <button onClick={deleteRecord} disabled={!selection} className="optionBar__btn btn fas fa-trash-alt" data-toggle="tooltip" data-placement="bottom" title="Delete"></button>
        
        {(pathname === '/customers' || pathname === '/sellers') &&  // display the disable user button only for the customer and seller pages.
          <button onClick={disableUser} disabled={!selection} className="optionBar__btn btn fas fa-user-slash" data-toggle="tooltip" data-placement="bottom" title="Disable User"></button>
        }
        
        {pathname === '/products' &&   // display the view images button only for products page.
          <span data-toggle="tooltip" data-placement="bottom" title="View Images">
            <button disabled={!selection} className="optionBar__btn btn far fa-image" style={{ fontSize: '1.5rem' }} data-toggle="modal" data-target="#previewImagesModal"></button>
          </span>
        }
        
        <Modal id='previewImagesModal' title='Images (Preview)' className='d-none'>
          <ViewImages />
        </Modal>

        <div className="optionBar__search">
          <input type="search" className="form-control" placeholder="Search..." />
        </div>
      </div>
    </div>
  )
}
export default OptionBar;
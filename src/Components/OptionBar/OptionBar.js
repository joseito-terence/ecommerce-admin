import React from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deselectRecord, setSearchKey } from '../../redux/actions';
import './OptionBar.css';
import Modal from '../Modal';
import ViewImages from './ViewImages';
import { deleteProduct, deleteUser, disableUser, cancelOrder, deletePromocode } from '../../Utilities';

function OptionBar() {
  const { pathname } = useLocation();
  const selection = useSelector(state => state.selection);
  const productImages = useSelector(state => state.productImages);
  const userStatus = useSelector(state => state.userStatus);
  const tableName = useSelector(state => state.tableName);
  const dispatch = useDispatch();

  const clearSelection = () => {     // or delesect...
    dispatch(deselectRecord());
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

      case '/promocodes':
        deletePromocode(selection);
        break;

      default: break;
    }
  }

  const onSearch = ({ target }) => {
    dispatch(setSearchKey(target.value.toLowerCase()));
  }

  return (
    <div className='optionBar'>   
      {/* DESELECT BUTTON */}
      <div className='optionBar__left'>
        <button disabled={!selection} onClick={clearSelection} className="optionBar__btn btn far fa-minus-square" data-toggle="tooltip" data-placement="bottom" title="Deselect"></button>
      </div>
      
      <div className="optionBar__right">
        {/* DELETE BUTTON */}
        {pathname !== '/orders' && 
          <button onClick={deleteRecord} disabled={!selection} className="optionBar__btn btn fas fa-trash-alt" data-toggle="tooltip" data-placement="bottom" title="Delete"></button>
        }
        
        {/* ENABLE/DISABLE USER BUTTON */}
        {(pathname === '/customers' || pathname === '/sellers') &&  // display the disable user button only for the customer and seller pages.
          <button onClick={() => disableUser(selection, tableName, userStatus)} disabled={!selection} className="optionBar__btn btn fas fa-user-slash" data-toggle="tooltip" data-placement="bottom" title="Enable/Disable User"></button>
        }
        
        {/* VIEW PRODUCT IMAGES BUTTON */}
        {pathname === '/products' &&   // display the view images button only for products page.
          <span data-toggle="tooltip" data-placement="bottom" title="View Images">
            <button disabled={!selection} className="optionBar__btn btn far fa-image" style={{ fontSize: '1.5rem' }} data-toggle="modal" data-target="#previewImagesModal"></button>
          </span>
        }
        
        {/* ADD PROMOCODE BUTTON */}
        {pathname === '/promocodes' &&
          <span data-toggle="tooltip" data-placement="bottom" title="Add Promocode">
            <button className="optionBar__btn btn fas fa-plus" data-toggle="modal" data-target="#addPromocodeModal"></button>
          </span>
        }

        {/* CANCEL ORDER BUTTON */}
        {pathname === '/orders' && 
          <button onClick={() => cancelOrder(selection)} disabled={!selection} className="optionBar__btn btn fas fa-ban" data-toggle="tooltip" data-placement="bottom" title="Cancel Order"></button>
        }

        <Modal id='previewImagesModal' title='Images (Preview)' className='d-none'>
          <ViewImages />
        </Modal>

        {/* SEARCH FIELD */}
        <div className="optionBar__search">
          <input type="search" className="form-control" placeholder="Search..." onChange={onSearch} />
        </div>
      </div>
    </div>
  )
}
export default OptionBar;
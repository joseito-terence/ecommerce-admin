import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deselectRecord } from '../../redux/actions';
import './OptionBar.css';
import Modal from '../Modal';
import ViewImages from './ViewImages';
import { useLocation } from 'react-router';

function OptionBar() {
  const { pathname } = useLocation();
  const selection = useSelector(state => state.selection);
  const dispatch = useDispatch();

  const clearSelection = () => {
    dispatch(deselectRecord());
  }

  return (
    <div className='optionBar'>   
      <div className='optionBar__left'>
        <button disabled={!selection} onClick={clearSelection} className="optionBar__btn btn far fa-minus-square" data-toggle="tooltip" data-placement="bottom" title="Deselect"></button>
      </div>
      
      <div className="optionBar__right">
        <button disabled={!selection} className="optionBar__btn btn fas fa-trash-alt" data-toggle="tooltip" data-placement="bottom" title="Delete"></button>
        
        {pathname === '/products' &&
          <span data-toggle="tooltip" data-placement="bottom" title="View Images">
          <button disabled={!selection} className="optionBar__btn btn far fa-image" style={{ fontSize: '1.5rem' }} data-toggle="modal" data-target="#previewImagesModal"></button>
        </span>}
        
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
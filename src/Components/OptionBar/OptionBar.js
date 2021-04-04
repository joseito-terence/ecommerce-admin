import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deselectRecord } from '../../redux/actions';
import './OptionBar.css';

function OptionBar() {
  const selection = useSelector(state => state.selection);
  const dispatch = useDispatch();

  const clearSelection = () => {
    dispatch(deselectRecord());
  }

  return (
    <div className='optionBar'>   
      <div className='optionBar__left'>
        <button disabled={!selection} onClick={clearSelection} className="btn far fa-minus-square" data-toggle="tooltip" data-placement="bottom" title="Deselect"></button>
      </div>
      
      <div className="optionBar__right">
        <button disabled={!selection} className="btn fas fa-trash-alt" data-toggle="tooltip" data-placement="bottom" title="Delete"></button>
        <button disabled={!selection} className="btn far fa-image" style={{ fontSize: '1.5rem' }} data-toggle="tooltip" data-placement="bottom" title="View Images"></button>


        <div className="optionBar__search">
          <input type="search" className="form-control" placeholder="Search..." />
        </div>
      </div>
    </div>
  )
}
export default OptionBar;
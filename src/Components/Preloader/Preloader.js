import React from 'react';
import { useSelector } from 'react-redux';

function Preloader() {
  const loading = useSelector(state => state.loading);

  const style = {
    display: 'grid',
    placeItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgb(0 0 0 / 75%)',
    zIndex: 1,
  }

  return loading && (
    <div className='preloader text-white' style={style}>
      <div className='d-flex flex-column align-items-center'>
        <div class="spinner-border" role="status" style={{ width: '4rem', height: '4rem' }}>
          <span class="sr-only">Loading...</span>
        </div>

        <div className='mt-3'>
          Please wait...
        </div>
      </div>
    </div>
  )
}

export default Preloader;

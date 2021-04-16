import React, { useRef, useState } from 'react';
import voucher_codes from 'voucher-code-generator'; //  https://www.npmjs.com/package/voucher-code-generator
import db from '../../../firebase';

function AddPromocode() {
  const initialState = {
    code: '',
    expiry: '', 
  }
  const [state, setState] = useState(initialState);
  const closeBtn = useRef();

  const handleChange = ({ target }) => {
    setState({ ...state, [target.id]: target.value });
  } 

  const generateCode = () => {
    try {
      let code = voucher_codes.generate({ length: 6 })[0].toUpperCase();
      setState({ ...state, code });
    }
    catch(e) {
      console.log('Auto Generate code error');
    }
  }

  const handleSubmit = event => {
    event.preventDefault();

    db.doc(`promocodes/${state.code}`)
      .set({
        ...state,
        created_on: new Date(),
      })
      .then(() => {
        setState(initialState);
        closeBtn.current.click();
      })        
      .catch(err => console.error(err));
  } 

  return (
    <div className='addPromocode mx-3 mt-3'>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="code">Promocode</label>
          <div className="form-control d-flex justify-content-between m-0">
            <input 
              type="text" 
              className='border-0 w-100' 
              id='code' 
              value={state.code} 
              onChange={handleChange} 
              required 
              autoComplete='off'
              autoCapitalize='characters'
            />
            <button type="button" className='btn btn-sm btn-outline-secondary py-0' onClick={generateCode}>Generate</button>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="expiry">Expiry <span className="text-muted">(Date &amp; time)</span> </label>
          <input type="datetime-local" id="expiry" className="form-control" value={state.expiry} onChange={handleChange} required />
        </div>

        
        <div className="modal-footer m-0 px-0 py-1 mt-4">
          <button ref={closeBtn} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}
export default AddPromocode;
import db from "../firebase"
import setMessage from "./setMessage"

const deletePromocode = code => {
  if(window.confirm('Delete Promocode?')){
    db.doc(`promocodes/${code}`)
      .delete()
      .then(() => setMessage('Promocode Deleted!'))
      .catch(err => setMessage(err?.message || 'Unable to Delete!')); 
  }
}

export default deletePromocode;
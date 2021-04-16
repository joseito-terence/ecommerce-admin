import db from "../firebase"
import setMessage from "./setMessage"

const deletePromocode = code => {
  db.doc(`promocodes/${code}`)
    .delete()
    .then(() => setMessage('Promocode Deleted!'))
    .catch(err => setMessage(err?.message || 'Unable to Delete!'));
}

export default deletePromocode;
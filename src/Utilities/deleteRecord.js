import db, { storage } from "../firebase";
import axios from "axios";
import setMessage from './setMessage';
import API_URL from "../API_URL";
// import { deleteFromIndex } from './indexing';

const deleteProduct = (id, images) => {
  if(window.confirm('Do you want to delete?')){
    let promises = images.map(image => storage.refFromURL(image).delete());   // map all the promises into an array

    Promise.all(promises).then(() => {         // execute once all promises are resolved.
      db.doc(`products/${id}`)                        // i.e delete the record from the database.
        .delete()
        .then(() => {
          // deleteFromIndex(id);      
          return axios.delete(`${API_URL}/algolia/${id}`);
        })
        .then(() => setMessage('Delete Successful'))
        .catch(() => setMessage('Unable to Delete Product.'));
    });
  }
}

export default deleteProduct;

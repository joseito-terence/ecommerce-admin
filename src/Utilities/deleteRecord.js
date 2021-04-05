import db, { storage } from "../firebase";
import { deleteFromIndex } from './indexing';

const deleteProduct = (id, images) => {
  
  if(window.confirm('Do you want to delete?')){
    let promises = images.map(image => storage.refFromURL(image).delete());   // map all the promises into an array

    Promise.all(promises).then(() => {         // execute once all promises are resolved.
      db.doc(`products/${id}`)                        // i.e delete the record from the database.
        .delete()
        .then(() => {
          console.log('Delete Successful')
          deleteFromIndex(id);      
        })
        .catch(error => console.log(error));
    });
  }
}

export default deleteProduct;

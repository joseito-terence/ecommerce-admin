import algoliasearch from "algoliasearch";
//  Reference: https://www.algolia.com/doc/api-client/methods/indexing/

const client = algoliasearch("7LY0YPT76V", "67c441afe8bda9a32e20849908f18221");
const index = client.initIndex("Products");

// Delete Record from the index.
function deleteFromIndex(objectID) {
  index.deleteObject(objectID)
    .then(({ objectID }) => 
      console.log(`${objectID} deleted.`)
    )
    .catch(err => console.log(err));
}

export { deleteFromIndex };

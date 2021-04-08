const selectRecord = (id, tableName) => 
  ({ type: 'SELECT_RECORD', payload: { id, tableName } });

const deselectRecord = () => ({ type: 'DESELECT_RECORD' });

const setPrevImages = images => 
  ({ type: 'SET_PREVIEW_IMAGES', payload: { images } });

const setUserStatus = disabled => 
  ({ type: 'SET_USER_STATUS', payload: { disabled } });


export { 
  selectRecord, 
  deselectRecord, 
  setPrevImages, 
  setUserStatus 
};
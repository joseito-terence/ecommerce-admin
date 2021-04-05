const selectRecord = (id, tableName) => 
  ({ type: 'SELECT_RECORD', payload: { id, tableName } });

const deselectRecord = () => ({ type: 'DESELECT_RECORD' });

const setPrevImages = images => 
  ({ type: 'SET_PREVIEW_IMAGES', payload: { images } });

export { selectRecord, deselectRecord, setPrevImages };
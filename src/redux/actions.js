const selectRecord = (id, tableName) => 
  ({ type: 'SELECT_RECORD', payload: { id, tableName } });

const deselectRecord = () => ({ type: 'DESELECT_RECORD' });
 

export { selectRecord, deselectRecord };
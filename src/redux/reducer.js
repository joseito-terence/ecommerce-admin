const initialState = {
  selection: '',
  tableName: '',
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'SELECT_RECORD':
      return {
        ...state,
        selection: action.payload.id,
        tableName: action.payload.tableName,
      }

    case 'DESELECT_RECORD':
      return {
        ...state, 
        ...initialState,
      }

    default: return state;
  }
}

export default reducer;
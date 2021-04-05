const initialState = {
  selection: '',
  tableName: '',
  productImages: [],
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

    case 'SET_PREVIEW_IMAGES':
      return {
        ...state,
        productImages: JSON.parse(action.payload.images),
      }

    default: return state;
  }
}

export default reducer;
const initialState = {
  selection: '',
  tableName: '',
  productImages: [],
  userStatus: false,      // option === 'disable' ? true : false;
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

    case 'SET_USER_STATUS':
      return {
        ...state, 
        userStatus: action.payload.disabled,
      }

    default: return state;
  }
}

export default reducer;
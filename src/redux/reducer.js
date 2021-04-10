const initialState = {
  selection: '',
  tableName: '',
  productImages: [],
  userStatus: false,      // option === 'disable' ? true : false;
  toastMessage: '',       // message to be displayed in the toast,
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
      const { images } = action.payload;
      return {
        ...state,
        productImages: (images?.length > 0) ? JSON.parse(images) : [],
      }

    case 'SET_USER_STATUS':
      return {
        ...state, 
        userStatus: action.payload.disabled,
      }

    case 'SET_TOAST_MESSAGE':
      return {
        ...state,
        toastMessage: action.payload.toastMessage,
      }

    default: return state;
  }
}

export default reducer;
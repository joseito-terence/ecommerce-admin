const initialState = {
  selection: '',
  tableName: '',
  productImages: [],
  userStatus: false,      // option === 'disable' ? true : false;
  toastMessage: '',       // message to be displayed in the toast,
  searchKey: '',          // search keyword to filter table content
  authUser: null,
  loading: false,         // to display loader for async backend api calls.
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
        selection: '',
        tableName: '',
        productImages: [],
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

    case 'SET_SEARCH_KEYWORD':
      return {
        ...state,
        searchKey: action.payload.searchKey,
      }

    case 'CHANGE_AUTH_STATE':
      return {
        ...state,
        authUser: action.payload.authUser,
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload.loading,
      }

    default: return state;
  }
}

export default reducer;
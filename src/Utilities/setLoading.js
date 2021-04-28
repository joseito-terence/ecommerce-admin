import { setLoadingState } from "../redux/actions";
import store from '../redux/store';

const setLoading = loading => {
  store.dispatch(setLoadingState(loading));
}

export default setLoading;

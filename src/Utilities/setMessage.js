import { setToastMessage } from "../redux/actions";
import store from '../redux/store';

const setMessage = message => {
  store.dispatch(setToastMessage(message));
}

export default setMessage;

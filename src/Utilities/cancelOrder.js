import axios from "axios";
import API_URL from "../API_URL";
import setLoading from "./setLoading";
import setMessage from './setMessage';

const cancelOrder = orderId => {
  if(window.confirm(`Do you want to cancel order with id: ${orderId}?`)){
    setLoading(true);

    axios.put(`${API_URL}/order/cancel/${orderId}`)
      .then(res => setMessage('Order Successfully Canceled.'))
      .catch(err => setMessage('Unable to cancel order. Try Again'))
      .finally(() => setLoading(false));
  }
}

export default cancelOrder;

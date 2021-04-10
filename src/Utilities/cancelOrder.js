import axios from "axios";
import setMessage from './setMessage';

const cancelOrder = orderId => {
  if(window.confirm(`Do you want to cancel order with id: ${orderId}?`)){
    axios.put(`https://tybca-project-api.herokuapp.com/order/cancel//${orderId}`)
      .then(res => setMessage(res))
      .catch(err => setMessage(err));
  }
}

export default cancelOrder;

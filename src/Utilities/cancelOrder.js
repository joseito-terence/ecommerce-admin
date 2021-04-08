import axios from "axios";

const cancelOrder = orderId => {
  if(window.confirm(`Do you want to cancel order with id: ${orderId}?`)){
    axios.put(`https://tybca-project-api.herokuapp.com/order/cancel//${orderId}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}

export default cancelOrder;

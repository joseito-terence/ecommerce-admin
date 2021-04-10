import axios from 'axios';
import setMessage from './setMessage';

const deleteUser = (uid, userType) => {
  if(window.confirm("This process can't be undone. Delete User?")){
    axios.delete(`https://tybca-project-api.herokuapp.com/user/${uid}`, { userType })
      .then(res => setMessage(res))
      .catch(err => setMessage(err));
  }
}

const disableUser = (uid, userType, userStatus) => {
  // confirm disable/enable
  // make api request with axios
  // done
  const option = !userStatus ? 'disable' : 'enable';

  if(window.confirm(`Do you want to ${option} this user?`)){
    axios.put(`https://tybca-project-api.herokuapp.com/user/${option}`, { uid, userType })
    .then(res => setMessage(res))
    .catch(err => setMessage(err));
  }
}


export { deleteUser, disableUser };
import axios from 'axios';
import API_URL from '../API_URL';
import setMessage from './setMessage';

const deleteUser = (uid, userType) => {
  if(window.confirm("This process can't be undone. Delete User?")){
    axios.delete(`${API_URL}/user/${uid}`)
      .then(() => setMessage('User successfully deleted.'))
      .catch(() => setMessage('Unable to delete!'));
  }
}

const disableUser = (uid, userType, userStatus) => {
  // confirm disable/enable
  // make api request with axios
  // done
  let option = 'disable';
  if(userStatus === 'true') option = 'enable';

  if(window.confirm(`Do you want to ${option.toUpperCase()} this user?`)){
    axios.put(`${API_URL}/user/${option}`, { uid, userType })
      .then(() => setMessage(`User has been ${option}d.`))
      .catch(() => setMessage('An error occured. Unable to disable.'));
  }
}


export { deleteUser, disableUser };
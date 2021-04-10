/**
 * Reuable Bootstrap Toast component
 * https://getbootstrap.com/docs/4.6/components/toasts/
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToastMessage } from '../../redux/actions';

function Toast() {
  const message = useSelector(state => state.toastMessage);
  const dispatch = useDispatch();

  const closeToast = () => {
    dispatch(setToastMessage(''));
  }

  return message && (
    <div class="position-fixed bottom-0 right-0 p-3" style={{ zindex: 5, right: 0, bottom: 0, }}>
      <div id="liveToast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
        <div class="toast-header">
          <strong class="mr-auto">Message</strong>
          <button type="button" onClick={closeToast} class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">
          {message}
        </div>
      </div>
    </div>
  )
}
export default Toast;
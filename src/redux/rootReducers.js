import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import auth from './auth/reducer';
import profile from './profile/reducer';
import post from './post/reducer';
import loading from './loading/reducer';

export default combineReducers({
  auth,
  profile,
  post,
  loading,
  notifications,
});

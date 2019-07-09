import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { connectRouter } from 'connected-react-router';
import auth from './auth/reducer';
import profile from './profile/reducer';
import post from './post/reducer';
import loading from './loading/reducer';

export default history => combineReducers({
    router: connectRouter(history),
    auth,
    profile,
    post,
    loading,
    notifications,
  });

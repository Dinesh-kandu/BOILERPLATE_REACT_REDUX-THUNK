import { AuthTypes } from './action';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  user: null,
};

export default function(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case AuthTypes.USER_LOADED:
      return {
        ...state,
        isAuth: true,
        user: payload,
      };
    case AuthTypes.REGISTER_SUCCESS:
    case AuthTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
      };
    case AuthTypes.REGISTER_FAIL:
    case AuthTypes.LOGIN_FAIL:
    case AuthTypes.AUTH_ERROR:
    case AuthTypes.DELETE_ACCOUNT:
    case AuthTypes.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
}

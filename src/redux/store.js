import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from './rootReducers';

export const history = createBrowserHistory();

const initialState = {};

const middleware = [thunk, routerMiddleware(history)];

const store = createStore(
  rootReducer(history),
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;

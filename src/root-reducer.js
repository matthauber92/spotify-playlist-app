import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import AccountState from './reducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  AccountState,
});

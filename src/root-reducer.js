import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import AccountState from './features/player/reducer';
import Navigation from "./common/components/navigation/reducer";

export default (history) => combineReducers({
  router: connectRouter(history),
  AccountState,
  Navigation,
});

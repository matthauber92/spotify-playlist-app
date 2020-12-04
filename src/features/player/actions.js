import { push } from 'connected-react-router';
import { history } from '../../store';
import SpotifyAuthService from "../../services/SpotifyAuthService";
import c from './constants';


const service = SpotifyAuthService;
const api = service.getSpotifyApi();

function GetCurrentUser() {
  function request() { return { type: c.GET_USER_REQUEST }; }
  function success(user) {
    return { type: c.GET_USER_SUCCESS, user };
  }
  function failure(error) {
    return { type: c.GET_USER_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    api.getMe().then((user) => {
        dispatch(success(user));
        history.push('/player');
      },
      (error) => {
        dispatch(failure(error.toString()));
      },
    );
  };
}

function GetUserPlaylists() {
  function request() { return { type: c.GET_PLAYLISTS_REQUEST }; }
  function success(playlists) {
    return { type: c.GET_PLAYLISTS_SUCCESS, playlists };
  }
  function failure(error) {
    return { type: c.GET_PLAYLISTS_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());
    api.getUserPlaylists().then((playlists) => {
        dispatch(success(playlists));
      },
      (error) => {
        dispatch(failure(error.toString()));
      },
    );
  };
}

function GetSessionToken(token) {
  function request() { return { type: c.GET_TOKEN_REQUEST }; }
  function success(token) {
    return { type: c.GET_TOKEN_SUCCESS, token };
  }
  return (dispatch) => {
    dispatch(request());
    dispatch(success(token));
  }
}

export default ({
  GetCurrentUser,
  GetUserPlaylists,
  GetSessionToken,
});

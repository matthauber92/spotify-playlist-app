import SpotifyAuthService from "./services/SpotifyAuthService";
import c from './constants';


const service = SpotifyAuthService;
const api = service.getSpotifyApi();

function GetCurrentUser() {
  function request() { return { type: c.GET_USER_REQUEST }; }
  function success(user) {
    return { type: c.GET_USER_SUCCESS, user };
  }

  return (dispatch) => {
    dispatch(request());
    api.getMe().then((user) => {
        dispatch(success(user));
      },
      (error) => {
        console.log(error.toString());
        //dispatch(failure(error.toString()));
      },
    );
  };
}

export default ({
  GetCurrentUser,
});

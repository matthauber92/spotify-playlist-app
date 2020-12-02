import spotifyConstants from "./constants";

//TODO: ADD to player component as player reducer
export const initialState = {
  user: null,
  playlists: null,
  spotify: null,
  playing: false,
  item: null,
  token: null,
};

export default function AccountReducer(state = initialState, action) {
  switch (action.type) {
    case spotifyConstants.GET_USER_REQUEST:
      return {
        ...state,
        user: {},
      };

    case spotifyConstants.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };

    case spotifyConstants.GET_PLAYING_REQUEST:
      return {
        ...state,
        playing: false,
      };

    case spotifyConstants.GET_PLAYING_SUCCESS:
      return {
        ...state,
        playing: action.playing,
      };

    case spotifyConstants.GET_ITEM_REQUEST:
      return {
        ...state,
        item: {},
      };

    case spotifyConstants.GET_ITEM_SUCCESS:
      return {
        ...state,
        item: action.item,
      };

    case spotifyConstants.GET_TOKEN_REQUEST:
      return {
        ...state,
        token: "",
      };

    case spotifyConstants.GET_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.token,
      };

    case spotifyConstants.GET_SPOTIFY_REQUEST:
      return {
        ...state,
        spotify: action.spotify,
      };

    case spotifyConstants.GET_PLAYLISTS_REQUEST:
      return {
        ...state,
        playlists: {},
      };

    case spotifyConstants.GET_PLAYLISTS_SUCCESS:
      return {
        ...state,
        playlists: action.playlists,
      };
    default:
      return state;
  }
};

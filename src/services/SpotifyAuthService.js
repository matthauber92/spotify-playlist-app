// https://developer.spotify.com/
// documentation/web-playback-sdk/quick-start/#
import SpotifyWebApi from "spotify-web-api-js";

const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "http://localhost:3000";

const clientId = "969a3f38fc9645c188fb725ea8c85d2a";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

function getSpotifyApi() {
  const spotify = new SpotifyWebApi();
  return spotify;
}

function getTokenFromResponse() {
    return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);

        return initial;
      }, {});
};

function getAccessUrl() {
  const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;
  return  accessUrl;
}

export default {
  getSpotifyApi,
  getTokenFromResponse,
  getAccessUrl,
};

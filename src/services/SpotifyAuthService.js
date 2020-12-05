// https://developer.spotify.com/
// documentation/web-playback-sdk/quick-start/#
import SpotifyWebApi from 'spotify-web-api-js';

const authEndpoint = 'https://accounts.spotify.com/authorize';

const accessEndpoint = 'https://accounts.spotify.com/api/token';

const redirectUri = 'http://localhost:3000/player';

export const clientId = '969a3f38fc9645c188fb725ea8c85d2a';

export const clientSecret = 'd8fab3c1438c42988b646d27ed2810a2';

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

function getCodeFromResponse() {
    return window.location.search
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});
};

function getAccessToken(code) {
  const accessUrl = `${accessEndpoint}?code=${code}&grant_type=authorization_code&redirect_uri=${redirectUri}`;
  return accessUrl;
}

function getRefreshToken(token) {
  const refreshUrl = `${accessEndpoint}?grant_type=refresh_token&refresh_token=${token}`;
  return refreshUrl;
}

function getAuthUrl() {
  const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=code&show_dialog=true`;
  return  authUrl;
}

export default {
  getSpotifyApi,
  getAccessToken,
  getRefreshToken,
  getCodeFromResponse,
  getAuthUrl,
  clientId,
  clientSecret,
};

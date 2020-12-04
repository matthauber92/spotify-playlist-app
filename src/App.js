import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router";
import { Login, Player } from "./features";
import SpotifyAuthService from "./services/SpotifyAuthService";
import spotifyActions from "./features/player/actions"
import './App.css';

const service = SpotifyAuthService;
const api = service.getSpotifyApi();

class App extends React.PureComponent {

  componentDidMount() {
    this.getToken();
  }

  getAccessToken = async (token) => {
    const clientId = '969a3f38fc9645c188fb725ea8c85d2a';
    const clientSecret = 'd8fab3c1438c42988b646d27ed2810a2';
    let response = await fetch(service.getAccessToken(token), {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
          'Content-Type':'application/x-www-form-urlencoded'
        },
        // params: {
        //   'grant_type': 'authorization_code',
        // }
      });
    const data = await response.json();
    return data;
  }

  getToken() {
    const hash = service.getTokenFromResponse();

    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      const accessToken = this.getAccessToken(_token);
      // set user state && token
      api.setAccessToken(_token);
      this.props.dispatch(spotifyActions.GetSessionToken(_token));
      localStorage.setItem('token', accessToken.access_token);
      this.props.dispatch(spotifyActions.GetCurrentUser());
      this.props.dispatch(spotifyActions.GetUserPlaylists());
    }
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/player" component={Player} />
        </Switch>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

App.propTypes = {
  dispatch: () => {},
};

App.defaultProps = {
  dispatch: () => {},
};

const connectedApp = withRouter(connect(mapStateToProps)(App));

export default connectedApp;

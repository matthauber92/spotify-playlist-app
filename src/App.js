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
    const response = await fetch(service.getAccessToken(token), {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(service.clientId + ':' + service.clientSecret),
          'Content-Type':'application/x-www-form-urlencoded'
        },
      });
    const data = await response.json();
    console.log(data)
    return data;
  }

  getToken() {
    const hash = service.getTokenFromResponse();

    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      this.getAccessToken(_token);
      // set user state && token
      api.setAccessToken(_token);
      this.props.dispatch(spotifyActions.SetSessionToken(_token));

      this.props.dispatch(spotifyActions.SetCurrentUser());
      this.props.dispatch(spotifyActions.SetUserPlaylists());
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

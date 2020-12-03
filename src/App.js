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

  getToken() {
    const hash = service.getTokenFromResponse();

    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      // set user state && token
      api.setAccessToken(_token);

      this.props.dispatch(spotifyActions.GetCurrentUser());
      this.props.dispatch(spotifyActions.GetUserPlaylists());
      this.props.dispatch(spotifyActions.GetSessionToken(_token));
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

import React from "react";
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { Login, Player } from "./features";
import SpotifyAuthService from "./services/SpotifyAuthService";
import spotifyActions from "./actions"
import './App.css';

const service = SpotifyAuthService;
const api = service.getSpotifyApi();

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
    }
  }

  componentDidMount() {
    this.getToken();
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps)
    if(prevProps.location.hash !== "" && prevProps.location.pathname == "/") {
      const { history } = this.props;
      history.push('player');
      console.log('to next component!!!');
    }
  }

  getToken() {
    const hash = service.getTokenFromResponse();

    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      api.setAccessToken(_token);

      const user = this.props.dispatch(spotifyActions.GetCurrentUser());

      this.setState({
        token: _token,
      });
    }
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Login} />
            <Route path="/player" component={Player} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.AccountState;
  return {
    user
  };
}

App.propTypes = {
  dispatch: () => {},
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  user: PropTypes.shape({
    display_name: "",
  }),
};

App.defaultProps = {
  dispatch: () => {},
  history: {
    push: () => {},
  },
  user: {},
};

// eslint-disable-next-line max-len
const connectedApp = connect(mapStateToProps)(App);

export default connectedApp;

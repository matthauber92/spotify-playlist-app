import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Layout } from "../../../common/components"
import SpotifyAuthService from "../../../services/SpotifyAuthService";
import spotifyActions from "../actions"
import "./Player.css";

const service = SpotifyAuthService;
const api = service.getSpotifyApi();

class Player extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    }
  }
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
      this.props.dispatch(spotifyActions.GetSessionToken(_token));
      this.props.dispatch(spotifyActions.GetUserPlaylists());

      this.setState({
        token: _token,
      });
    }
  }

  render() {
    return (
      <div className="player">
        <div className="player__body">
          {
            this.state.token !== "" && (
              <Layout />
            )
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("player: ", state)
  const { user, playlists } = state.AccountState;
  return {
    user,
    playlists,
  };
}

Player.propTypes = {
  dispatch: () => {},
  user: PropTypes.shape({}),
};

Player.defaultProps = {
  dispatch: () => {},
  user: {},
};

const connectedPlayer = withRouter(connect(mapStateToProps)(Player));

export default connectedPlayer;

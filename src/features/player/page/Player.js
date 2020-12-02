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
      user: {},
    }
  }

  componentDidUpdate() {
    console.log(this.state.user);
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
    }
  }

  render() {
    return (
      <div className="player">
        <div className="player__body">
          <Layout />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.AccountState;
  return {
    user
  };
}

Player.propTypes = {
  dispatch: () => {},
  user: PropTypes.shape({
    display_name: "",
  }),
};

Player.defaultProps = {
  dispatch: () => {},
  user: {},
};

const connectedPlayer = withRouter(connect(mapStateToProps)(Player));

export default connectedPlayer;

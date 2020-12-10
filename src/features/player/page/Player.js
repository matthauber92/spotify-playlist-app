import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Layout } from "../../../common/components"
import { Spin } from "antd";
import SpotifyAuthService from "../../../services/SpotifyAuthService";
import spotifyActions from "../actions"
import "./Player.css";

const service = SpotifyAuthService;
const api = service.getSpotifyApi();

class Player extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.getTokens();
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

    api.setAccessToken(data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    this.props.dispatch(spotifyActions.SetRefreshToken(data.refresh_token));
    await this.props.dispatch(spotifyActions.SetCurrentUser(data.refresh_token));
    await this.props.dispatch(spotifyActions.SetUserPlaylists());
    this.setState({
      loading: false,
    });
  }

  getRefreshToken = async (token) => {
    const response = await fetch(service.getRefreshToken(token), {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(service.clientId + ':' + service.clientSecret),
          'Content-Type':'application/x-www-form-urlencoded'
        },
      });
    const data = await response.json();
    api.setAccessToken(data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    this.props.dispatch(spotifyActions.SetRefreshToken(data.refresh_token));
    await this.props.dispatch(spotifyActions.SetCurrentUser(data.refresh_token));
    await this.props.dispatch(spotifyActions.SetUserPlaylists());
    this.setState({
      loading: false,
    });
  }

  async getTokens() {
      // debugger;
      const auth = await service.getCodeFromResponse();
      let code = auth.code;

      if (code) {
        await this.getAccessToken(code);
      } else {
      await this.getRefreshToken(localStorage.getItem('refresh_token'));
    }
  }

  handleCallback = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    return (
      <div className="player">
        <div className="player__body">
        {
          this.state.loading ? (<div className="mx-auto"> <Spin size="large" /></div>) : (
            <Layout />
          )
        }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state', state)
  const { user, refresh_token } = state.AccountState;
  return {
    refresh_token,
  };
}

Player.propTypes = {
  dispatch: () => {},
  refresh_token: PropTypes.string,
};

Player.defaultProps = {
  dispatch: () => {},
  refresh_token: '',
};

const connectedPlayer = withRouter(connect(mapStateToProps)(Player));

export default connectedPlayer;

import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Layout } from "../../../common/components"
import { Spin } from "antd";
import SpotifyAuthService from "../../../services/SpotifyAuthService";
import "./Player.css";

class Player extends React.PureComponent {
  constructor(props) {
    super(props);
    this.service = SpotifyAuthService;
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    if (this.props.user !== null) {
      this.setState({
        loading: false,
      });
    }
  }

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
  const { user, playlists, token } = state.AccountState;
  return {
    user,
    playlists,
    token,
  };
}

Player.propTypes = {
  dispatch: () => {},
  user: PropTypes.shape({}),
  token: PropTypes.string,
};

Player.defaultProps = {
  dispatch: () => {},
  user: {},
  token: '',
};

const connectedPlayer = withRouter(connect(mapStateToProps)(Player));

export default connectedPlayer;

import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Layout } from "../../../common/components"
import { Spin } from "antd";
import "./Player.css";

class Player extends React.PureComponent {
  constructor(props) {
    super(props);
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

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { Layout, Menu, Avatar } from "antd";
import { faUser, faRecordVinyl, faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpotifyAuthService from "../../../services/SpotifyAuthService";
import navigationActions from "../navigation/action";
import spotifyActions from "../../../features/player/actions";
import "./SideNav.scss";

const service = SpotifyAuthService;
const api = service.getSpotifyApi();

class SideNav extends React.PureComponent {

  componentDidMount() {
    console.log(this.props.refresh_token)
    this.getRefreshToken(this.props.refresh_token);
  }

  getRefreshToken = async () => {
    const response = await fetch(service.getRefreshToken(localStorage.getItem('refresh_token')), {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(service.clientId + ':' + service.clientSecret),
          'Content-Type':'application/x-www-form-urlencoded'
        },
      });
    const data = await response.json();
    await api.setAccessToken(data.access_token);
    this.props.dispatch(spotifyActions.SetRefreshToken(data.refresh_token));
    this.props.dispatch(spotifyActions.SetCurrentUser());
    this.props.dispatch(spotifyActions.SetUserPlaylists());
  }

  onCollapse = (collapsed) => {
    this.props.dispatch(navigationActions.collapseSideNav(collapsed));
  };

  render() {
    const { Sider } = Layout;
    const { SubMenu } = Menu;

    const playlistIcon = (
      <span className="anticon" role="img">
        <FontAwesomeIcon
          icon={faMusic}
          id="Playlist"
          alt="PlaylistIcon"
          className="side-nav-icon"
        />
      </span>
    );

    const songIcon = (
      <span className="anticon" role="img">
        <FontAwesomeIcon
          icon={faRecordVinyl}
          id="Song"
          alt="SongIcon"
          className="side-nav-icon"
        />
      </span>
    );

    return (
      <Sider
        collapsible
        collapsed={this.props.isCollapsed}
        onCollapse={this.onCollapse}
      >
        <Menu
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          selectedKeys={[this.props.currentPage]}
          onSelect={(k) => this.handleSelect(k)}
        >
          <Menu.Item key="user">
            <span>{this.props.user.display_name}</span>
          </Menu.Item>
          <SubMenu
            key="playlists"
            icon={playlistIcon}
            title="Playlists"
            className="playlists-submenu"
          >
          {
            this.props.playlists?.items?.length > 0 ?
            this.props.playlists?.items?.map((playlist, index) => (
              <Menu.Item id={`playlist-${playlist.id}`} key={`playlist-${playlist.id}`} icon={songIcon}>
                <span className="sidebarOption">{playlist.name}</span>
              </Menu.Item>
            )) : (
              <Menu.Item id='playlist-empty' key='playlist-empty' icon={songIcon}>
                <span>No PLaylists</span>
              </Menu.Item>
            )
          }
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

SideNav.propTypes = {
  dispatch: PropTypes.func,
  currentPage: PropTypes.string,
  user: PropTypes.shape({}),
  playlists: PropTypes.shape({}),
  refresh_token: PropTypes.string,
};

SideNav.defaultProps = {
  dispatch: () => {},
  currentPage: "",
  user: {},
  playlists: {},
  refresh_token: '',
};

function mapStateToProps(state) {
  const { user, playlists, refresh_token } = state.AccountState;
  const { currentPage, isCollapsed } = state.Navigation;
  return {
    currentPage,
    isCollapsed,
    user,
    playlists,
    refresh_token,
  };
}

const connectedSideNav = connect(mapStateToProps)(SideNav);

export { connectedSideNav as default };

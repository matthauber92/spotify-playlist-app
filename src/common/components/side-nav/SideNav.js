import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { faUser, faRecordVinyl, faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpotifyAuthService from "../../../services/SpotifyAuthService";
import navigationActions from "../navigation/action";
import "./SideNav.scss";

const service = SpotifyAuthService;
const api = service.getSpotifyApi();

class SideNav extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    }
  }

  componentDidMount() {
    api.getUserPlaylists().then((playlists) => {
      console.log("playlists: ", playlists);
      this.setState({
        playlists: playlists,
      });
    });
  }

  onCollapse = (collapsed) => {
    this.props.dispatch(navigationActions.collapseSideNav(collapsed));
  };

  render() {
    const { Sider } = Layout;
    const { SubMenu } = Menu;

    const UserIcon = (
      <span className="anticon" role="img">
        <FontAwesomeIcon
          icon={faUser}
          id="Users"
          alt="UserIcon"
          className="side-nav-icon"
        />
      </span>
    );

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
          <Menu.Item key="user" icon={UserIcon}>
            <span>User</span>
          </Menu.Item>
          <SubMenu
            key="playlists"
            icon={playlistIcon}
            title="Playlists"
            className="playlists-submenu"
          >
          {this.state.playlists?.items?.map((playlist, index) => (
            <Menu.Item key={`playlist-${index}`} icon={songIcon}>
              <span>{playlist.name}</span>
            </Menu.Item>
          ))}
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

SideNav.propTypes = {
  dispatch: PropTypes.func,
  currentPage: PropTypes.string,
};

SideNav.defaultProps = {
  dispatch: () => {},
  currentPage: "",
};

function mapStateToProps(state) {
  const { currentPage, isCollapsed } = state.Navigation;
  return {
    currentPage,
    isCollapsed,
  };
}

const connectedSideNav = connect(mapStateToProps)(SideNav);

export { connectedSideNav as default };

// export { SideNav as default };

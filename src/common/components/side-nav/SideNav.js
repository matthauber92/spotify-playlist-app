import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpotifyAuthService from "../../../services/SpotifyAuthService";
import navigationActions from "../navigation/action";
import "./SideNav.scss";

const service = SpotifyAuthService;
const api = service.getSpotifyApi();

class SideNav extends React.PureComponent {

  componentDidMount() {
    api.getUserPlaylists().then((playlists) => {
      console.log("playlists: ", playlists);
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
          icon={LibraryMusicIcon}
          id="Playlist"
          alt="PlaylistIcon"
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
            <Menu.Item key="playlists" icon={playlistIcon}>
              <span>Playlists</span>
            </Menu.Item>
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

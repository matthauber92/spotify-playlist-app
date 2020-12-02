import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { faUser, faRecordVinyl, faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import navigationActions from "../navigation/action";
import accountActions from "../../../features/player/actions";
import "./SideNav.scss";

class SideNav extends React.PureComponent {

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
            <span>{this.props.user.display_name}</span>
          </Menu.Item>
          <SubMenu
            key="playlists"
            icon={playlistIcon}
            title="Playlists"
            className="playlists-submenu"
          >
          {this.props.playlists?.items?.map((playlist, index) => (
            <Menu.Item id={`playlist-${playlist.id}`} key={`playlist-${playlist.id}`} icon={songIcon}>
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
  user: PropTypes.shape({}),
  playlists: PropTypes.shape({}),
};

SideNav.defaultProps = {
  dispatch: () => {},
  currentPage: "",
  user: {},
  playlists: {},
};

function mapStateToProps(state) {
  const { user, playlists } = state.AccountState;
  console.log("state: ", state);
  const { currentPage, isCollapsed } = state.Navigation;
  return {
    currentPage,
    isCollapsed,
    user,
    playlists,
  };
}

const connectedSideNav = connect(mapStateToProps)(SideNav);

export { connectedSideNav as default };

// export { SideNav as default };

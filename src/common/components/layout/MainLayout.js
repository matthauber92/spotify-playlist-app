import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { history } from '../../../store';
import SideNav from "../side-nav";

class MainLayout extends React.PureComponent {

  render() {
    const { Header, Content } = Layout;
    return (
      <div className="MainContainer">
        <Layout>
          {
            this.props.user && (
              <SideNav />
            )
          }
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.AccountState;
  return {
    user,
  };
}

MainLayout.propTypes = {
  dispatch: () => {},
  user: PropTypes.shape({}),
};

MainLayout.defaultProps = {
  dispatch: () => {},
  user: {},
};

const connectedLayout = withRouter(connect(mapStateToProps)(MainLayout));

export default connectedLayout;

// export { MainLayout as default };

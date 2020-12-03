import React from "react";
import PropTypes from "prop-types";
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
          <SideNav />
        </Layout>
      </div>
    );
  }
}

MainLayout.propTypes = {
  dispatch: () => {},
};

MainLayout.defaultProps = {
  dispatch: () => {},
};

export { MainLayout as default };

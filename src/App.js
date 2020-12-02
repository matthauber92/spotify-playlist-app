import React from "react";
// import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from "react-router";
import { Login, Player } from "./features";
import './App.css';

class App extends React.PureComponent {

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/player" component={Player} />
        </Switch>
      </>
    );
  }
}

export default App;

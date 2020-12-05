import React from "react";
import { Route, Switch } from "react-router";
import { Login, Player } from "./features";
// import SpotifyAuthService from "./services/SpotifyAuthService";
// import spotifyActions from "./features/player/actions"
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

import React from "react";
//import { useStateValue } from "./StateProvider";
import { Login } from "./features";
import SpotifyAuthService from "./services/SpotifyAuthService";
import './App.css';


class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
    }
  }

  componentDidMount() {
    this.getToken();
  }

  getToken() {
    const service= SpotifyAuthService;
    const api = service.getSpotifyApi();
    const hash = service.getTokenFromResponse();
    console.log("token: ", hash);

    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      api.setAccessToken(_token);

      this.setState({
        token: _token.access_token,
      });
    }
  }

  render() {

    return (
      <>
        {
          this.state.token === "" ? (
            <Login />
          ) : (
            <h1>YOU LOGGED IN</h1>
          )
        }
      </>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { history, store } from './store';
import rootReducer from './root-reducer';


const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route path="/" component={App} />
        </ConnectedRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

render();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./', () => {
    render();
  });

  // Reload reducers
  module.hot.accept('./root-reducer', () => {
    store.replaceReducer(rootReducer(history));
  });
}

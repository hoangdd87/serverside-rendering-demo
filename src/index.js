import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { Provider } from 'react-redux'
import getStore from './redux/getStore'
import { BrowserRouter } from "react-router-dom";
import findRoute from './shared/helpers/findRoute/findRoute';
import {HelmetProvider} from "react-helmet-async";

// ************** Config front-end store *********************
const preloadedState = window.__PRELOADED_STATE__
const store = getStore(preloadedState );
// *****************************************************************

const { foundRoute, match } = findRoute(window.location.pathname);
if((foundRoute && !foundRoute.hydrate) || process.env.NODE_ENV === 'development') {
  if(foundRoute.fetchDataForPage) {
    store.dispatch(foundRoute.fetchDataForPage({params: match.params, search: window.location.search}));
  }
}

const Main = () => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  return (
    <React.StrictMode>
      <Provider store={ store }>
        <BrowserRouter>
          <HelmetProvider>
            <App/>
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  )
};
if(foundRoute && foundRoute.hydrate && process.env.NODE_ENV === 'production') {
  console.log('Hydrate page');
  ReactDOM.hydrate(<Main/>, document.getElementById('root'));
} else {
  console.log('render page');
  ReactDOM.render(<Main/>, document.getElementById('root'));
}


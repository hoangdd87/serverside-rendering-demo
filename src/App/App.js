import React, { useEffect } from 'react';
import {
  Switch,
  Route, useHistory,
} from "react-router-dom";
import routes from '../routes';
import Navbar from './Navbar/Navbar';
import findRoute from '../shared/helpers/findRoute/findRoute';
import { useDispatch } from 'react-redux';
import theme from '../theme';
import { ThemeProvider } from '@material-ui/core/styles';

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleFetchDataForActivatedPage = ({ pathname, search }) => {
      const { foundRoute, match } = findRoute(pathname);
      if (foundRoute && foundRoute.fetchDataForPage) {
        dispatch(foundRoute.fetchDataForPage({
          search,
          params: match.params
        }))
      }
    };
    const unListen = history.listen(handleFetchDataForActivatedPage);
    return () => unListen();
  }, [history, dispatch]);

  return (
      <ThemeProvider theme={ theme }>
        <Navbar/>
        <Switch>
          {
            routes.map(route => (
              <Route
                key={ route.path }
                path={ route.path }
                exact={ route.exact }
                render={ route.render }
              />))
          }
        </Switch>
      </ThemeProvider>
  );
};

export default React.memo(App);

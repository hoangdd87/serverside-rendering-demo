import routes from '../../../routes';
import { matchPath } from 'react-router-dom';

const findRoute = pathname => {
  let match = null;
  const foundRoute = routes.find(route => {
    match = matchPath(pathname, {
      path: route.path,
      exact: route.exact
    });
    return Boolean(match);
  });
  return {
    foundRoute,
    match
  }
};

export default findRoute;

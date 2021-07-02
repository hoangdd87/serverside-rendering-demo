import express from 'express';
import path from 'path';
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import findRoute from '../src/shared/helpers/findRoute/findRoute';
import getStore from '../src/redux/getStore';
import App from '../src/App/App';
import { Provider } from 'react-redux';
import { StaticRouter } from "react-router-dom";
import { ServerStyleSheets } from '@material-ui/core';

process.env.NODE_ENV = 'production';

const app = express();
const port = 8080;
const buildPath = path.join(process.cwd(), 'build');

app.use(express.static(buildPath, { index: false }));

let indexHtmlFile = null;

fs.readFile(path.join(buildPath, 'index.html'), 'utf8', (err, data) => {
  if (err) {
    console.error('Something went wrong:', err);
  } else {
    indexHtmlFile = data;
    app.listen(port, () => {
      console.log(`Serverside rendering app is listening at http://localhost:${ port }`)
    })
  }
});

app.get('*', async (request, response) => {
  const pathname = request.path.trim();
  const { foundRoute, match } = findRoute(pathname);
  if(!foundRoute?.hydrate) {
    const htmlResponse = indexHtmlFile
        .replace('<div id="root"></div>', `<div id="root">This page will be rendered in browser</div>`)
    return response.send(htmlResponse);
  }
  const search = request._parsedUrl.search;
  const store = getStore();
  if (foundRoute && foundRoute.fetchDataForPage) {
    await store.dispatch(foundRoute.fetchDataForPage({
      params: match.params,
      search
    }))
  }
  const sheets = new ServerStyleSheets();
  const app = ReactDOMServer.renderToString(
    sheets.collect(
      <Provider store={ store }>
        <StaticRouter location={ request.url } context={ {} }>
          <App/>
        </StaticRouter>
      </Provider>
    )
  );
  const preloadedState = store.getState();
  
  const htmlResponse = indexHtmlFile
    .replace('<div id="root"></div>', `<div id="root">${ app }</div>`)
    .replace('<style id="jss-server-side"></style>', `<style id="jss-server-side">${ sheets.toString() }</style>`)
    .replace('<script id="preload-state-server"></script>',
      `<script id="preload-state-server">
          window.__PRELOADED_STATE__ = ${ JSON.stringify(preloadedState).replace(/</g, '\\u003c') }
       </script>`
    );
  response.send(htmlResponse);
});

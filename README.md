# Serverside rendering (SSR) for create-react-app

A demo about how to make SSR for a SPA created by crete-react-app. This project is using Redux to transfer state between server and
browser. Using ReactDOM.rederToString() in server and ReactDOM.hydrate() in browser for all ssr pages.

Live demo: https://serverside-rendering-cra.df.r.appspot.com/
Video: (Vietnamese) https://www.youtube.com/watch?v=YTOk8_T6-Wg

## Installation

```bash
git clone https://github.com/hoangdd87/serverside-rendering-demo.git
yarn install
```

## Usage
- For production: Start the server that send the rendered pages already (default port: 8080). 
  In browser the APP will only attach events for content received using API ReactDom.hydrate(...)
```bash
yarn start
```
- For development: start the development server, in this mode all pages are rendered in browser using ReactDOM.render(...) API.

```bash
yarn start:dev
```

## How to create a new SSR page?

1. Created a new page Component.
2. Open file routes.js then create a new config for your page:

```node.js
{
    path: '/your-new-path',
    render: () => { // How to render your new component page
      return (
        <NewComponentPage/>
      )
    },
    exact: true,
    hydrate: true, // false if you don't want this page pre-render in server
    fetchDataForPage: ({ search, params }) => dispatch => { 
    
    /* action creator for a thunk.
    This function should includes the logic to fetch all data needed before rendering 
    The server will create a new a Redux store for every new request then dispatch this thunk and wait for all the data is fetched before render the page. 
    In the browser the store will dispatch this thunk everytime this page is activated except the first load of hydrated page
    You should return a promise so the server can know when this fetch data action is completed
    */
      const query = new URLSearchParams(search); // You can use search and params to get other data form url before fetch data if needed
      const id = params.id
      const page = parseInt(query.get('page')) || 0;
      const perPage = parseInt(query.get('perPage')) || 20;
      return dispatch(fetchData({ page, perPage, id}));
    },
  }
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT]
import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import { fetchPokemons } from './redux/pokemons/pokemons';
import { fetchPokemonDetail } from './redux/pokemonDetail/pokemonDetail';
import PokemonsPage from './pages/PokemonsPage/PokemonsPage';
import PokemonPage from './pages/PokemonPage/PokemonPage';
import AdminPage from './pages/AdminPage/AdminPage';
import PATHS from './consts/PATHS';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const routes = [
  {
    path: PATHS.HOME,
    render: () => <HomePage/>,
    exact: true,
    hydrate: true,
  },
  {
    path: PATHS.POKEMONS,
    render: () => <PokemonsPage/>,
    exact: true,
    hydrate: true,
    fetchDataForPage: ({ search }) => dispatch => {
      const query = new URLSearchParams(search);
      const page = parseInt(query.get('page')) || 0;
      const perPage = parseInt(query.get('perPage')) || 20;
      return dispatch(fetchPokemons({ page, perPage}));
    },
  },
  {
    path: PATHS.POKEMON_DETAIL,
    render: () => <PokemonPage/>,
    exact: true,
    fetchDataForPage: ({ params }) => dispatch => {
      const id = params.id;
      return dispatch(fetchPokemonDetail({ id }));
    },
    hydrate: true
  },
  {
    path: PATHS.ADMIN,
    render: () => <AdminPage/>,
    hydrate: false,
  },
  {
    path: PATHS.NOT_FOUND,
    render: () => <NotFoundPage/>,
    hydrate: false
  }
]

export default routes;

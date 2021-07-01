import { configureStore } from '@reduxjs/toolkit'
import pokemons from './pokemons/pokemons';
import pokemonDetail from './pokemonDetail/pokemonDetail';

export const getStore = (preloadedState) => configureStore({
  reducer: {
    pokemons,
    pokemonDetail
  },
  preloadedState
});

export default getStore;

import { pokemonsAdapter } from './pokemons/pokemons';

export const pokemonsSelectors = {
  selectCount: state => state.pokemons.count,
  selectLoading: state => state.pokemons.loading,
  selectAll: pokemonsAdapter.getSelectors( state => state.pokemons).selectAll
}

export const pokemonDetailSelectors = {
  selectEntity: state => state.pokemonDetail.entity,
  selectLoading: state => state.pokemonDetail.loading,
  selectError: state => state.pokemonDetail.error
};

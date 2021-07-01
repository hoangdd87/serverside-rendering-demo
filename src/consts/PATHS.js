const PATHS = {
  HOME: '/',
  POKEMONS: '/pokemons',
  POKEMON_DETAIL: '/pokemons/:id',
  ADMIN: '/admin',
  NOT_FOUND: '*'
}

export const PATHS_WITH_SSR = [
  PATHS.HOME,
  PATHS.POKEMONS,
  PATHS.POKEMON_DETAIL
];

export default PATHS;

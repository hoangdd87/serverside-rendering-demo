import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const pokemonsAdapter = createEntityAdapter({
  selectId: pokemon => pokemon.name
});

export const fetchPokemons = createAsyncThunk(
  'pokemons/fetch',
  ({ page, perPage }) => axios({
    method: 'GET',
    url: 'https://pokeapi.co/api/v2/pokemon',
    params: {
      limit: perPage,
      offset: page * perPage
    },
  }).then(response => ({ pokemons: response.data.results, count: response.data.count }))
);

const initialState = pokemonsAdapter.getInitialState({
  loading: 'idle',
  count: 0,
  currentRequestId: undefined,
  error: null
});

export const pokemons = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPokemons.pending]: (state, action) => {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
        state.error = null
    },
    [fetchPokemons.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if(requestId === state.currentRequestId) {
        const { pokemons, count } = action.payload;
        state.loading = 'idle';
        pokemonsAdapter.setAll(state, pokemons);
        state.count = count;
        state.currentRequestId = undefined;
      }
      
    },
    [fetchPokemons.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if(requestId === state.currentRequestId) {
        state.loading = 'idle';
        state.error = action.error.message;
        state.currentRequestId = undefined;
      }
    }
  }
})

export default pokemons.reducer;


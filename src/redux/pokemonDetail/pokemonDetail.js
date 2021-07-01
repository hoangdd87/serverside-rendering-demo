import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchPokemonDetail = createAsyncThunk(
  'pokemonDetail/fetch',
  ({ id }) => axios({
    method: 'GET',
    url: `https://pokeapi.co/api/v2/pokemon/${ id }`,
  }).then(({ data: { id, height, weight, name, sprites } }) => ({
    id,
    height,
    weight,
    name,
    sprites
  }))
);

const initialState = {
  loading: 'idle',
  entity: null,
  currentRequestId: undefined,
  error: null
};

export const pokemonDetail = createSlice({
  name: 'pokemonDetail',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchPokemonDetail.pending]: (state, action) => {
      state.loading = 'pending';
      state.currentRequestId = action.meta.requestId;
      state.error = null
    },
    [fetchPokemonDetail.fulfilled]: (state, action) => {
      const { requestId } = action.meta;
      if (requestId === state.currentRequestId) {
        state.entity = action.payload;
        state.loading = 'idle';
        state.currentRequestId = undefined;
      }
      
    },
    [fetchPokemonDetail.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (requestId === state.currentRequestId) {
        state.loading = 'idle';
        state.error = action.error.message;
        state.currentRequestId = undefined;
      }
    }
  }
})

export default pokemonDetail.reducer;


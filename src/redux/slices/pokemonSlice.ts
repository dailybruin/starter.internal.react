/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PokemonState {
    pokemon: any
}

const initialState = { pokemon: null } as PokemonState;

export const fetchPokemonById = createAsyncThunk(
  "pokemon/fetchById",
  async (pokemonId: number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    return (response.json());
  },
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    testAction(state) {
      state.pokemon = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonById.fulfilled, (state, action) => {
      state.pokemon = action.payload;
    });
  },

});

export const { testAction } = pokemonSlice.actions;
export default pokemonSlice;

// src/store/slices/charactersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { charactersService } from '../../services/charactersService';
import { RootState } from '../index';
import { CharactersResponse, SimpsonsCharacter } from '../../types/characters';

interface CharactersState {
  items: SimpsonsCharacter[];   
  allItems: SimpsonsCharacter[];  
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  search: string;
  searchMode: boolean; 
}

const initialState: CharactersState = {
  items: [],
  allItems: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
  search: '',
  searchMode: false,
};

export const fetchCharacters = createAsyncThunk<
  CharactersResponse,
  void,
  { state: RootState }
>('characters/fetch', async (_, { getState }) => {
  const { page } = getState().characters;
  const response = await charactersService.list(page);
  return response;
});
export const fetchAllCharacters = createAsyncThunk<
  SimpsonsCharacter[]
>('characters/fetchAll', async () => {
  let all: SimpsonsCharacter[] = [];
  let page = 1;

  while (true) {
    const response = await charactersService.list(page);
    all.push(...response.results);

    if (page >= response.pages) break;
    page++;
  }
  return all;
});

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },

    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;

      if (action.payload.trim() === '') {
        state.searchMode = false;
      } else {
        state.searchMode = true;
      }

      state.page = 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCharacters.pending, state => {
        if (!state.searchMode) state.loading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        if (!state.searchMode) {
          state.loading = false;
          state.items = action.payload.results;
          state.totalPages = action.payload.pages;
        }
      })
      .addCase(fetchAllCharacters.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.allItems = action.payload;
      })
      .addCase(fetchAllCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error loading characters';
      });
  },
});

export const { setPage, setSearch } = charactersSlice.actions;
export default charactersSlice.reducer;

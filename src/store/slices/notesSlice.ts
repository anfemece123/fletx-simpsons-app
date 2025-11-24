import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { notesStorage } from '../../storage/notesStorage';
import { Note } from '../../types/notes';


interface NotesState {
  items: Note[];
  loading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchNotes = createAsyncThunk<
  Note[],
  { userId: string; characterId: number }
>('notes/fetch', async ({ userId, characterId }) => {
  return await notesStorage.listByUserAndCharacter(userId, characterId);
});

// Crear nota
export const createNote = createAsyncThunk<
  Note,
  { userId: string; characterId: number; title: string; text: string; rating: number }
>('notes/create', async (payload) => {
  return await notesStorage.create(payload);
});

// Editar nota
export const updateNote = createAsyncThunk<
  Note,
  { id: string; data: Partial<Note> }
>('notes/update', async ({ id, data }) => {
  return await notesStorage.update(id, data);
});

// Eliminar nota
export const deleteNote = createAsyncThunk<string, string>(
  'notes/delete',
  async (noteId) => {
    await notesStorage.remove(noteId);
    return noteId;
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Fetch
    builder.addCase(fetchNotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });

    // Create
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    // Update
    builder.addCase(updateNote.fulfilled, (state, action) => {
      const index = state.items.findIndex(n => n.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    });

    // Delete
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.items = state.items.filter(n => n.id !== action.payload);
    });
  },
});

export default notesSlice.reducer;

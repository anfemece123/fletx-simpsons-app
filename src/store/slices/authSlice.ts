
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { usersStorage } from '../../storage/usersStorage';
import { User } from '../../types/auth';

const CURRENT_USER_KEY = 'fletx_current_user_id';

export interface AuthState {
  user: User | null;
  sessionToken: string | null;
  initializing: boolean; 
  loading: boolean;      
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  sessionToken: null,
  initializing: true,
  loading: false,
  error: null,
};

export const bootstrapAuth = createAsyncThunk(
  'auth/bootstrap',
  async () => {
    const userId = await AsyncStorage.getItem(CURRENT_USER_KEY);
    if (!userId) {
      return { user: null as User | null, sessionToken: null as string | null };
    }

    const users = await usersStorage.getAll();
    const user = users.find(u => u.id === userId) ?? null;

    if (!user) {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
      return { user: null, sessionToken: null };
    }

    return { user, sessionToken: uuidv4() };
  },
);

// Login
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload: { email: string; password: string }) => {
    const user = await usersStorage.validateCredentials(payload.email, payload.password);
    await AsyncStorage.setItem(CURRENT_USER_KEY, user.id);
    return { user, sessionToken: uuidv4() };
  },
);

// Registro
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload: { email: string; password: string }) => {
    const user = await usersStorage.create(payload.email, payload.password);
    await AsyncStorage.setItem(CURRENT_USER_KEY, user.id);
    return { user, sessionToken: uuidv4() };
  },
);

// Logout
export const signOut = createAsyncThunk('auth/signOut', async () => {
  await AsyncStorage.removeItem(CURRENT_USER_KEY);
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(bootstrapAuth.pending, state => {
        state.initializing = true;
        state.error = null;
      })
      .addCase(
        bootstrapAuth.fulfilled,
        (state, action: PayloadAction<{ user: User | null; sessionToken: string | null }>,
        ) => {
          state.user = action.payload.user;
          state.sessionToken = action.payload.sessionToken;
          state.initializing = false;
        },
      )
      .addCase(bootstrapAuth.rejected, state => {
        state.initializing = false;
      });

    // signIn
    builder
      .addCase(signIn.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signIn.fulfilled,
        (state, action: PayloadAction<{ user: User; sessionToken: string }>,
        ) => {
          state.loading = false;
          state.user = action.payload.user;
          state.sessionToken = action.payload.sessionToken;
        },
      )
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'No se pudo iniciar sesión';
      });

    // signUp
    builder
      .addCase(signUp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.sessionToken = action.payload.sessionToken;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'No se pudo registrar';
      });

    // signOut
    builder.addCase(signOut.fulfilled, state => {
      state.user = null;
      state.sessionToken = null;
    });
  },
});

export default authSlice.reducer;

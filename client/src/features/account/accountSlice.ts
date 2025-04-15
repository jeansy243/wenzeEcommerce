import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

// Define the state structure
interface AccountState {
  user: User | null;
  error: string | null;
  loading: boolean;
}

const initialState: AccountState = {
  user: null,
  error: null,
  loading: false,  // Nouvelle clé pour gérer le loading
};

// Sign in User
export const signInUser = createAsyncThunk<User, FieldValues>(
  'auth/login',
  async (data, thunkApi) => {
    try {
      const user = await agent.Account.login(data);
      localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage
      return user;
    } catch (error: any) {
      // Renvoi d'un message d'erreur clair en cas de problème
      const errorMessage = error?.data?.message || 'Login failed'; 
      return thunkApi.rejectWithValue({ error: errorMessage });
    }
  }
);

// Fetch current user
export const fetchCurrentUser = createAsyncThunk<User | null>(
  'auth/fetchCurrentUser',
  async (_, thunkApi) => {
    try {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString) as User;
        // Ici, tu peux ajouter une vérification pour valider le token ou les données de l'utilisateur avant de les retourner
        return user;
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
    return null;
  }
);

// Logout User
export const logoutUser = createAsyncThunk<void>(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      localStorage.removeItem('user'); // Remove user from localStorage
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  }
);

// Slice
export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(signInUser.pending, fetchCurrentUser.pending), (state) => {
      state.loading = true;  // Set loading to true when async actions start
    });

    builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.loading = false;  // Reset loading once data is fetched
      toast.success('Connexion réussie!');
    });

    builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected), (state, action) => {
      const errorMessage = action.payload?.error || 'Une erreur est survenue';
      state.error = errorMessage;
      state.loading = false;  // Reset loading on error
      toast.error(errorMessage);  // Affichage d'un message d'erreur plus informatif
    });
  }
});

export const { logOut, clearError } = accountSlice.actions;

// Selector to get the current user from the store
export const selectUser = (state: any) => state.account.user;

export default accountSlice.reducer;
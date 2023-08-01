import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  authData: any | null;
  loading: boolean;
  error: string;
  updateLoading: boolean;
}

const initialState: State = {
  authData: null,
  loading: false,
  error: "",
  updateLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true;
      state.error = "";
    },
    authSuccess(state, action: PayloadAction<any>) {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.authData = action.payload;
      state.loading = false;
      state.error = "";
    },
    authFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    updatingStart(state) {
      state.updateLoading = true;
      state.error = "";
    },
    updatingSuccess(state, action: PayloadAction<any>) {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.authData = action.payload;
      state.updateLoading = false;
      state.error = "";
    },
    updatingFail(state, action: PayloadAction<string>) {
      state.updateLoading = true;
      state.error = action.payload;
    },

    logOut(state) {
      localStorage.clear();
      state.authData = null;
      state.loading = false;
      state.error = "";
      state.updateLoading = false;
    },

    followUser(state, action: PayloadAction<string>) {
      if (state.authData) {
        state.authData.user.followings.push(action.payload);
      }
    },

    unFollowUser(state, action: PayloadAction<string>) {
      if (state.authData) {
        const index = state.authData.user.followings.indexOf(action.payload);
        if (index !== -1) {
          state.authData.user.followings.splice(index, 1);
        }
      }
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFail,
  updatingStart,
  updatingSuccess,
  updatingFail,
  logOut,
  followUser,
  unFollowUser,
} = authSlice.actions;

export default authSlice.reducer;

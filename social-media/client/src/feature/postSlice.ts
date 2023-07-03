import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  posts: any[];
  postLoading: boolean;
  postError: string;
}

const initialState: State = {
  posts: [],
  postLoading: false,
  postError: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postApiStart(state) {
      state.postLoading = true;
      state.postError = "";
    },
    uploadSuccess(state, action: PayloadAction<any>) {
      state.posts = [action.payload, ...state.posts];
      state.postLoading = false;
      state.postError = "";
    },
    getTimelinePostSuccess(state, action: PayloadAction<any>) {
      state.posts = action.payload;
      state.postLoading = false;
      state.postError = "";
    },
    postApiFail(state, action: PayloadAction<string>) {
      state.postLoading = false;
      state.postError = action.payload;
    },
  },
});

export const { postApiStart, uploadSuccess, getTimelinePostSuccess, postApiFail } =
  postSlice.actions;

export default postSlice.reducer;

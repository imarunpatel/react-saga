// src/postsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action: PayloadAction<Post[]>) {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure(state, action: PayloadAction<string>) {
      console.log('hello', action)
      state.loading = false;
      state.error = action.payload;
    },
    editPostRequest(state, action: PayloadAction<Post>) {
      state.loading = true;
    },
    editPostSuccess(state, action: PayloadAction<Post>) {
      state.loading = false;
      state.posts = state.posts.map(post => post.id === action.payload.id ? action.payload : post);
    },
    deletePostRequest(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    deletePostSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
});

export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  editPostRequest,
  editPostSuccess,
  deletePostRequest,
  deletePostSuccess,
} = postsSlice.actions;

export default postsSlice.reducer;

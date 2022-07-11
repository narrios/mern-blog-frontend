import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPost = createAsyncThunk('posts/fetchPost', async (id) => {
  const { data } = await axios.get(`/posts/${id}`);
  return data;
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchPopularPosts = createAsyncThunk('popularposts/fetchPopularPosts', async () => {
  const { data } = await axios.get('/posts/popular');
  return data;
});

export const fetchPostsByTag = createAsyncThunk('posts/fetchPostsByTag', async (tag) => {
  const { data } = await axios.get(`/tags/${tag}`);
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchDeletePost = createAsyncThunk('posts/fetchDeletePost', async (id) => {
  await axios.delete(`/posts/${id}`);
});

const initialState = {
  post: {
    items: [],
    status: 'loading',
  },
  posts: {
    items: [],
    status: 'loading',
  },
  popularposts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    //Recepționare postare
    [fetchPost.pending]: (state) => {
      state.post.status = 'loading';
      state.post.items = [];
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.post.status = 'loaded';
      state.post.items = action.payload;
    },
    [fetchPost.rejected]: (state) => {
      state.post.status = 'error';
      state.post.items = [];
    },
    //Recepționare postări
    [fetchPosts.pending]: (state) => {
      state.posts.status = 'loading';
      state.posts.items = [];
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.status = 'loaded';
      state.posts.items = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.status = 'error';
      state.posts.items = [];
    }, //Recepționare postări populare
    [fetchPopularPosts.pending]: (state) => {
      state.popularposts.status = 'loading';
      state.popularposts.items = [];
    },
    [fetchPopularPosts.fulfilled]: (state, action) => {
      state.popularposts.status = 'loaded';
      state.popularposts.items = action.payload;
    },
    [fetchPopularPosts.rejected]: (state) => {
      state.popularposts.status = 'error';
      state.popularposts.items = [];
    },
    //Recepționare postări dupa tag
    [fetchPostsByTag.pending]: (state) => {
      state.posts.status = 'loading';
      state.posts.items = [];
    },
    [fetchPostsByTag.fulfilled]: (state, action) => {
      state.posts.status = 'loaded';
      state.posts.items = action.payload;
    },
    [fetchPostsByTag.rejected]: (state) => {
      state.posts.status = 'error';
      state.posts.items = [];
    },
    //Recepționare tag-uri
    [fetchTags.pending]: (state) => {
      state.tags.status = 'loading';
      state.tags.items = [];
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.status = 'loaded';
      state.tags.items = action.payload;
    },
    [fetchTags.rejected]: (state) => {
      state.tags.status = 'error';
      state.tags.items = [];
    },
    //Ștergere postări
    [fetchDeletePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },
  },
});

export const postsReducer = postsSlice.reducer;

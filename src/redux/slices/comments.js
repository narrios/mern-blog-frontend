import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchComments = createAsyncThunk('comments/fetchComments', async (id) => {
  const { data } = await axios.get(`/comments/${id}`);
  return data;
});

export const fetchLastComments = createAsyncThunk('comments/fetchLastComments', async () => {
  const { data } = await axios.get('/comments');
  return data;
});

const initialState = {
  comments: {
    items: [],
    status: 'loading',
  },
  lastComments: {
    items: [],
    status: 'loading',
  },
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    returnToMain: (state) => {
      state.comments.status = 'loading';
      state.comments.items = [];
    },
  },
  extraReducers: {
    //Recepționare comentarii
    [fetchComments.pending]: (state) => {
      state.comments.status = 'loading';
      state.comments.items = [];
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.status = 'loaded';
      state.comments.items = action.payload;
    },
    [fetchComments.rejected]: (state) => {
      state.comments.status = 'error';
      state.comments.items = [];
    },
    //Recepționare comentarii recente
    [fetchLastComments.pending]: (state) => {
      state.lastComments.status = 'loading';
      state.lastComments.items = [];
    },
    [fetchLastComments.fulfilled]: (state, action) => {
      state.lastComments.status = 'loaded';
      state.lastComments.items = action.payload;
    },
    [fetchLastComments.rejected]: (state, action) => {
      state.lastComments.status = 'error';
      state.lastComments.items = [];
    },
  },
});

export const commentsReducer = commentsSlice.reducer;

export const { returnToMain } = commentsSlice.actions;

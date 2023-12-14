import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {create} from "axios";

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetch('http://192.168.0.144:1939/posts');

    const data = await response.json();
    return data;
  }
)

export const submitPost = createAsyncThunk(
  "submitPost",
  async (data) => {
    const response = await axios.post('http://192.168.0.144:1939/submit_post', {
      student: data.user,
      post: data.postText
    }).then((res) => console.log(res));
  }
)

export const likePost = createAsyncThunk(
  "likePost",
  async (data) => {
    const response = await axios.post('http://192.168.0.144:1939/like_post', {
      postId: data.id
    }).then((res) => console.log(res));
  }
)

export const dislikePost = createAsyncThunk(
  "dislikePost",
  async (data) => {
    const response = await axios.post('http://192.168.0.144:1939/dislike_post', {
      postId: data.id
    }).then((res) => console.log(res));
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {
    setLikePost (state, action) {
      const postToUpdate = state.data.find(post => post.id === action.payload);
      if (postToUpdate) {
        postToUpdate.likes++
      }
    },
    setDislikePost (state, action) {
      const postToUpdate = state.data.find(post => post.id === action.payload);
      if (postToUpdate) {
        postToUpdate.likes--
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.data = [];
      state.data.push(...action.payload);
      state.loading = false;
      state.error = null;

      console.log(action.payload)
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
})

export const {setLikePost, setDislikePost} = postsSlice.actions;

export default postsSlice.reducer
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const submitComment = createAsyncThunk(
  "submitComment",
  async (data, {getState}) => {
    const state = getState();
    const response = await axios.post('http://192.168.0.144:1939/submit_comment', {
      parentId: state.comments.currentComment,
      author: data.author,
      text: data.text
    }).then(res => console.log("COMMENT RES" + res));
  }
)

const commentsModalSlice = createSlice({
  name: "commentsModal",
  initialState: {
    display: false,
    comments: [],
    currentComment: 0,
  },
  reducers: {
    showComments(state, action) {
      console.log("ACTION COMMENTS", action.payload)
      state.comments = [];
      state.comments = [...action.payload.commentArray];
      state.display = true;
      state.currentComment = action.payload.currentId;
    },
    hideComments(state) {
      state.display = false;
      state.currentComment = 0;
    }
  }
});

export const {showComments, hideComments} = commentsModalSlice.actions;
export default commentsModalSlice.reducer;
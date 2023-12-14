import { configureStore } from "@reduxjs/toolkit";

import postsReducer from './slice/posts';
import themeReducer from  './slice/theme';
import commentsModalSlice from './slice/comment';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    theme: themeReducer,
    comments: commentsModalSlice,
  }
});
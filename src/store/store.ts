import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "../features/issuesSlice";

const store = configureStore({
  reducer: {
    issues: issuesReducer,
  },
});

export default store;

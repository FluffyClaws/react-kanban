import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "../features/issuesSlice";

const preloadedState = JSON.parse(localStorage.getItem("issuesState") || "{}");

const store = configureStore({
  reducer: {
    issues: issuesReducer,
  },
  preloadedState: {
    issues: preloadedState,
  },
});

export default store;

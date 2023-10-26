import { configureStore } from "@reduxjs/toolkit";
import issuesReducer from "../features/issuesSlice";

const preloadedState = JSON.parse(localStorage.getItem("issuesState") || "{}");

// Reset the currentRepoUrl on page load
preloadedState.currentRepoUrl = "";

const store = configureStore({
  reducer: {
    issues: issuesReducer,
  },
  preloadedState: {
    issues: preloadedState,
  },
});

export default store;

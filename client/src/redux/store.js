import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./slice/pageSlice";

export const store = configureStore({
  reducer: { page: pageReducer },
});

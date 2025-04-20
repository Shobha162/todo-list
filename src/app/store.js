
import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../features/TodoSlice";

 const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});
// added comment
export default store;

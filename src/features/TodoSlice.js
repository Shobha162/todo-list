import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createTodo = createAsyncThunk(
    "createTodo",
    async (todoData, { rejectWithValue }) => {
      try {
        const response = await axios.post("https://67feb7c958f18d7209ef23bb.mockapi.io/todo-app", todoData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

export const showTodo = createAsyncThunk(
  "showTodo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://67feb7c958f18d7209ef23bb.mockapi.io/todo-app");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const deleteTodo = createAsyncThunk(
  "deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://67feb7c958f18d7209ef23bb.mockapi.io/todo-app/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const updateTodo = createAsyncThunk(
  "updateTodo",
  async (todoData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://67feb7c958f18d7209ef23bb.mockapi.io/todo-app/${todoData.id}`, todoData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
  


    


const initialState = {
  todos: [],
  loading: false,
  error: null,
  searchTodo: [], // optional, not used now
};

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    Searchtodo: (state, action) => {
      state.searchTodo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload); // ✅ fixed here
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(showTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(showTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(showTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload.id); 
        
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id); 
        
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

  export const { Searchtodo } = todoSlice.actions;
  
  export default todoSlice.reducer;
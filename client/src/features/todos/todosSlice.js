import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todoService from 'services/todoService';
import M from 'messages';
import toast from 'react-hot-toast';

const initialState = {
  todoList: [],
  count: 0,
  params: {
    params: {
      sort: { field: "id", order: "desc" },
      filter: {},
      limit: 3,
      skip: 0,
    }
  },
  status: 'waiting',
  createStatus: 'waiting',
  updateStatus: 'waiting',
  deleteStatus: 'waiting',
  error: null,
  filterStatus: 'all'
};

export const fetchTodoList = createAsyncThunk(
  'todoList/fetchTodoList',
  async (params) => {
    const response = await todoService.getTodos(params || {params: initialState.params});
    return response.data;
  }
);


export const createTodo = createAsyncThunk(
  'todoList/createTodo',
  async (data) => {
    const response = await todoService.createTodo(data);
    return response.data.task;
  }
);

export const updateTodo = createAsyncThunk(
  'todoList/updateTodo',
  async (todoData) => {
    const {id, ...data} = todoData;
    const filteredData = {
      name: data.name,
      description: data.description,
      status: data.status,
      expireDate: data.expireDate,
    }
    const response = await todoService.updateTodo(id, filteredData);
    return response.data.task;
  }
);

export const deleteTodo = createAsyncThunk(
  'todoList/deleteTodo',
  async (todoId) => {
    await todoService.deleteTodo(todoId);
    return todoId;
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
      let newFilter = {};
      if (action.payload !== 'all') {
        newFilter = {'status': action.payload};
      }
      state.params.params.filter = newFilter;
      state.params.params.skip = 0;
      state.status = 'waiting';
    },
    setParams: (state, action) => {
      state.params = action.payload;
      state.status = 'waiting';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodoList.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTodoList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todoList = action.payload.data;
        state.count = action.payload.count;
      })
      .addCase(fetchTodoList.rejected, (state, action) => {
        toast.error(M.get('actionMsg.error.get'));
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTodo.pending, (state, action) => {
        state.createStatus = 'loading';
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        toast.success(M.get('actionMsg.success.create'));
        state.createStatus = 'succeeded';
        state.status = 'waiting';
      })
      .addCase(createTodo.rejected, (state, action) => {
        toast.error(M.get('actionMsg.error.create'));
        state.createStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateTodo.pending, (state, action) => {
        state.updateStatus = 'loading';
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        toast.success(M.get('actionMsg.success.update'));
        state.updateStatus = 'succeeded';
        state.status = 'waiting';
      })
      .addCase(updateTodo.rejected, (state, action) => {
        toast.error(M.get('actionMsg.error.update'));
        state.updateStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteTodo.fulfilled, (state) => {
        toast.success(M.get('actionMsg.success.delete'));
        state.deleteStatus = 'succeeded';
        state.status = 'waiting';
        state.params.params.skip = 0;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        toast.error(M.get('actionMsg.error.delete'));
        state.deleteStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updateFilterStatus, setParams } = todoSlice.actions;


export const selectAllTodoList = (state) => state.todoState.todoList;

export const selectFilterStatus = (state) => state.todoState.filterStatus;

export default todoSlice.reducer;

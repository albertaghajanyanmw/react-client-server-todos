import { get, post, put, del } from 'services/client';
import { apiEndpoints } from 'configs';

export default {
  getAllTodos: async (params) => {
    const options = { url: `${apiEndpoints.allTodos}`, params: {...params} };
    return get(options);
  },
  getTodos: async (params) => {
    const options = { url: `${apiEndpoints.todos}`, params: {...params} };
    return get(options);
  },
  getTodo: async (id) => {
    const options = { url: apiEndpoints.todo.replace(':todoId', id)};
    return get(options);
  },
  createTodo: async (data) => {
    const options = { url: `${apiEndpoints.createTodo}`, data};
    return post(options);
  },
  updateTodo: async (id, data) => {
    const options = { url: apiEndpoints.updateTodo.replace(':todoId', id), data};
    return put(options);
  },
  deleteTodo: async (id) => {
    const options = { url: apiEndpoints.updateTodo.replace(':todoId', id)};
    return del(options);
  },
  reminderTodo: async (id, data) => {
    const options = { url: apiEndpoints.reminderTodo.replace(':todoId', id), data};
    return put(options);
  },
}
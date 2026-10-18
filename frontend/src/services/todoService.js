import api from './api.js'

export const getTodos = () => api.get('/todos')
export const createTodo = (payload) => api.post('/todos', payload)
export const updateTodo = (id, payload) => api.patch(`/todos/${id}`, payload)
export const deleteTodo = (id) => api.delete(`/todos/${id}`)

import axios from 'axios';

const API_URL = 'http://localhost:8888';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getItems = (endpoint) => api.get(`/${endpoint}`);

export const getItemById = (endpoint, id) => api.get(`/${endpoint}/${id}`);

export const createItem = async (endpoint, data) => {
  try {
    const response = await api.post(`/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error creating item in ${endpoint}:`, error);
    throw error;
  }
};

export const updateItem = async (endpoint, id, data) => {
  try {
    const response = await api.put(`/${endpoint}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating item ${id} in ${endpoint}:`, error);
    throw error;
  }
};

export const deleteItem = (endpoint, id) => api.delete(`/${endpoint}/${id}`);

export const loginUser = async (email, password) => {
  const response = await api.get(`/users?email=${email}&password=${password}`);
  return response.data[0];
};
import axios from "axios";
import storageService from "../services/storage";
const baseUrl = "/api/blogs";

const config = () => ({
  headers: {
    Authorization: storageService.loadUser()
      ? `Bearer ${storageService.loadUser().token}`
      : null,
  },
});

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch blogs' }
  }
};

const getById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch blog' }
  }
};

const create = async (newBlog) => {
  try {
    const response = await axios.post(baseUrl, newBlog, config());
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to create blog' }
  }
};

const update = async (id, updatedBlog) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config());
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update blog' }
  }
};


const remove = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config());
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to delete blog' }
  }
};

const comment = async (id, comment) => {
  try {
    const request = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config())
    return request.data
  } catch (error) {
    throw error.response?.data || { error: 'Failed to add comment' }
  }
}

export default { getAll, getById, create, update, remove, comment };

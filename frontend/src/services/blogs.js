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
  const response = await axios.get(baseUrl);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config());
  return response.data;
};

const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config());
  return response.data;
};


const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config());
  return response.data;
};

const comment = async (id, comment) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config())
  return request.data
}

export default { getAll, getById, create, update, remove, comment };

import axios from 'axios'
const baseUrl = '/api/blogs'

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('loggedBlogUser'))
  return user?.token
}

const config = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
})

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config());
  return response.data;
};

const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config())
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config())
  return response.data;
};

export default { getAll, create, update, remove };
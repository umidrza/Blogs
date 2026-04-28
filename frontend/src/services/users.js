import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch users' }
  }
}

const getById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch user' }
  }
}

const create = async (newUser) => {
  try {
    const response = await axios.post(baseUrl, newUser);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to create user' }
  }
};

export default { getAll, getById, create };
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const useResource = (baseUrl) => {
  const [data, setData] = useState([]);

  const token = JSON.parse(localStorage.getItem('loggedBlogUser'))?.token
  let config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  useEffect(() => {
    config = {
      headers: { Authorization: `Bearer ${token}` }
    }
  }, [token])

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    setData(response.data);
  };

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject, config);
    setData((prev) => prev.concat(response.data));
    return response.data;
  };

  const update = async (id, updatedObject) => {
    const response = await axios.put(
      `${baseUrl}/${id}`,
      updatedObject,
      config
    );

    setData((prev) =>
      prev.map((r) => (r.id === id ? { ...updatedObject, user: r.user } : r))
    );

    return response.data;
  };

  const remove = async (id) => {
    await axios.delete(`${baseUrl}/${id}`, config);
    setData((prev) => prev.filter((r) => r.id !== id));
  };

  useEffect(() => {
    getAll();
  }, [baseUrl]);

  return [
    data,
    {
      setData,
      getAll,
      create,
      update,
      remove
    }
  ];
};

export default useResource;
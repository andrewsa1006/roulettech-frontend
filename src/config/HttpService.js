import axios from "axios";

export const BASE_URL =
  "https://w2s25nqdn9.execute-api.us-east-1.amazonaws.com";

export const getAllFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`);

  return data;
};

export const getOneFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`);
  return data;
};

export const putToAPI = async (url, data) => {
  const response = await axios.put(`${BASE_URL}/${url}`, data);
  return response.data;
};

export const postToAPI = async (url, data) => {
  console.log(url, data);
  const response = await axios.post(`${BASE_URL}/${url}`, data);
  return response.data;
};

export const deleteFromAPI = async (url) => {
  const response = await axios.delete(`${BASE_URL}/${url}`);
  return response.data;
};

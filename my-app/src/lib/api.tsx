import { NewResume } from './types';
const { default: axios } = require('axios');
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
  },
});

const CreateNewResume = (data: NewResume) => {
  return axiosClient.post('/user-resumes', {
    data: data,
  });
};

const GetMyResume = (userEmail: string) => {
  return axiosClient.get(`user-resumes?filters[email][$eq]=${userEmail}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
    },
  });
};

const GetOneResume = (uuid: string) => {
  return axiosClient.get(`user-resumes?filters[documentId][$eq]=${uuid}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
    },
  });
};

const API = {
  CreateNewResume,
  GetMyResume,
  GetOneResume
};
export default API;

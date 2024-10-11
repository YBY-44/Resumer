import { ThemeColor } from '@/components_/ThemeColor';
import { NewResume, DetailType, Experience, Education, Skill } from './types';
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
  return axiosClient.get(`user-resumes?filters[documentId][$eq]=${uuid}&[populate]=*`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
    },
  });
};

const UpdatePersonalDetailResume = (uuid: string, data: DetailType) => {
  return axiosClient.put(
    `user-resumes/${uuid}`,
    {
      data: {
        FirstName: data.firstName,
        LastName: data.lastName,
        Address: data.address,
        Phone: data.phone,
        Linkin: data.linkinLink,
        Portfolio: data.portfolioLink,
        ContactEmail: data.email,
        title: data.jobTitle,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
      },
    }
  );
};

const UpdateSummaryResume = (uuid: string, data: string) => {
  return axiosClient.put(
    `user-resumes/${uuid}`,
    {
      data: {
        Summary: data
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
      },
    }
  );
};

const UpdateExperienceResume = (uuid: string, data: Experience[]) => {
  return axiosClient.put(
    `user-resumes/${uuid}`,
    {
      data: {
        Experience: data
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
      },
    }
  );
};
const UpdateEducationResume = (uuid: string, data: Education[]) => {
  return axiosClient.put(
    `user-resumes/${uuid}`,
    {
      data: {
        Education: data
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
      },
    }
  );
};
const DeleteResume = (uuid: string) => {
  return axiosClient.delete(
    `user-resumes/${uuid}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
      },
    }
  );
};
const UpdateSkillResume = (uuid: string, data: Skill[]) => {
  console.log(data)
  return axiosClient.put(
    `user-resumes/${uuid}`,
    {
      data: {
        Skill: data
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
      },
    }
  );
};
const UpdateColorResume = (uuid: string, data: string) => {
  console.log(data)
  return axiosClient.put(
    `user-resumes/${uuid}`,
    {
      data: {
        themeColor: data
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
      },
    }
  );
};
export const fetchCountries = async (query:string) => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data;
    
    // 过滤国家名称包含查询字符串的国家
    const filteredCountries = countries.filter((country:any) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );

    return filteredCountries.map((country:any) => country.name.common);
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
};

const API = {
  CreateNewResume,
  GetMyResume,
  GetOneResume,
  UpdatePersonalDetailResume,
  UpdateSummaryResume,
  UpdateExperienceResume,
  UpdateEducationResume,
  UpdateSkillResume,
  DeleteResume,
  UpdateColorResume
};
export default API;

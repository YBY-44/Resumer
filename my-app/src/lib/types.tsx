import internal from 'stream';

export interface NewResume {
  resumeId: string;
  title: string;
  name: string;
  email: string;
}
export type ResumeOverview = {
  documentId: string;
  email: string;
  id: number;
  name: string;
  resumeId: string;
  title: string;
  themeColor:string;
};

export type Experience = {
  positionTitle: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  isCurrentlyWork: boolean;
  workSummary: string;
};

export type Education = {
  universityName: string;
  degree: string;
  country: string;
  startDate: string;
  endDate: string;
  describtion: string;
};

export type Skill = {
  name: string;
  rating: number;
};

export type DetailType = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  jobTitle: string;
  linkinLink?: string | undefined;
  portfolioLink?: string | undefined;
};

export type ResumeInfo = {
  Detail: DetailType;
  themeColor: string;
  summery: string;
  experience: { exp: Experience[] };
  education: {edu: Education[]};
  skills: {skl:Skill[]};
};

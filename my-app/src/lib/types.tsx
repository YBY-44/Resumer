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
};
export type ResumeInfo = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  jobTitle: string;
  themeColor:string;
  summery:string;
}
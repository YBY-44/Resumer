import { createContext, Dispatch, SetStateAction } from "react";
import { ResumeInfo } from "@/lib/types";

  
  interface ResumeInfoContextType {
    resumeInfo: ResumeInfo; // 简历信息
    setResumeInfo: Dispatch<SetStateAction<ResumeInfo>>; // 更新简历信息的函数
  }
  

export const ResumeInfoContext = createContext<ResumeInfoContextType>({
    resumeInfo: {
        firstName:'',
        lastName:''
    },
    setResumeInfo: () => {}, // 默认的空函数
  });
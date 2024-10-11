import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ExperiencePre } from '@/components_/ExperiencePre';
import exp from 'constants';

export const DetailSchema = z.object({
  firstName: z
    .string()
    .min(1, 'FirstName is required')
    .max(50, 'FirstName at most have 50 characters'),
  lastName: z
    .string()
    .min(1, 'LastName is required')
    .max(50, 'LastName at most have 50 characters'),
  email: z.string().email("Email must include '@xxx.xx.'"),
  address: z
    .string()
    .min(4, 'Address is required')
    .max(200, 'Address is too long.'),
  phone: z
    .string()
    .min(9, 'A valid phone is required')
    .max(13, 'A valid phone is required'),
  linkinLink: z.string().url().or(z.literal('')),
  portfolioLink: z.string().url().or(z.literal('')),
  jobTitle: z
    .string()
    .min(1, 'Job Title is required')
    .max(50, 'Job Title is too long'),
});

export const ExperienceSchema = z.object({
  exp: z.array(
    z.object({
      positionTitle: z.string(),
      companyName: z.string(),
      city: z.string(),
      state: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      isCurrentlyWork: z.boolean(),
      workSummary: z.string(),
    })
  ),
});

export const EducationSchema = z.object({
  edu: z.array(
    z.object({
      universityName: z.string(),
      degree: z.string(),
      country: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      describtion: z.string(),
    })
  ),
});

export const SkillSchema = z.object({
  skl: z.array(
    z.object({
      name: z.string(),
      rating: z.number(),
    })
  ),
});

export const ResumeInfoDetail = z.object({
  Detail: DetailSchema,
  themeColor: z.string().min(1, 'Please Select a Theme Color'),
  summery: z.string().min(1, 'summery is necessary'),
  experience: ExperienceSchema,
  education: EducationSchema,
  skills: SkillSchema,
});
export type FormTypePickDetail = z.infer<typeof ResumeInfoDetail>;
export type FormDetail = z.infer<typeof DetailSchema>;
export type FormExperience = z.infer<typeof ExperienceSchema>;
export type FormEducation = z.infer<typeof EducationSchema>;
export type FormSkill = z.infer<typeof SkillSchema>;

export const PickDetail = () => {
  return useForm<FormTypePickDetail>({
    resolver: zodResolver(ResumeInfoDetail),
  });
};

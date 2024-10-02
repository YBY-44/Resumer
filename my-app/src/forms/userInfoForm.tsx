import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

export const ResumeInfoDetail = z.object({
    firstName: z.string().min(1, "FirstName is required").max(50, "FirstName at most have 50 characters"),
    lastName: z.string().min(1, "LastName is required").max(50, "LastName at most have 50 characters"),
    email: z.string().email("Email must include '@xxx.xx.'"),
    address: z.string().min(4, "Address is required").max(200, "Address is too long."),
    phone: z.string().min(9, "A valid phone is required").max(13, "A valid phone is required"),
    jobTitle: z.string().min(1, "Job Title is required").max(50, "Job Title is too long"),
    themeColor: z.string().min(1,'Please Select a Theme Color'),
    summery: z.string().min(1,'summery is necessary')

})
export type FormTypePickDetail = z.infer<typeof ResumeInfoDetail>;

export const PickDetail=()=>{
    return useForm<FormTypePickDetail>({
       resolver: zodResolver(ResumeInfoDetail),
    })
}

import { z } from "zod";

export const createArticleSchema = z.object({
    title:z.string({
        required_error:'title is required',
        invalid_type_error : 'title should of type string'
    }).min(2 , "title must be more then 2 characters").max(200),
    description:z.string().min(10,"title must be more then 10 characters"),
   });
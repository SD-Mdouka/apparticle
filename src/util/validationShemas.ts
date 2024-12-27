import { z } from "zod";

// create Article Schema
export const createArticleSchema = z.object({
    title: z.string({
        required_error: 'title is required',
        invalid_type_error: 'title should of type string'
    }).min(2, "title must be more then 2 characters").max(200),
    description: z.string().min(10, "title must be more then 10 characters"),
});

// register shcema
export const createUsersSchema = z.object({

    username: z.string().min(2).max(100),
    email: z.string().min(10).max(200).email(),
    password: z.string().min(6),
})

// login shcema
export const loginSchema = z.object({
    email: z.string().min(10).max(200).email(),
    password: z.string().min(6),
})

//create comment schema
export const createCommentSchema = z.object({
    text: z.string().min(2).max(500),
    articleId: z.number(),
});
// register shcema
export const UpdateUsersSchema = z.object({

    username: z.string().min(2).max(100).optional(),
    email: z.string().min(10).max(200).email().optional(),
    password: z.string().min(6).optional(),
})

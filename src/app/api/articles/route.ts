import { articles } from "@/util/data";
import { CreateArticleDteo } from "@/util/Dtos";
import { createArticleSchema } from "@/util/validationShemas";
import { NextRequest, NextResponse } from "next/server";

/**
 * 
 * @method GET 
 * @route ~/api/articles
 * @desc Get All Articles
 * @access public 
 */

export function GET(request:NextRequest){
    return NextResponse.json(articles,{ status:200})
}

/**
 * 
 * @method POST 
 * @route ~/api/articles
 * @desc create a single Article
 * @access public
 */

export async function POST(request:NextRequest){
   const body = (await request.json()) as CreateArticleDteo;

   const validation = createArticleSchema.safeParse(body);

   if(!validation.success){
    return NextResponse.json({message : validation.error.errors[0].message},{status:400})
   }

   const newArticle:Article = {
    title:body.title,
    body:body.body,
    id:articles.length + 1,
    userId:200
   }

   articles.push(newArticle);
   console.log(body)
   return NextResponse.json(newArticle,{status:200})
}
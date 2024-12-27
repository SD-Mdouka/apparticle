import { ARTICLE_PER_PAGE } from "@/util/Constant";
import prisma from "@/util/db";
import { CreateArticleDteo } from "@/util/Dtos";
import { createArticleSchema } from "@/util/validationShemas";
import { verifyToken } from "@/util/verifyToken";
import { Article } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


/**
 * 
 * @method GET i
 * @route ~/api/articles
 * @desc Get All Articles by page
 * @access public 
 */

export async function GET(request: NextRequest) {
    try{
        const NumPage = request.nextUrl.searchParams.get('pageNumber') || '1';
        
        const articles = await prisma.article.findMany({
            skip: ARTICLE_PER_PAGE * (parseInt(NumPage)-1),
            take:ARTICLE_PER_PAGE
        });
    return NextResponse.json(articles, { status: 200 })
    }catch (error) {
        return NextResponse.json({ message : "internal server error"}, { status: 500 })
    }
}

/**
 * 
 * @method POST 
 * @route ~/api/articles
 * @desc create a single Article
 * @access private (only admin can create article)
 */

export async function POST(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if(user === null || user.isAdmin === false){
            return NextResponse.json({ message : "only admin , access denied"}, { status: 401 })
        }
        const body = (await request.json()) as CreateArticleDteo;

        const validation = createArticleSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
        }

        const newArticle: Article = await prisma.article.create({
            data: {
                title: body.title,
                description: body.description
            }
        })

        console.log(body)
        return NextResponse.json(newArticle, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message : "internal server error"}, { status: 500 })
    }
}
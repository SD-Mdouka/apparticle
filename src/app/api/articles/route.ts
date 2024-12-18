import prisma from "@/util/db";
import { CreateArticleDteo } from "@/util/Dtos";
import { createArticleSchema } from "@/util/validationShemas";
import { Article } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


/**
 * 
 * @method GET 
 * @route ~/api/articles
 * @desc Get All Articles
 * @access public 
 */

export async function GET(request: NextRequest) {
    try{
        const articles = await prisma.article.findMany();
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
 * @access public
 */

export async function POST(request: NextRequest) {
    try {
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
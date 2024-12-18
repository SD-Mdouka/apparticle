

import prisma from "@/util/db";
import { UpdateArticleDteo } from "@/util/Dtos";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string }
}
/**
 * 
 * @method GET 
 * @route ~/api/articles/:id
 * @desc Get single Articles By Id
 * @access public 
 */

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const article = await prisma.article.findUnique({ where: { id: parseInt(params.id) } })

        if (!article) {
            return NextResponse.json({ message: "article not found" }, { status: 404 })
        }
        return NextResponse.json(article, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}

/**
 * 
 * @method PUT 
 * @route ~/api/articles/:id
 * @desc Update Article
 * @access public 
 */

export async function PUT(request: NextRequest, { params }: Props) {
    try {
    const article = await prisma.article.findUnique({ where: { id: parseInt(params.id) } })

    if (!article) {
        return NextResponse.json({ message: "article not found" }, { status: 404 })
    }

    const body = (await request.json()) as UpdateArticleDteo;
    const updateArticle = await prisma.article.update({
        where: { id: parseInt(params.id)},
        data : {
            title:body.title,
            description:body.description
        }
    });

    return NextResponse.json(updateArticle, { status: 200 })
}catch (error){
    return NextResponse.json({ message : "internal server error"}, { status: 500 })
}
}

/**
 * 
 * @method DELETE 
 * @route ~/api/articles/:id
 * @desc Delete Article
 * @access public 
 */

export async function DELETE(request: NextRequest, { params }: Props) {
    try {

    
    const article = await prisma.article.findUnique({ where: { id: parseInt(params.id) } })

    if (!article) {
        return NextResponse.json({ message: "article not found" }, { status: 404 })
    }

    const deleteArticle = await prisma.article.delete({
        where: { id: parseInt(params.id)}
    });
    return NextResponse.json({ message: 'Delete article' }, { status: 200 })
} catch(error){
    return NextResponse.json({ message : "internal server error"}, { status: 500 })    
}
}

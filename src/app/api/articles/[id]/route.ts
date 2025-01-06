

import prisma from "@/util/db";
import { UpdateArticleDteo } from "@/util/Dtos";
import { verifyToken } from "@/util/verifyToken";
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

export async function GET({ params }: Props) {
    try {
        const article = await prisma.article.findUnique({ 
            where: { id: parseInt(params.id) },
            include : {
                comments: {
                    include : {
                        user : {
                            select : {
                                username:true
                            }
                        }
                    },
                    orderBy : {
                        createAt:'desc'
                    }
                    
                }
            }
        });

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
 * @access private only update article by 
 */

export async function PUT(request: NextRequest, { params }: Props) {
    try {
        const user = verifyToken(request);
                if(user === null || user.isAdmin === false){
                    return NextResponse.json({ message : "only admin , access denied"}, { status: 401 })
                }
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

        const user = verifyToken(request);
        if(user === null || user.isAdmin === false){
            return NextResponse.json({ message : "only admin , access denied"}, { status: 401 })
        }

    const article = await prisma.article.findUnique(
        {
            where: { id: parseInt(params.id) },
            include : { comments : true} 
        })

    if (!article) {
        return NextResponse.json({ message: "article not found" }, { status: 404 })
    }

    //deleting the article
    await prisma.article.delete({
        where: { id: parseInt(params.id)}
    });
    
    //deleting the comments that belong to this article
    const commentsIds :number[] =article?.comments.map(comment => comment.id);

    await prisma.comment.deleteMany({
        where : { id : { in : commentsIds}}
    });

    return NextResponse.json({ message: 'Delete article' }, { status: 200 })
} catch(error){
    return NextResponse.json({ message : "internal server error"}, { status: 500 })    
}
}

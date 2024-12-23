/**
 * 
 * @method POST 
 * @route ~/api/comments
 * @desc create new Comments
 * @access private (only logged in user)
 */

import prisma from "@/util/db";
import { CreateCommentDteo } from "@/util/Dtos";
import { createCommentSchema } from "@/util/validationShemas";
import { verifyToken } from "@/util/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const user = verifyToken(request);


        if (!user) {
            return NextResponse.json({ message: "only logged in user ,access denied" }, { status: 401 });
        }

        const body = (await request.json()) as CreateCommentDteo;

        const validation = createCommentSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
        }

        const newComment = await prisma.comment.create({
            data: {
                text: body.text,
                articleId: body.articleId,
                userId:user.id
            }
        })

        console.log(body)
        return NextResponse.json(newComment, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message : "internal server error"}, { status: 500 })
    }
}

/**
 * 
 * @method GET 
 * @route ~/api/comments
 * @desc Get All Comments
 * @access private (only admin) 
 */

export async function GET(request: NextRequest) {
    try{
        const user = verifyToken(request);
        if(user === null || user.isAdmin === false){
            return NextResponse.json({ message: "only logged in user ,access denied" }, { status: 401 });           
        }
        const comments = await prisma.comment.findMany();
    return NextResponse.json(comments, { status: 200 })
    }catch (error) {
        return NextResponse.json({ message : "internal server error"}, { status: 500 })
    }
}
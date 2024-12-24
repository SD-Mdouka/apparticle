/**
 * 
 * @method PUT 
 * @route ~/api/comments/:id
 * @desc Update Comment
 * @access private (only owner of the comment) 
 */

import prisma from "@/util/db";
import { UpdateCommentDteo } from "@/util/Dtos";
import { verifyToken } from "@/util/verifyToken";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string }
}

export async function PUT(request: NextRequest, { params }: Props) {
    try {
    const comment = await prisma.comment.findUnique({ where: { id: parseInt(params.id) } })

    if (!comment) {
        return NextResponse.json({ message: "comment not found" }, { status: 404 })
    }
    const user = verifyToken(request);
    if(user === null || user.id !== user.id){

        return NextResponse.json({ message: "you are not allowed, access denied"}, { status: 403 })
        }
    const body = (await request.json()) as UpdateCommentDteo;
    const updateComment = await prisma.comment.update({
        where: { id: parseInt(params.id)},
        data : {
            text:body.text,
        }
    });

    return NextResponse.json(updateComment, { status: 200 })
}catch (error){
    return NextResponse.json({ message : "internal server error"}, { status: 500 })
}
}

/**
 * 
 * @method DELETE 
 * @route ~/api/users/profile/:id
 * @desc DELETE Profile
 * @access private 
 */

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const comment = await prisma.comment.findUnique({ where: { id: parseInt(params.id) } })

    if (!comment) {
        return NextResponse.json({ message: "comment not found" }, { status: 404 })
    }

        const user = verifyToken(request);

        if(user === null){
            return NextResponse.json({ message: "no token provided, access denied" }, { status: 401 })    
        }

        if(user.isAdmin || user.id === comment.id){
        await prisma.comment.delete({
            where: { id: parseInt(params.id) }
        });
        return NextResponse.json({ message: "comment deleted)"}, { status: 200 })
        }
        return NextResponse.json(
            { message : 'you are not allowed, access denied'}, { status: 403 })
        
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}
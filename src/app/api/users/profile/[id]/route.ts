

import prisma from "@/util/db";
import { UpdateUserDteo } from "@/util/Dtos";
import { UpdateUsersSchema } from "@/util/validationShemas";
import { verifyToken } from "@/util/verifyToken";
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: string }
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
        const user = await prisma.user.findUnique(
            { where: { id: parseInt(params.id) },
            include : { comments : true}
        });

        if (!user) {
            return NextResponse.json({ message: "user not found" }, { status: 404 });
        }

        const userfromToken = verifyToken(request);

        if(userfromToken!== null && userfromToken.id === user.id){
             //deleting the article
        await prisma.user.delete({
            where: { id: parseInt(params.id) }
        });

        //deleting the comments that belong to this article
        const commentsIds =user?.comments.map(comment => comment.id);

        await prisma.comment.deleteMany({
            where : { id : { in : commentsIds}}
        });
        return NextResponse.json({ message: "your profile (account has been deleted)"}, { status: 200 })
        }
        return NextResponse.json(
            { message : 'only user himself can delete his profile, forbidden'}, { status: 403 })
        
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}

//GET

/**
 * 
 * @method GET 
 * @route ~/api/users/profile/:id
 * @desc Get Profile
 * @access private 
 */

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) },
         select : {
            id:true,
            email:true,
            username:true,
            createAt:true,
            isAdmin:true
         } })

        if (!user) {
            return NextResponse.json({ message: "user not found" }, { status: 404 })
        }
   
        const userfromToken = verifyToken(request);
        

        if(userfromToken!== null && userfromToken.id === user.id){

        return NextResponse.json({ message: "you are not allowed, access denied"}, { status: 403 })
        }
        return NextResponse.json(
            user, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}

//PUT
/**
 * 
 * @method PUT 
 * @route ~/api/users/profile/:id
 * @desc Update Profile
 * @access private 
 */

export async function PUT(request: NextRequest, { params }: Props) {
    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) },
         select : {
            id:true,
            email:true,
            username:true,
            createAt:true,
            isAdmin:true
         } })

        if (!user) {
            return NextResponse.json({ message: "user not found" }, { status: 404 })
        }
   
        const userfromToken = verifyToken(request);
        

        if(userfromToken === null || userfromToken.id !== user.id){

        return NextResponse.json({ message: "you are not allowed, access denied"}, { status: 403 })
        }
        const body = await request.json() as UpdateUserDteo;

        const validation = UpdateUsersSchema.safeParse(body);
        if(!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message}, { status: 400 })    
        }
        
        if (body.password){
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password,salt);
        }

        const updateUser = await prisma.user.update({
            where : { id: parseInt(params.id)} ,
            data : {
                username : body.username,
                email:body.email,
                password:body.password
            }
        });

        const { password , ...other} = updateUser;
        return NextResponse.json({...other} , { status : 200})
        
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}
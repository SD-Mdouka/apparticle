/**
 * 
 * @method POST 
 * @route ~/api/users/register
 * @desc create a new users
 * @access public
 */

import prisma from "@/util/db";
import { RegisterDteo } from "@/util/Dtos";
import { createUsersSchema } from "@/util/validationShemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { setCookie } from "@/util/generateToken";

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as RegisterDteo;

        const validation = createUsersSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where : { email : body.email}});

        if(user) {
            return NextResponse.json({ message: "this user alreay registered" }, { status: 400 })   
        }

        const salt = await bcrypt.genSalt(10);
        const hashePassword = await bcrypt.hash(body.password,salt);
        const newUser = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password:hashePassword
            },
            select: {
                username:true,
                id:true,
                isAdmin:true
            }
        });

        //generate JWT
     const cookie = setCookie({ id : newUser.id, username: newUser.username,isAdmin:newUser.isAdmin})
        return NextResponse.json({...newUser,message : 'Register && Authenticated'}, 
            { status: 200 ,headers : { "Set-Cookie" : cookie}})
    } catch (error) {
        return NextResponse.json({ message : "internal server error"}, { status: 500 })
    }
}
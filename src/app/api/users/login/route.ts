/**
 * 
 * @method POST 
 * @route ~/api/users/login
 * @desc create a new login
 * @access public
 */

import prisma from "@/util/db";
import { loginDteo } from "@/util/Dtos";
import { loginSchema } from "@/util/validationShemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { setCookie } from "@/util/generateToken";

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as loginDteo;

        const validation = loginSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
        }

        const user = await prisma.user.findUnique({ where : { email : body.email}});

        if(!user) {
            return NextResponse.json({ message: "invalid password or email" }, { status: 400 })   
        }

        const isPasswordMatch = await bcrypt.compare(body.password,user.password);
        if(!isPasswordMatch){
            return NextResponse.json({ message : "invalid password or email"}, { status: 400 })
        }
        
        //generate JWT token
        const cookie = setCookie({ id : user.id, username: user.username,isAdmin:user.isAdmin})
        return NextResponse.json(
            {message : 'Authenticated'}, 
            {
                 status: 200 ,
                 headers : { "Set-Cookie" : cookie}
                })
    } catch (error) {
        return NextResponse.json({ message : "internal server error"}, { status: 500 })
    }
}
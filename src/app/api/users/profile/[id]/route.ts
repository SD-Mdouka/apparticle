

import prisma from "@/util/db";
import { JWTPayload } from "@/util/type";
import jwt from 'jsonwebtoken';
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
        console.log(request.headers)
        const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) } })

        if (!user) {
            return NextResponse.json({ message: "user not found" }, { status: 404 })
        }

        const authToken = request.headers.get('authToken') as string;        
        const userfromToken = jwt.verify(authToken,process.env.JWT_SECRET as string) as JWTPayload;  
        

        if(userfromToken.id === user.id){
        const deleteUser = await prisma.user.delete({
            where: { id: parseInt(params.id) }
        });
        return NextResponse.json({ message: "your profile (account has been deleted)"}, { status: 200 })
        }
        return NextResponse.json(
            { message : 'only user himself can delete his profile, forbidden'}, { status: 403 })
        
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}

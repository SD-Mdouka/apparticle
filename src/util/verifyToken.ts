import { NextRequest } from "next/server";
import { JWTPayload } from "./type";
import jwt from 'jsonwebtoken';

//Verify token for api in db
export function verifyToken(request:NextRequest):JWTPayload | null {
    try {
        const jwtToken = request.cookies.get('jwtToken');
        const token = jwtToken?.value as string;
        if(!token) return null;
        const userPayload = jwt.verify(token,process.env.JWT_SECRET as string) as JWTPayload;
        return userPayload;
    } catch (error) {
        return null;
    }
}

//Verify token for page in UI
export function verifyTokenForPage(token:string):JWTPayload | null {
    try {
       
        const userPayload = jwt.verify(token,process.env.JWT_SECRET as string) as JWTPayload;
        if(!userPayload) return null;
        return userPayload;
    } catch (error) {
        return null;
    }
}
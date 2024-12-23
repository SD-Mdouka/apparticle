import { NextRequest } from "next/server";
import { JWTPayload } from "./type";
import jwt from 'jsonwebtoken';

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
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const authToken = request.cookies.get('jwtToken');
        const token = authToken?.value as string;  
        
        if (!token){
            return NextResponse.json(
                { message : "not token private, access denied"}, 
                { status: 401 }//Unauthorized
                );
        }
}

export const config = {
    matcher : ['/api/users/profile/:path']
}
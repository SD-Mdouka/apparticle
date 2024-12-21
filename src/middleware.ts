import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const authToken = request.headers.get('authToken') as string;
        
        if (!authToken){
            return NextResponse.json(
                { message : "not token private, access denied"}, 
                { status: 401 }//Unauthorized
                );
        }
}

export const config = {
    matcher : ['/api/users/profile/:path']
}
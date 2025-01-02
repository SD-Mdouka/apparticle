import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const authToken = request.cookies.get('jwtToken');
        const token = authToken?.value as string;  
        
        if (!token){
            if(request.nextUrl.pathname.startsWith('/api/users/profile/'))
            return NextResponse.json(
                { message : "not token private, access denied"}, 
                { status: 401 }//Unauthorized
                );
        }else{
            if(request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/regiter')
            {
                return NextResponse.redirect(new URL('/',request.url))
            }
        }
}

export const config = {
    matcher : ['/api/users/profile/:path','/login','/register']
}
/**
 * 
 * @method  GET 
 * @route ~/api/users/logout
 * @desc logout users
 * @access public
 */

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const cookieStore = await cookies();
        cookieStore.delete('jwtToken');
        return NextResponse.json({ message : 'logout'},{ status:200})
    } catch (error) {
        return NextResponse.json({ message : 'internal server error'},{ status:500})
    }
}
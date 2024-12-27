
/**
 * 
 * @method GET i
 * @route ~/api/articles/searchText=value
 * @desc Get All Articles by search text
 * @access public 
 */

import prisma from "@/util/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const count =await prisma.article.count();
        return NextResponse.json({count}, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}
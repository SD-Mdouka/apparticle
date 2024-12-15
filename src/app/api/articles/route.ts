import { articles } from "@/util/data";
import { NextRequest, NextResponse } from "next/server";

/**
 * 
 * @method GET 
 * @route ~/api/articles
 * @desc Get All Articles
 * @access public 
 */

export function GET(request:NextRequest){
    return NextResponse.json(articles,{ status:200})
}
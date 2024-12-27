
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
        const SearchText = request.nextUrl.searchParams.get('searchText');
        let articles;
        if (SearchText) {
            articles = await prisma.article.findMany({
                where: {
                    title: {
                        startsWith:SearchText,
                        mode: 'insensitive'
                    }
                }
            })
        } else {
            articles = await prisma.article.findMany({
                take: 6
            })
        }
        return NextResponse.json(articles, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "internal server error" }, { status: 500 })
    }
}
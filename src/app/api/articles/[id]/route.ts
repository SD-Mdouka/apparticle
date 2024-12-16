

import { articles } from "@/util/data";
import { UpdateArticleDteo } from "@/util/Dtos";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params : { id : string} 
}
/**
 * 
 * @method GET 
 * @route ~/api/articles/:id
 * @desc Get single Articles By Id
 * @access public 
 */

export function GET(request:NextRequest,{params}:Props){
    const article = articles.find( a => a.id === parseInt(params.id));

    if(!article) {
        return NextResponse.json({ message: "article not found"}, {status : 404})
    }
    return NextResponse.json(article,{status:200})
}

/**
 * 
 * @method PUT 
 * @route ~/api/articles/:id
 * @desc Update Article
 * @access public 
 */

export async function PUT(request:NextRequest,{params}:Props){
    const article = articles.find( a => a.id === parseInt(params.id));

    if(!article) {
        return NextResponse.json({ message: "article not found"}, {status : 404})
    }

    const body = (await request.json()) as UpdateArticleDteo;
    return NextResponse.json({ message : 'article update'},{status:200})
}

/**
 * 
 * @method DELETE 
 * @route ~/api/articles/:id
 * @desc Delete Article
 * @access public 
 */

export async function DELETE(request:NextRequest,{params}:Props){
    const article = articles.find( a => a.id === parseInt(params.id));

    if(!article) {
        return NextResponse.json({ message: "article not found"}, {status : 404})
    }

    const body = (await request.json()) as UpdateArticleDteo;
    return NextResponse.json({ message : 'Delete article'},{status:200})
}

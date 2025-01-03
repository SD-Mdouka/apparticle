// get count articles page

import { DOMAIN } from "@/util/Constant";
import { Comment } from "@prisma/client";

export async function getAllComments(token:string):Promise<Comment[]> {
    const response = await fetch(`${DOMAIN}/api/comments/`,{
        headers:{
            Cookie:`jwtToken=${token}`
        }
    });
    if(!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    return  await response.json();
} 
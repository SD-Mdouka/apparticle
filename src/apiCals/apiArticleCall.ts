import { DOMAIN } from "@/util/Constant";
import { SingleArticle } from "@/util/type";
import { Article } from "@prisma/client";

//get Article by number page
export async function getArticles(pageNumber:String | undefined):Promise<Article[]> {
  const response = await fetch(`${DOMAIN}/api/articles?pageNumber=${pageNumber}` , {
    cache:"no-store"
  });

  if(!response.ok){
    throw new Error('Failed to fetch article')
}
return response.json();
}
// get count articles page

export async function getArticlesCount():Promise<number> {
  const response = await fetch(`${DOMAIN}/api/articles/count` , {
    cache:"no-store"
  });

  if(!response.ok){
    throw new Error('Failed to fetch article')
}
const {count} = await response.json() as { count:number};
return count;
} 
//get Article by number page
export async function getArticlesBasedOnSearch(searchText:String):Promise<Article[]> {
  const response = await fetch(`${DOMAIN}/api/articles/search?searchText=${searchText}`);

  if(!response.ok){
    throw new Error('Failed to fetch article')
}
return response.json();
}
//get Single Article
export async function getSingleArticle(articleId:String):Promise<SingleArticle> {
  const response = await fetch(`${DOMAIN}/api/articles/${articleId}` , {
    cache:"no-store"
  });

  if(!response.ok){
    throw new Error('Failed to fetch article')
}
return response.json();
}
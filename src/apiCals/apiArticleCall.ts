import { Article } from "@prisma/client";

//get Article by number page
export async function getArticles(pageNumber:String | undefined):Promise<Article[]> {
  const response = await fetch(`http://localhost:3000/api/articles?pageNumber=${pageNumber}`);

  if(!response.ok){
    throw new Error('Failed to fetch article')
}
return response.json();
}
// get count articles page

export async function getArticlesCount():Promise<number> {
  const response = await fetch(`http://localhost:3000/api/articles/count`);

  if(!response.ok){
    throw new Error('Failed to fetch article')
}
const {count} = await response.json() as { count:number};
return count;
} 
//get Article by number page
export async function getArticlesBasedOnSearch(searchText:String):Promise<Article[]> {
  const response = await fetch(`http://localhost:3000/api/articles/search?searchText=${searchText}`);

  if(!response.ok){
    throw new Error('Failed to fetch article')
}
return response.json();
}

import { getArticles, getArticlesCount } from "@/apiCals/apiArticleCall";
import Pagination from "@/component/articles/Pagination";
import { ARTICLE_PER_PAGE } from "@/util/Constant";
import { verifyTokenForPage } from "@/util/verifyToken";
import { Article } from "@prisma/client";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteArticleButton from "./DeletArticleButton";

interface AdminArticlesPageProps {
  searchParams : { pageNumber : string}
}

const AdminArticlesTable = async ({ searchParams } : AdminArticlesPageProps) => {
 const cookie = await cookies();
    const token = cookie.get('jwtToken')?.value || "";
    if(!token) redirect('/');
  
    const payload = verifyTokenForPage(token);
    if(payload?.isAdmin === false) redirect('/');

    const { pageNumber } = searchParams;
     
      const articles:Article[] = await getArticles(pageNumber);
      const count:number = await getArticlesCount()
      const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="p-5">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Articles</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 border-gray-500 lg:text-xl">
          <tr>
            <th className="p-1 lg:p-2">Title</th>
            <th className="lg;inline-block">Created At</th>
            <th>Actions</th>
            <th className="hidden lg:inline-block"></th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr className="border-b border-t border-gray-300" key={article.id}>
              <td className="p-3 text-gray-700">{article.title}</td>
              <td className="hidden lg:inline-block text-gray-700 font-normal p-3">
                {new Date(article.createAt).toDateString()}
              </td>
              <td className="p-3">
                <Link
                className="bg-green-600 text-white rounded-lg py-1 px-2 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-800 transition"
                 href={`/admin/articles-table/edit/${article.id}`}>
                 Edit
                </Link>
                <DeleteArticleButton articleId={article.id}/>
              </td>
              <td className="hidden lg:inline-block p-3">
                <Link href={`/articles/${article.id}`}
                    className="text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-800">
                      Read More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pages={pages} pageNumber={parseInt(pageNumber)} route={"/admin/articles-table"}/>
    </section>
  )
}

export default AdminArticlesTable
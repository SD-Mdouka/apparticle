import { getArticlesBasedOnSearch } from "@/apiCals/apiArticleCall";
import ArticleItem from "@/component/articles/ArticleItem";
import { Article } from "@prisma/client";
import Link from "next/link";

interface SearchArticlePagePropce {
    searchParams: { searchText: string }
}

const SearchArticlePage = async ({ searchParams: { searchText } }: SearchArticlePagePropce) => {

    const articles: Article[] = await getArticlesBasedOnSearch(searchText);
    return (
        <section className="fix-height container m-auto px-5">
            {articles.length === 0 ? (<>
                <h1 className="text-gray-800 text-2xl font-bold p-5">
                Articles bases on
                <span className="font-bold ms-1 text-red-500 text-3xl mx-1">{searchText}</span>
                not found
            </h1>
            <Link
          className="text-2xl bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-110"
          href="/articles?pageNumber=1"
        >
          Return Article Page
        </Link>
            </>
                
        ) : (
        <h1 className="text-2xl font-bold mt-7 mb-2">
                Articles bases on
                <span className="font-bold ms-1 text-green-700 text-3xl">{searchText}</span>
                <div className="flex items-center justify-center flex-wrap gap-7">
                    {articles.map(item => (
                        <ArticleItem article={item} key={item.id} />
                    ))}
                </div>
                <div className='flex items-center justify-center m-3'>
                <Link
          className="text-2xl bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-110"
          href="/articles?pageNumber=1"
        >
          Return Article Page
        </Link>
                </div>
                
            </h1>)}

        </section>
    )
}

export default SearchArticlePage;
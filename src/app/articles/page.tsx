
import { getArticles, getArticlesCount } from '@/apiCals/apiArticleCall';
import ArticleItem from '@/component/articles/ArticleItem';
import Pagination from '@/component/articles/Pagination';
import SearchArticleInput from '@/component/articles/SearchArticleInput';
import { ARTICLE_PER_PAGE } from '@/util/Constant';
import { Article } from '@prisma/client';
import type { Metadata } from 'next';

interface ArticlesPageProps {
  searchParams : { pageNumber : string}
}

const ArticlesPage = async ({ searchParams } : ArticlesPageProps) => {
  const { pageNumber } = searchParams;
 
  const articles:Article[] = await getArticles(pageNumber);
  const count:number = await getArticlesCount()
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="container m-auto">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map(item => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination pages={pages} pageNumber={parseInt(pageNumber)} route={"/articles"}/>
      
    </section>
  )
}

export default ArticlesPage;

export const metadata: Metadata = {
  title: 'Articles Page',
  description: 'Articles about programming',
}
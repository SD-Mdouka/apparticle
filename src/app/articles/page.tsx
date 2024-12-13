
import ArticleItem from '@/component/articles/ArticleItem';
import Pagination from '@/component/articles/Pagination';
import SearchArticleInput from '@/component/articles/SearchArticleInput';
import type { Metadata } from 'next';


const ArticlesPage = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const articles:Article[] = await response.json();

  return (
    <section className="container m-auto px-5">
      <SearchArticleInput />
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.slice(0,6).map(item => (
          <ArticleItem article={item} key={item.id} />
        ))}
      </div>
      <Pagination />
    </section>
  )
}

export default ArticlesPage;

export const metadata: Metadata = {
  title: 'Articles Page',
  description: 'Articles about programming',
}
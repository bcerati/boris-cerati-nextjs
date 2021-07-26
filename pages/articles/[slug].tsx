import { findOneArticle } from '../../src/services/articleService';

import ArticleType from '../../src/types/Article';
import Post from '../../components/blog/article/Post';

interface IArticleProps {
  article: ArticleType;
  articleMarkdown?: string;
}

function Article({ article, articleMarkdown }: IArticleProps) {
  return <Post article={article} md={articleMarkdown} />;
}

export default Article;

export async function getServerSideProps({ query: { slug } }) {
  const article = await findOneArticle(slug, true);
  let articleMarkdown: string = null;

  const otherOpts: any = {};

  if (null === article) {
    otherOpts.notFound = true;
  } else {
    const data = await import(`../../data/blog/${article.content}`);
    articleMarkdown = data.default;
  }

  return { props: { article, articleMarkdown }, ...otherOpts };
}

import fs from 'fs/promises';
import path from 'path';

import type { Article } from '../types/Article';

export async function findAllArticles(): Promise<Article[]> {
  return import('../../data/blog/articles').then((m) => m.default);
}

export async function findPublishedArticles(): Promise<Article[]> {
  const articles = await findAllArticles();

  return articles.filter(function (article) {
    return true === article.published;
  });
}

export async function findOneArticle(
  slug: string,
  needToBePublished: boolean = true
): Promise<Article> {
  const articles = await findAllArticles();

  for (let article of articles) {
    if (slug === article.slug) {
      if (true === needToBePublished && true !== article.published) {
        continue;
      }

      return article;
    }
  }

  return null;
}

export async function fetchArticleContent(article: Article): Promise<Buffer> {
  return fs.readFile(
    path.join(__dirname, '../../', 'data', 'blog', article.content)
  );
}

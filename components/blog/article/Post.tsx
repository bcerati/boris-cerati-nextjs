import Image from 'next/image';
import MarkdownView from 'react-showdown';
import Prism from 'prismjs';
import { useEffect, useLayoutEffect } from 'react';

import Article from '../../../src/types/Article';

interface IPostProps {
  article: Article;
  md?: string;
}

function Post({ article, md }: IPostProps) {
  if (typeof document !== 'undefined') {
    useEffect(function () {
      Prism.highlightAll();
    }, []);
  }

  return (
    <>
      <article className="prose max-w-none flex flex-col shadow my-4">
        <div className="bg-white flex flex-col justify-start p-6">
          <span className="text-blue-700 text-sm font-bold uppercase pb-4">
            {article.tags.join(' ')}
          </span>
          <h1 className="text-3xl font-bold hover:text-gray-700">
            {article.title}
          </h1>
          <div className="text-sm font-black">
            By{' '}
            <a
              href="https://twitter.com/bobo_dev"
              className="font-black hover:text-gray-800"
            >
              Boris CERATI
            </a>
            , le {article.date}
          </div>

          <MarkdownView markdown={md} options={{ tables: true, emoji: true }} />
        </div>
      </article>
    </>
  );
}

export default Post;

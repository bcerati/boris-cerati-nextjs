import Image from 'next/image';
import Link from 'next/link';

import type Article from '../../../src/types/Article';

function Card({ article }: ICardProps) {

  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded my-4">
      <div className="p-5 border">

        <Link href={`/articles/${article.slug}`}>
          <a
            className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
            title={article.title}
          >
            {article.title}
          </a>
        </Link>

        <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
          <span className="text-gray-600">{article.date}</span>
        </p>

        <p className="mb-2 text-gray-700">{article.description}</p>

        <Link href={`/articles/${article.slug}`}>
          <a className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800">
            Lire la suite
          </a>
        </Link>
      </div>
    </div>
  );
}

interface ICardProps {
  article: Article;
}

export default Card;

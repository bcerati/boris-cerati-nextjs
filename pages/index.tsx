import Head from 'next/head';

import Card from '../components/blog/home/Card';

import { findPublishedArticles } from '../src/services/articleService';

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>Boris CERATI</title>
        <meta name="description" content="Boris CERATI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <h1 className="px-4 text-3xl font-bold hover:text-gray-700">Bienvenue sur mon blog</h1>
        </div>

        <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="sm:max-w-sm sm:mx-auto lg:max-w-full">
            {articles.map(function (article) {
              return <Card key={article.slug} article={article} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const articles = await findPublishedArticles();

  return {
    props: {
      articles,
    },
  };
}

import Link from 'next/link';

import { TwitterTimelineEmbed } from 'react-twitter-embed';

function MyTwitterFeed() {
  return (
    <div className="w-full bg-white shadow flex flex-col my-4 p-6">
      <p className="text-xl font-semibold pb-5">Twitter</p>

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="bobo_dev"
        options={{
          tweetLimit: '3',
        }}
        noHeader
        noBorders
        noFooter
      />
      {/* <Link href="https://twitter.com/bobo_dev?ref_src=twsrc%5Etfw">
        <a className="twitter-timeline" data-lang="fr" data-tweet-limit="3"></a>
      </Link> */}

      <Link href="https://twitter.com/bobo_dev">
        <a
          className="
          w-full
          bg-blue-800
          text-white
          font-bold
          text-sm
          uppercase
          rounded
          hover:bg-blue-700
          flex
          items-center
          justify-center
          px-2
          py-3
          mt-6
        "
        >
          <i className="fab fa-instagram mr-2"></i> Me suivre @bobo_dev
        </a>
      </Link>
    </div>
  );
}

export default MyTwitterFeed;

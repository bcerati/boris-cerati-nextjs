import Link from 'next/link';

function AboutMe() {
  return (
    <div className="w-full bg-white shadow flex flex-col my-4 p-6">
      <p className="text-xl font-semibold pb-5">Me connaître</p>
      <p className="pb-2">
        Boris, 32 ans, développeur Web PHP & JS. J'ai commencé le dev en
        utilisant principalement du PHP et j'ai découvert, il y a quelques
        années, le développement JS. J'aime particulièrement React, une
        technologie dont je suis tombé amoureux.
      </p>

      <Link href="/about">
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
              mt-4
            "
        >
          En savoir plus sur moi
        </a>
      </Link>
    </div>
  );
}

export default AboutMe;

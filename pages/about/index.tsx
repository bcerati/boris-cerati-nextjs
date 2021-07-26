import Image from 'next/image';

// @ts-ignore
import rukia from '../../public/images/rukia.jpg';

// @ts-ignore
import nala from '../../public/images/nala.jpg';

function AboutMe() {
  return (
    <>
      <div className="px-4 mb-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <h1 className="px-4 text-3xl font-bold hover:text-gray-700">
          À propos de moi
        </h1>
      </div>

      <section>
        <p className="mb-8">
          Voilà 8 ans que je suis développeur Web et que je crée des
          applications web. Je développe principalement en PHP et JavaScript, et
          j'aime ça ! J'ai toujours de nouvelles choses à apprendre, de
          nouvelles bonnes pratiques à mettre en oeuvre. Je travaille
          principalement en utilisant le framework Symfony. J'ai découvert il y
          a quelques années le JavaScript et j'adore ça ! Créer des applications
          à l'aide de React est un vrai plaisir !
        </p>

        <p className="mb-8">
          Je travaille depuis 2013 en tant que développeur, mais j'ai commencé
          quelques années avant par apprendre les bases du développement en
          apprenant le HTML, le C, le C++, le PHP, etc. J'adorais apprendre et
          créer de nouvelles choses. Mais en faire mon métier ? Non pas
          vraiment. La programmation était ma passion, je voulais la garder
          comme telle et ne pas en faire mon métier de tous les jours.
        </p>

        <p className="mb-8">
          C'est pour ça qu'à l'issue du baccalauréat, je me suis orienté en
          licence de Physique à l'université de Strasbourg. J'aurai adoré être
          enseignant-chercheur. J'avais mal anticipé que 9 ans d'études auraient
          été trop longs à supporter pour moi. Je me suis donc réorienté en
          seconde année de licence Mathématiques à l'université de Lorraine dans
          le but d'être enseignant en collège/lycée. Après qu'une réforme ait
          été faite pour fermer les IUFM, j'ai décidé d'arrêter et de faire de
          l'informatique mon métier.
        </p>

        <p className="mb-8">
          L'informatique, c'est bien, mais il n'y a pas que cette passion dans
          ma vie. J'aime aussi la lecture. J'apprécie de prendre un livre,
          mettre de la musique relaxante et me laisser emporter par l'histoire.
          J'aime également promener mes deux chiens en forêt et profiter du
          bruit et de l'odeur de la nature. J'aime aussi monter des légos,
          regarder Netflix et ne rien faire :)
        </p>

        <div className="mb-8">
          Pour finir voici des photos de mes adorables deux toutous :)
          <br />
          <div className="text-center mt-10">
            <div className="mx-5 inline-block">
              <Image
                src={nala}
                alt="Photo du chien Nala"
                width={620 / 2}
                height={1000 / 2}
              />
              <br />
              <i>Nala (Jack Russell terrier) née en 2017</i>
            </div>
            <div className="mx-5 inline-block">
              <Image
                src={rukia}
                alt="Photo du chien rukia"
                width={569 / 2}
                height={1000 / 2}
              />
              <br />
              <i>Rukia (Staffordshire bull terrier) née en 2020</i>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutMe;

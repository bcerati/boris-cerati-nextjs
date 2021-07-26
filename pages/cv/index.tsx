import Left from '../../components/timeline/Left';
import Right from '../../components/timeline/Right';

function CV() {
  return (
    <>
      <h1 className="text-3xl font-bold hover:text-gray-700">Mon parcours</h1>

      <div className="container mx-auto w-full h-full">
        <div className="relative wrap overflow-hidden p-10 h-full">
          <div
            className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border"
            style={{ left: '50%' }}
          ></div>

          <Right year={2016} title="Responsable technique - Adimeo">
            <p>
              J'ai intégré Adimeo en 2016 en tant que développeur PHP. Cette
              expérience a été très enrichissante. En travaillant sur des
              projets totalement différents les uns des autres, j'ai pu
              apprendre énormément de choses.
            </p>

            <p className="my-5">
              J'ai pu, par exemple, travailler mes compétences sur du Symfony
              4/5, React.js, Docker, Git, management d'équipe, etc...
            </p>
          </Right>

          <Left year={2013} title="Développeur - MaPS SA">
            <p>
              Après ma licence professionnelle, j'ai intégré MaPS SA en tant que
              stagiaire puis en tant que salarié. J'ai pu y développer mes
              compétences techniques dans le contexte professionnel.
            </p>

            <p className="my-5">
              Outre les compétences techniques (PHP, JS), j'ai eu l'occasion de
              faire beaucoup de relation client ce qui a été très enrichissant
              pour moi. En effet, mon travail consiste à satisfaire le client.
              Le voir, et avoir son feedback régulièrement, est très
              intéressant.
            </p>
          </Left>

          <Right year={2013} title="Licence Professionnelle">
            La suite logique à l'issue du DUT a été de faire une licence
            professionnelle. Je l'ai faite sur le thème de développement Web et
            du commerce électronique.
          </Right>

          <Left year={2012} title="DUT Informatique">
            J'ai intégré le DUT en Année Spéciale (DUT sur un an) afin de faire
            de courtes études pour ensuite aller rapidement sur le marché du
            travail. Le développement Web était déjà une de mes passions puisque
            j'en faisais en dehors des cours depuis l'âge de 15 ans.{' '}
          </Left>

          <Right year={2011} title="DEUG Mathématiques">
            Après mon bac, j'ai fait deux années de licence Mathématiques dans
            le but d'être enseignant en collège ou lycée. Malgré de bons
            résultats, je ne voulais pas faire un master pour ensuite enseigner
            au collège. Je me suis donc réorienté en DUT informatique.
          </Right>

          <Left year={2010} title="Baccalauréat Scientifique">
            J'ai obtenu mon baccalauréat Scientifique option Physique-Chimie en
            2010 au lycée Condorcet à Schoeneck.
          </Left>
        </div>
      </div>
    </>
  );
}

export default CV;

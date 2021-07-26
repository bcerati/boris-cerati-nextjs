Lorsque nous développons nos applications ou nos composants React, nous mettons en place des effets de bords qui peuvent causer des erreurs et lever des exceptions. Rien de plus normal en soit.

Ce qui est problématique, et ça nous arrive régulièrement, c'est de ne pas gérer ses erreurs. Et savez-vous ce qui se passe quand on lève une exception en JS sans la catcher ? Ça fait planter le script ! Et dans notre cas précis, le script étant l'application, c'est l'application entière qui plante et nous arrivons ainsi sur un écran blanc avant une belle erreur dans la console :

![Écran blanc](/images/blog/articles/react-white-screen-of-death/white_screen.jpg?style=centerme)
_Résultat d'un plantage : le fameux White Screen_

Dans cet article, je vais vous montrer l'origine du problème, et comment le résoudre.

Il faut cependant garder une chose à l'esprit, la gestion d'erreurs dans vos composants à l'aide d'erreur boundaries, ne fonctionne qu'avec les "class components". Mais pas d'inquiétude, nous verrons une autre solution d'intégration d'error boundaries dans des composants fonctionnels.

Dans chaque partie de cet article, je vous donnerai du code qui vous pourrez exécuter simplement :

- décompressez l'archive et allez dans le répertoire créé ;
- servez l'application à l'aide de [serve](https://www.npmjs.com/package/serve).

En cas de besoin, je vous donnerez les commandes dans chaque partie de l'article.

## Démonstration du problème

### Récupération du code

Vous pouvez [télécharger le code de cette partie ici](/data/blog/react-white-screen-of-death/demo.zip). Voici quelques commandes qui pourraient vous être utiles : 

```sh
unzip demo.zip
cd demo
serve -s build
```

### Explication du code

Le code de cette démo est très simple, j'ai initialisé une application à l'aide de [CRA](https://fr.reactjs.org/docs/create-a-new-react-app.html#create-react-app). J'ai ensuite ajouté quelques fichiers : 

**>> src/App.js**

```js
import UserList from "./components/UserList";

function App() {
  return (
    <div>
      <h1>Welcome on the App</h1>

      <UserList />
    </div>
  );
}

export default App;
```

Rien de particulier : un titre ainsi qu'un composant qui rendra une liste d'utilisateurs.

**>> src/components/UserList.js**

```js
import User from './User.js';

const users = [
  {
    id: 1,
    name: 'Boris',
    age: 32,
  },

  {
    id: 2,
    name: 'John',
    age: 28,
  },

  {
    id: 3,
    name: 'Marie',
    age: 29,
  },
];

export default function UserList() {
  return (
    <ul>
      {Object.values(users).map(function ({ id, ...userProps }) {
        return <User key={`user-${id}`} {...userProps} />;
      })}
    </ul>
  );
}
```

Dans ce composant, nous définissions de manière statique une liste d'utilisateurs que nous parcourons et affichons à l'aide d'un composant `User`.

**>> src/components/User.js**

```js
export default function User({ name, age }) {
  if (parseInt(Math.random() * 10) % 2 === 0) {
    throw new Error('Oups!');
  }

  return <li>{`${name} is ${age}`}</li>;
}
```

Dans ce dernier composant, deux choses :

- nous affichons les informations de l'utilisateur envoyé dans les props ;
- nous levons une exception de manière aléatoire pour simuler une erreur inattendue.

Si vous servez cette application et l'affichez sur votre navigateur, vous allez voir alternativement une application fonctionnelle :

![Application fonctionnelle](/images/blog/articles/react-white-screen-of-death/appli_ok.png?style=centerme)
_Application fonctionnelle_

ou une application buguée :

![Application buguée](/images/blog/articles/react-white-screen-of-death/appli_ko.png?style=centerme)
_Application buguée_

Comme vous le voyez, lorsqu'une exception est levée, c'est toute l'application qui plante. Par exemple, lors du plantage, vous ne parvenez plus à voir le `h1` qui est à l'intérieur du composant `App`. Alors même que le composant `App` n'a pas planté (c'est un de ses composants enfant qui est en erreur).

Dans ce cas, ce que nous aimerions, c'est continuer à voir toute notre application et afficher un fallback à la place du composant en erreur.

Quel est notre composant qui pose le soucis ici ? C'est le composant `User`. Notre composant de gestion d'erreur sera `UserList`. Ainsi, si un `User` plante, c'est tout le `UserList` qui affichera une fallback. Rendez-vous dans la dernière partie de l'article pour comprendre où placer notre gestion d'erreur.

## La solution : catcher les erreurs

Comment pourrions-nous faire pour que ce ne soit pas toute l'application qui soit en erreur, mais uniquement la partie concernée ? En catchant l'erreur !

Je suis sûr que vous le faîte déjà de manière générale ! Que ce soit en JavaScript, PHP, Python, etc... Vous avez l'habitude de gérer vos exceptions à l'aide de try...catch. Eh bien, React vous donne la possibilité de le faire à l'aide d'une fonctionnalité qu'on appelle les [errors boundaries](https://reactjs.org/docs/error-boundaries.html#gatsby-focus-wrapper). N'hésitez pas à aller faire un tour sur la documentation officielle pour comprendre en détail leur fonctionnement.

Comme je vous le disais plus tôt, les error boundaries ne fonctionnent qu'avec des "class components". React n'est pas en mesure de gérer vos exceptions dans des composants fonctionnels.

Un composant devient un error boundary quand il implémente soit la méthode statique `getDerivedStateFromError` ou la méthode `componentDidCatch` :

- `getDerivedStateFromError` : cette méthode devra retourner la partie du state à merger dans le state du composant lorsqu'une erreur intervient ;
- `componentDidCatch` : cette méthode est généralement utilisée pour gérer les effets de bord liés à une erreur (log des erreurs par exemple).

Vous pouvez, bien sûr, gérer votre state dans la méthode `componentDidCatch` en utilisant `setState`, mais je pense qu'il est intéressant de séparer la gestion du state des potentiels effets de bord que vous pourriez introduire. Et puis la méthode `getDerivedStateFromError` est là pour ça !

Notez bien ce qui est indiqué sur la documentation : toutes les erreurs ne peuvent pas être catchées par les error boundaries. Ces erreurs ne le seront pas :

- celles levées dans les gestionnaires d’événements ;
- celles levées dans le code asynchrone (comme le setTimeout)
- celles levées dans les rendus coté serveur ;
- celles levées dans le composant qui est lui-même l'error boundary.

Voyons comment en créer un justement !

### À l'aide d'une classe

Vous pouvez [télécharger le code de cette partie ici](/data/blog/react-white-screen-of-death/error-boundary-class.zip). Comme tout à l'heure, voici quelques commandes qui pourraient vous être utiles :

```sh
unzip error-boundary-class.zip
cd error-boundary-class
serve -s build
```

Dans cette nouvelle partie du code, le seul composant qui a changé est le composant `UserList`. J'y ai ajouté les deux méthodes `getDerivedStateFromError` et `componentDidCatch`. C'est ce qui définis ce composant comme étant un error boundary.


**>> src/components/UserList.js**

```js
/*
  ...
*/
export default class UserList extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <strong>
          Oups, an error occured!{" "}
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </strong>
      );
    }

    return (
      <ul>
        {Object.values(users).map(function ({ id, ...userProps }) {
          return <User key={`user-${id}`} {...userProps} />;
        })}
      </ul>
    );
  }
}
```

Comment ça marche ? Lorsqu'une exception est catchée, ces deux méthodes sont appelées. Avec une différence cependant : `getDerivedStateFromError` est appelée pendant la phase de rendu. Les effets de bord sont donc, à ce moment-là, interdits. Si vous avez besoin d'introduire des effets de bord, utilisez la méthode `componentDidCatch`.

Dans le code ci-dessus, lorsqu'une erreur est interceptée par l'error boundary, je définis une entrée dans le state pour l'indiquer et ainsi afficher un message d'erreur avec un bouton pour tenter à nouveau l'action qui a échoué. Les deux méthodes reçoivent en premier paramètre l'erreur interceptée, de telle sorte à ce que vous puissiez vous en servir en cas de besoin. `componentDidCatch`, quant à elle, reçoit aussi des informations supplémentaires comme par exemple la stack trace de l'erreur (pratique pour la logguer par exemple).

### Dans les composants fonctionnels

Comme je le disais plus tôt, seules les "class component" sont en mesure de définir les méthodes `getDerivedStateFromError` et `componentDidCatch`. Les composants fonctionnels ne peuvent pas être transformés en error boundary. C'est un fait : vous voulez créer un error boundary ? Créez une classe, you don't have a choice !

Comment faire si, depuis la création des hooks, vous refusez de créer vos composants avec des classes ? Pas moyen de vous faire changer d'avis, plus jamais des classes !

![Never Ever](/images/blog/articles/react-white-screen-of-death/never_ever.jpg?style=centerme)
_Répète après moi : "Je ne ferai plus de class component"_

Pour palier ce souci, et rendre notre gestion d'erreur plus facilement réutilisable, vous pouvez utiliser une librairie React : [react-error-boundary](https://www.npmjs.com/package/react-error-boundary). Elle se chargera de créer la classe pour vous et mettra à votre disposition une API d'utilisation plutôt sympa et pratique. N'hésitez pas à lire sa documentation. Cette librairie vous permettra par exemple :

- de définir une composant de fallback en cas d'erreur ;
- d'avoir un handler d'erreur (pour loguer votre erreur par exemple)
- de pouvoir reset le state interne de l'error boundary pour proposer un "try again" à vos utilisateurs.

## Où placer notre gestion d'erreurs ?

Il nous reste un dernier point à voir. Regarder notre `UserList`. Il parcourt une liste d'utilisateurs et pour chacun d'eux, render un composant `User`. C'est ce composant qui va, de temps en temps, planter. Dans l'état actuel du code, si l'un seulement des trois `User` plante, c'est tout le composant `UserList` qui est remplacé par le fallback d'erreur. Pas très pratique non ?

Je vous rappelle que l'error boundary ne peut pas être le composant `User` lui-même puisqu'ils ne sont pas capables de catcher leurs propres erreurs. La solution serait d'avoir un code qui ressemblerait à ceci (pour `UserList`) :

```js
render() {
  return (
    <ul>
      {Object.values(users).map(function ({ id, ...userProps }) {
        return (
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {/*do something*/}}
            resetKeys={[partOfState]}
          >
            <User key={`user-${id}`} {...userProps} />
          </ErrorBoundary>
        );
      })}
    </ul>
  );
}
```

Dans ce code, j'utiliserais donc `react-error-boundary` pour encadrer uniquement les composants qui seraient capables de déclencher des erreurs.

C'est à vous de voir où doit se situer votre gestion d'erreur. Je vous conseille d'en mettre à plusieurs endroits dans votre code là où des erreurs sont susceptibles d'être levées.

Vous pouvez mettre une gestion d'erreur en haut de votre arbre de composants. Pour afficher un message d'erreur si une exception n'est jamais catchée. Ça empêchera une page blanche et à la place, vous pourriez mettre un bouton pour rafraîchir votre application. Avec cette solution, nous ne sommes pas au top pour l'expérience utilisateur, mais c'est toujours mieux qu'une page blanche. Et puis si vous intégrer vos error boundaries aux bons endroits, aucune exception n'arrivera jusqu'à `App`.
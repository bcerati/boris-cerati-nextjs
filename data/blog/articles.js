export default [
  {
    title: 'Rétrospective 2021, une année difficile. Objectifs 2022',
    date: '26 Décembre 2021',
    description: `2021 arrive à sa fin. Ce n'est pas l'année pour laquelle j'ai le plus brillé professionnellement.  Cette année m'a forcé à prendre du recul sur 
    ce que je fais et ce que je souhaite faire dans les années à venir. Même si cette année à été le témoin de beaucoup d'échecs, je pense qu'elle a été charnière 
    pour ma carrière.`,
    slug: 'retrospective-2021',
    content: 'retrospective-2021/index.md',
    tags: ['#2021', '#2022'],
    published: true,
  },

  {
    title: 'Mon environnement de travail',
    date: '20 Septembre 2021',
    description: `Voilà 8 mois que je travaille de chez moi entre 4 jours et 5 jours par semaine. Beaucoup de choses ont changé depuis le début de la pandémie de 
    Covid-19. Y compris ma manière de travailler. Dans cet article, je vais vous montrer comment mon environnement de travail a changé ces 
    derniers mois.`,
    slug: 'working-environment',
    content: 'working-environment/index.md',
    tags: ['#remote', '#working-environment', '#productivity'],
    published: false,
  },

  // {
  //   title: 'Les outils de développement avec Google Chrome',
  //   date: '22 Février 2021',
  //   description: `Que ferait-on sans les outils de développement intégrés à nos browsers favoris. Que ce soit sur Google Chrome, Firefox, Edge, Safari
  //   ou même anciennement Internet Explorer ces outils nous aident au quotidien pour développer, debugger, optimiser nos applications. Mais savez-vous
  //   vraiment le potentiel des outils de développement intégrés dans Google Chrome ? Voyons cela !`,
  //   slug: 'chrome-dev-tools',
  //   content: 'chrome-dev-tools/index.md',
  //   tags: ['#chrome', '#dev-tools', '#debug'],
  //   published: false,
  // },

  {
    title: 'React White screen of death : comment empêcher son UI de planter',
    date: '17 Mars 2021',
    description: `Vous connaissez le fameux blue screen of death de Windows ? En utilisant React, avez-vous déjà eu un écran blanc à la suite d'une erreur 
    JavaScript ? Regardons ensemble pourquoi !`,
    slug: 'react-white-screen-of-death',
    content: 'react-white-screen-of-death/index.md',
    tags: ['#react', '#error', '#error-boundaries'],
    published: true,
  },

  {
    title: 'Les cookies HttpOnly, une sécurité pour vos tokens ?',
    date: '26 Juillet 2020',
    description: `Nous stockons régulièrement des tokens dans le LocalStorage ou les cookies. Voyons ensembles les erreurs 
    à ne pas commettre lorsque ces données sont du côté du frontend`,
    slug: 'http-only-xss-attacks',
    content: 'http-only-xss-attacks/index.md',
    tags: ['#xss', '#httpOnly', '#cookie', '#localStorage'],
    published: true,
  },

  {
    title: 'Le télétravail en confinement ? Et après ?',
    date: '29 Juin 2020',
    description: `Le 13 mars 2020 la France a été placée en confinement pour éviter la propagation de la COVID-19. Trois mois plus tard, voyons dans cet 
    article comment j'ai vécu cette période particulière et ce que ça m'a apporté.`,
    slug: 'remote-working-covid',
    content: 'remote-working-covid/index.md',
    tags: ['#remote', '#teletravail'],
    published: true,
  },

  {
    title: 'Gestion de son state React',
    date: '22 Avril 2020',
    description: `Il existe plusieurs solutions quand il s'agit de gérer le state de son application React : hooks, Redux, contextes, etc...  
    Là où Redux peut être complexe pour de petites applications, un state local peut vite devenir compliqué. Voyons cela !`,
    slug: 'managing-react-state',
    content: 'managing-react-state/index.md',
    tags: ['#react', '#redux'],
    published: true,
  },
];

// Generate sitemap at https://www.xml-sitemaps.com/

export default [
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

const routes = {
    home: '/',
    profile: '/profile/:email',
    setting: '/profile/setting',
    login: '/login/:page',
    loginbackhome: '/login',
    signup: '/signup/:page',
    verification: '/verification/:success/:message',
    dictionary: '/dictionary',
    listening: '/listening',
    listeningslug: '/listening/:slug',
    reading: '/reading',
    readingslug: '/reading/:slug',
    testing: '/testing',
    testingslug: '/testing/:slug',
    test: '/testing/:slug/:email',
    game: '/game',
    gameslug: '/game/:slug',
};

export default routes;

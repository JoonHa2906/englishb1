import config from '~/config';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Setting from '~/pages/Profile/Setting';
import Login from '~/pages/Login';
import SignUp from '~/pages/SignUp';
import Verification from '~/pages/Verification';
import Dictionary from '~/pages/Dictionary';
import Listening from '~/pages/Listening';
import ListeningSlug from '~/pages/ListeningSlug';
import Reading from '~/pages/Reading';
import ReadingSlug from '~/pages/ReadingSlug';
import Game from '~/pages/Game';
import GameSlug from '~/pages/Game/GameSlug';
import Testing from '~/pages/Testing';
import LoginBackHome from '~/pages/Login/LoginBackHome';
import TestingSlug from '~/pages/TestingSlug';
import Test from '~/pages/TestingSlug/Test';

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: 'default' },
    { path: config.routes.profile, component: Profile, layout: 'profile' },
    { path: config.routes.setting, component: Setting, layout: 'profile' },
    { path: config.routes.login, component: Login, layout: 'login' },
    { path: config.routes.signup, component: SignUp, layout: 'login' },
    { path: config.routes.loginbackhome, component: LoginBackHome, layout: 'empty' },
    { path: config.routes.verification, component: Verification, layout: 'empty' },
    { path: config.routes.dictionary, component: Dictionary, layout: 'default' },
    { path: config.routes.listening, component: Listening, layout: 'default' },
    { path: config.routes.listeningslug, component: ListeningSlug, layout: 'layout-slug' },
    { path: config.routes.reading, component: Reading, layout: 'default' },
    { path: config.routes.readingslug, component: ReadingSlug, layout: 'layout-slug' },
    { path: config.routes.testingslug, component: TestingSlug, layout: 'default' },
    { path: config.routes.testing, component: Testing, layout: 'default' },
    { path: config.routes.test, component: Test, layout: 'layout-slug' },
    { path: config.routes.game, component: Game, layout: 'default' },
    { path: config.routes.gameslug, component: GameSlug, layout: 'layout-slug' },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };

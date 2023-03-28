import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';
import LayoutNoSidebar from './components/Layout/LayoutNoSidebar';
import Login from './components/Layout/Login';
import Empty from './components/Layout/Empty';
import LayoutSlug from './components/Layout/LayoutSlug';
import Profile from './components/Layout/Profile';
function App() {
   return (
      <Router>
         <Routes>
            {publicRoutes.map((route, index) => {
               let Layout;
               switch (route.layout) {
                  case null:
                     Layout = Fragment;
                     break;
                  case 'no-sidebar':
                     Layout = LayoutNoSidebar;
                     break;
                  case 'layout-slug':
                     Layout = LayoutSlug;
                     break;
                  case 'profile':
                     Layout = Profile;
                     break;
                  case 'login':
                     Layout = Login;
                     break;
                  case 'empty':
                     Layout = Empty;
                     break;
                  default:
                     Layout = DefaultLayout;
               }

               const Page = route.component;
               return (
                  <Route
                     key={index}
                     path={route.path}
                     element={
                        <Layout>
                           <Page />
                        </Layout>
                     }
                  />
               );
            })}
         </Routes>
      </Router>
   );
}

export default App;

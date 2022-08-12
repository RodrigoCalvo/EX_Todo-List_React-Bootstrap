import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/layout';

function App() {
  const HomePage = React.lazy(() => import('../pages/home'));
  const TodoPage = React.lazy(() => import('../pages/todo'));
  const AboutPage = React.lazy(() => import('../pages/about'));
  const routes = [
    { path: '', label: 'Home', page: <HomePage></HomePage> },
    { path: '/todo', label: 'Home', page: <TodoPage></TodoPage> },
    { path: '/about', label: 'Home', page: <AboutPage></AboutPage> },
    { path: '*', label: '', page: <Navigate replace to=""></Navigate> },
  ];
  const menuOptions = [...routes];
  menuOptions.length = routes.length - 1; //eliminar default
  return (
    <Layout>
      <React.Suspense>
        <Routes>
          {routes.map((item) => (
            <Route
              key={item.label}
              path={item.path}
              element={item.page}
            ></Route>
          ))}
        </Routes>
      </React.Suspense>
    </Layout>
  );
}

export default App;

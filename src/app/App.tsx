import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/layout';

const HomePage = React.lazy(() => import('../pages/home'));
const TodoPage = React.lazy(() => import('../pages/todo'));
const AboutPage = React.lazy(() => import('../pages/about'));
export const routes = [
  { path: '', label: 'Home', page: <HomePage></HomePage> },
  { path: '/todo', label: 'ToDo', page: <TodoPage></TodoPage> },
  { path: '/about', label: 'About', page: <AboutPage></AboutPage> },
  { path: '*', label: '', page: <Navigate replace to=""></Navigate> },
];

function App() {
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

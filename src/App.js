import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import RootPage from './components/routes/webroot/index'
import AdminPage from './components/routes/admin/index'
import NotFound from './components/routes/error/NotFound';
import Login from './components/routes/auth/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      errorElement: <NotFound />
    },
    {
      path: "/admin",
      element: <AdminPage />
    },
    {
      path: "/admin/login",
      element: <Login />
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;

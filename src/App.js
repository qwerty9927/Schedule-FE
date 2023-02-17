import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from "react-toastify"
import './App.css';
import RootPage from './components/routes/webroot/index'
import Dashboard from './components/routes/admin/Dashboard'
import NotFound_2 from './components/routes/error/NotFound_2'
import Login from './components/routes/auth/Login'
import RequireAuth from './components/utils/RequireAuth'
import SubjectRegister from "./components/routes/webroot/views/SubjectRegister"
import Home from "./components/routes/webroot/views/home/Home"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/SubjectRegister",
          element: <SubjectRegister />
        }
      ],
      errorElement: <NotFound_2 />
    },
    {
      path: "/dashboard",
      element: 
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
    },
    {
      path: "/dashboard/login",
      element: <Login />
    }
  ])
  return (
    <>
      <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="dark"
          />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

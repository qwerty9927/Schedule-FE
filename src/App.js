import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import RootPage from './layouts/Layout'
import Dashboard from './pages/adminScreen/Dashboard'
import Notfound2 from './pages/error/Notfound2'
import Login from './pages/auth/Login'
import { RequireAuth } from './features/authentication/index'
import SubjectRegister from "./pages/userScreen/SubjectRegister"
import Home from "./pages/userScreen/Home"
import Schedule from './pages/userScreen/Schedule';
import NavigateProvider from './context/NavigateProvider';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: 
        <NavigateProvider>
          <RootPage />
        </NavigateProvider>,
      errorElement: <Notfound2 />
    }
    // ,
    // {
    //   path: "/dashboard",
    //   element: 
    //     <RequireAuth>
    //       <Dashboard />
    //     </RequireAuth>
    // },
    // {
    //   path: "/dashboard/login",
    //   element: <Login />
    // }
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

// function App() {
//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={2500}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss={false}
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
//       <SubjectRegister />
//     </>
//   )
// }
export default App;

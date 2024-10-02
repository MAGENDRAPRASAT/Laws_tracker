import {
    createBrowserRouter
  } from "react-router-dom";
import Login from "../law_admin/pages/auth/login";
import Home from "../law_app/Pages/Home/home";
import Admin from "../law_admin/pages/app_container/admin";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      children: [
        // {
        //   path: "team",
        //   element: <Team />,
        //   loader: teamLoader,
        // },
      ],

    },
    {
        path: "/admin",
        element: <Admin />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <Home/>
    }
  ]);
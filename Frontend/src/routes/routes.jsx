import {
    createBrowserRouter
  } from "react-router-dom";
import Login from "../law_admin/pages/auth/login";
import Home from "../law_app/Pages/Home/home";

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
        path: "/login",
        element: <Login/>,
    }
  ]);
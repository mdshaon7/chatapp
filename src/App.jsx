import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router";
import home from './page/home';
import about from './page/about';
import signup from './page/signup';
import signin from './page/signin';
import ViewProfile from './assets/home/ViewProfile'
import Setting from './assets/home/Setting';
import Logeout from './assets/home/Logeout';
import rootlayout from './layout/Rootlayout';
import Message from './assets/home/Messae';

const App = () => {
  let routar = createBrowserRouter([
    {
      path: "/",
      Component: rootlayout,
      children: [
        { index: true, Component: home },
        { path: "about", Component: about },
        { path: "/message", Component: Message,},

      ],
    },
    {
      path: "/signup",
      Component: signup,


    },
    {
      path: "/signin",
      Component: signin,


    },
    {
      path: "/profile",
      Component: ViewProfile,


    },
    {
      path: "/settings",
      Component: Setting,


    },
    {
      path: "/Logout",
      Component: Logeout,


    },

  ]);

  return (
    <RouterProvider router={routar} />
  )
};

export default App

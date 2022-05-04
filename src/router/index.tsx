import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
// const Root = lazy(() => import("@@components/LayoutTemp"));
// const OverView = lazy(() => import("@@views/Overview/index"));
const Home = lazy(() => import("@@views/Home/index"));
const Error = lazy(() => import("@@views/error"));

const routes: RouteObject[] = [
  {
    path: "/views/",
    // exact: true,
    element: <Home />
  },
  {
    path: "/views/home",
    element: <Home />
  },
  // {
  //     path: '/signin',
  //     element: <Signin/>,
  //     requiresAuth: false,
  // },
  // {
  //     path: "/users",
  //     element: <Users/>,
  // },
  {
    // path: '/error',
    // name: '404',
    path: "*",
    element: <Error />
  }
];

export default routes;

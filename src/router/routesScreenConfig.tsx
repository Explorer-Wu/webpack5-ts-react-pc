import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
// const RootScreen = lazy(() => import("@@components/Visualscreen/LayoutScreen.js"));
const DashBoard = lazy(() => import("@@views/Overview/index"));
const MapBoard = lazy(() => import("@@views/Overview/mapboard"));
const Error = lazy(() => import("@@views/error"));

const screenRoutes: RouteObject[] = [
  {
    path: "/screenfull",
    // exact: true,
    element: <DashBoard/>,
  },
  {
    path: '/screenfull/mapview',
    element: <MapBoard/>,
  },
  {
    path: "*",
    element: <Error/>,
  },
];

export default screenRoutes;

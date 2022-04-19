import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
// const Root = lazy(() => import("@@components/LayoutTemp"));
// const OverView = lazy(() => import("@@views/Overview/index"));
const Home = lazy(() => import("@@views/Home/index"));
const EchartsCom = lazy(() => import("@@views/charts/index"));
const EchartsD2 = lazy(() => import("@@views/charts/echartsd2"));
const EchartsD3 = lazy(() => import("@@views/charts/echartsd3"));
const FormsCom = lazy(() => import("@@views/forms"));
const Tables = lazy(() => import("@@views/tables/index"));
const Pictures = lazy(() => import("@@views/pictures"));
const DndPage = lazy(() => import("@@views/dndpage"));
const DesignModes = lazy(() => import("@@views/designmodes/index"));
const Singleton = lazy(() => import("@@views/designmodes/singleton"));
const Strategy = lazy(() => import("@@views/designmodes/strategy"));
const Proxymode = lazy(() => import("@@views/designmodes/proxymode"));
const Pubsubscribe = lazy(() => import("@@views/designmodes/pubsubscribe"));
const Adaptermode = lazy(() => import("@@views/designmodes/adaptermode"));
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
    path: "/views/charts",
    element: <EchartsCom/>,
    children: [
      {
        index: true,
        element: <EchartsD2/>,
      },
      {
        path: "/views/charts/d3charts",
        element: <EchartsD3/>,
      },
    ],
  },
  {
    path: "/views/designmodes",
    element: <DesignModes/>,
    children: [
      { 
        index: true,
        element: <Singleton/>,
      },
      {
        path: "/views/designmodes/strategy",
        element: <Strategy/>,
        // children: [
        //   { index: true, element: <CoursesIndex /> },
        //   { path: "/courses/:id", element: <Course /> },
        // ],
      },
      {
        path: "/views/designmodes/proxymode",
        element: <Proxymode/>,
      },
      {
        path: "/views/designmodes/pubsubscribe",
        element: <Pubsubscribe/>,
      },
      {
        path: "/views/designmodes/adaptermode",
        element: <Adaptermode/>,
      },
    ],
  },
  {
    path: "/views/forms",
    element: <FormsCom/>,
  },
  {
    path: "/views/tables",
    element: <Tables/>,
  },
  {
    path: "/views/pictures",
    element: <Pictures/>,
  },
  {
    path: "/views/dndpage",
    element: <DndPage/>,
  },
  {
    // path: '/error',
    // name: '404',
    path: "*",
    element: <Error />,
  },
];

export default routes;

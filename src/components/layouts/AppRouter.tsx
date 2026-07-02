import { Suspense } from "react";
import { useRoutes } from "react-router-dom";

import Loading from "./Loading";
import ErrorBoundary from "./ErrorBoundary";
import RootLayout from "./AppClientLayout";
import { flatRoutes } from "../../packages/configs/router.config";

const withWrapper = (Component: React.ComponentType) => (
  <ErrorBoundary>
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

export const AppRouter = () => {
  const routes = [
    {
      path: "/",
      element: <RootLayout />,
      children: flatRoutes.map((route) => ({
        path: route.fullPath === "/" ? "/" : route.fullPath.slice(1),
        element: withWrapper(route.element),
      })),
    },
  ];

  return useRoutes(routes);
};

export default AppRouter;

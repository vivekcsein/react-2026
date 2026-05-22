import { Pages } from "../../components/features";

/* =========================================================
   TYPES
   ========================================================= */

export type RouteConfig = {
  key: string;
  title: string;
  description: string;
  path: string;
  element: React.ComponentType;
  children?: readonly RouteConfig[];
};

export type RouteKey = (typeof routeConfig)[number]["key"];

export type AppRoute = Omit<RouteConfig, "children"> & {
  fullPath: string;
  children?: AppRoute[];
};

/* =========================================================
   CONFIG (READONLY ✅)
   ========================================================= */

export const routeConfig = [
  {
    // homepage
    key: "HOME",
    title: "Home",
    description: "Explore different features and mini apps",
    path: "/",
    element: Pages.HomePage,
  },
  {
    // auth system
    key: "AUTH",
    title: "Auth System",
    description: "Login & Signup forms with validation",
    path: "auth",
    element: Pages.AuthPage,
    children: [
      {
        key: "SIGNUP",
        title: "Signup",
        description: "Create a new account with email and password",
        path: "signup",
        element: Pages.Signup,
      },
      {
        key: "SIGNIN",
        title: "Signin",
        description: "Access your account with email and password",
        path: "signin",
        element: Pages.Signin,
      },
      {
        key: "FORGOT_PASSWORD",
        title: "Forget Password",
        description: "Forget password description",
        path: "forget-password",
        element: Pages.ForgetPassword,
      },
      {
        key: "RESET_PASSWORD",
        title: "Reset Password",
        description: "Reset Your Current Password",
        path: "reset-password",
        element: Pages.ResetPassword,
      },
      {
        key: "UPDATE_PROFILE",
        title: "Update Profile",
        description: "Update your profile",
        path: "update-profile",
        element: Pages.UpdateProfile,
      },
    ],
  },
  {
    // counter app
    key: "COUNTER-APP",
    title: "Counter App",
    description: "Simple counter with state management",
    path: "counter",
    element: Pages.CounterApp,
    children: [
      {
        key: "COUNTER-APP-REDUCER",
        title: "Counter App with Reducer Hook",
        description: "Counter app using useReducer",
        path: "counter-app-reducer", //  FIXED (no duplicate "counter/")
        element: Pages.CounterAppUsingReducerHook,
      },
      {
        key: "COUNTER-APP-USESTATE",
        title: "Counter App with useState Hook",
        description: "Counter app using useState",
        path: "counter-app-usestate", //  FIXED
        element: Pages.CounterAppUsingUseStateHook,
      },
    ],
  },
  {
    // todo app
    key: "TODO-APP",
    title: "Todo App",
    description: "Manage your tasks",
    path: "todo-app",
    element: Pages.TodoApp,
    children: [
      {
        key: "TODO-APP-LOCALSTORAGE",
        title: "Todo with Local Storage",
        description: "Persistent todo app",
        path: "with-local-storage", //  FIXED
        element: Pages.TodoAppUsingLocalStorage,
      },
      {
        key: "TODO-APP-WITHOUT-LOCALSTORAGE",
        title: "Todo without Local Storage",
        description: "Non-persistent todo app",
        path: "without-local-storage", // FIXED
        element: Pages.TodoAppWithoutLocalStorage,
      },
    ],
  },
  {
    // search
    key: "SEARCH",
    path: "search", // fixed typo
    title: "Search",
    description: "Search features",
    element: Pages.SearchPage,
    children: [
      {
        key: "SEARCH-USING-FILTER",
        title: "Search by filter",
        description: "A begginer level search using filter in a list",
        path: "search-using-filter",
        element: Pages.SearchUsingFilter,
      },
      {
        key: "SEARCH-WITH-DEBOUNCE",
        title: "Search Using Debounce technique",
        description: "Search using debounce and throtte technique to reduce api calls",
        path: "search-using-debounce",
        element: Pages.SearchUsingDebouncing,
      },
    ],
  },
  {
    // navigation
    key: "NAVIGATION",
    title: "Navigation",
    description: "Navigation features",
    path: "navigation",
    element: Pages.NavigationPage,
    children: [
      {
        key: "NAVIGATION-MODALS",
        title: "Navigation Modals",
        description: "Navigation modals",
        path: "navigation-modals",
        element: Pages.NavigationModalPage,
      },
      // {
      //   key: "NAVIGATION-NAVBAR",
      //   title: "Navbar",
      //   description: "Responsive Navbar",
      //   path: "navigation-bar",
      //   element: Pages.NavigationBar,
      // },
    ],
  },
  {
    // not found
    key: "NOT-FOUND",
    title: "Not Found",
    description: "",
    path: "*",
    element: Pages.NotFound,
  },
] as const satisfies readonly RouteConfig[];

/* =========================================================
   HELPERS
   ========================================================= */

const joinPath = (parent: string, child: string) =>
  `/${[parent, child].filter(Boolean).join("/")}`.replace(/\/+/g, "/");

/* =========================================================
   BUILD ROUTES (IMMUTABLE )
   ========================================================= */

export const buildRoutes = (routes: readonly RouteConfig[], parentPath = ""): AppRoute[] => {
  return routes.map((route) => {
    const fullPath = route.path === "/" ? "/" : joinPath(parentPath, route.path);

    return {
      key: route.key,
      title: route.title,
      description: route.description,
      path: route.path,
      element: route.element,
      fullPath,
      children: route.children ? buildRoutes(route.children, fullPath) : undefined,
    };
  });
};

/* =========================================================
   FLATTEN ROUTES
   ========================================================= */

export const flattenRoutes = (routes: AppRoute[]): AppRoute[] =>
  routes.flatMap((route) => [route, ...(route.children ? flattenRoutes(route.children) : [])]);

/* =========================================================
   FINAL EXPORTS
   ========================================================= */

export const appRoutes = buildRoutes(routeConfig);
export const flatRoutes = flattenRoutes(appRoutes);

export const getRouteByKey = (key: RouteKey): AppRoute => {
  const route = flatRoutes.find((r) => r.key === key);
  if (!route) throw new Error(`Route with key "${key}" not found`);
  return route;
};

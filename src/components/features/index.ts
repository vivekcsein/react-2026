import { lazy } from "react";

export const Pages = {
  // Main Pages
  HomePage: lazy(() => import("./home/HomePage")),
  RootLayout: lazy(() => import("../layouts/RootLayout")),
  NotFound: lazy(() => import("./home/NotFound")),
  Loading: lazy(() => import("../layouts/Loading")),

  // search
  SearchPage: lazy(() => import("./search/SearchPage")),
  SearchUsingFilter: lazy(() => import("./search/SearchUsingFilter")),
  SearchUsingDebouncing: lazy(() => import("./search/SearchUsingDebouncing")),

  // Auth Pages
  AuthPage: lazy(() => import("./auth/AuthPage")),
  Signin: lazy(() => import("./auth").then((module) => ({ default: module.Signin }))),
  Signup: lazy(() => import("./auth").then((module) => ({ default: module.Signup }))),
  ForgetPassword: lazy(() =>
    import("./auth").then((module) => ({ default: module.ForgetPassword })),
  ),
  ResetPassword: lazy(() => import("./auth").then((module) => ({ default: module.ResetPassword }))),
  UpdateProfile: lazy(() => import("./auth").then((module) => ({ default: module.UpdateProfile }))),

  // counter app
  CounterApp: lazy(() => import("./counter-app/CounterApp")),
  CounterAppUsingReducerHook: lazy(() => import("./counter-app/CounterAppUsingReducerHook")),
  CounterAppUsingUseStateHook: lazy(() => import("./counter-app/CounterAppUsingUseStateHook")),

  //debounced search
  //   SearchUsingDebounce: lazy(() => import("./features/debounced-search/SearchUsingDebounce")),

  // todo app
  TodoApp: lazy(() => import("./todo-app/TodoApp")),
  TodoAppUsingLocalStorage: lazy(() => import("./todo-app/TodoAppUsingLocalStorage")),
  TodoAppWithoutLocalStorage: lazy(() => import("./todo-app/TodoAppWithoutLocalStorage")),
};

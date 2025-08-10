import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("auth", [
    layout("routes/auth/layout.tsx", [route("login", "routes/auth/login.tsx")]),
  ]),
  ...prefix("employee", [
    layout("routes/employee/layout.tsx", [
      index("routes/employee/index.tsx"),
      route("profile", "routes/employee/profile.tsx"),
      route("history", "routes/employee/history.tsx"),
    ]),
  ]),
] satisfies RouteConfig;

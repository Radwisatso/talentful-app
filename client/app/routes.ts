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
] satisfies RouteConfig;

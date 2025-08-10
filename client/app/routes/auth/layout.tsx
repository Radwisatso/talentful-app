import { Outlet, redirect } from "react-router";
import { userContext } from "~/context";
import type { Route } from "./+types/layout";

//@ts-ignore
async function authMiddleware(_, next) {
  const accessToken = localStorage.getItem("accessToken");
  const userStr = localStorage.getItem("user") ?? null;
  const user = userStr ? JSON.parse(userStr) : null;
  if (accessToken && user) {
    throw redirect("/employee");
  }
  await next();
}

export const unstable_clientMiddleware: Route.unstable_ClientMiddlewareFunction[] =
  [authMiddleware];

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <Outlet />
    </div>
  );
}

import {
  NavLink,
  Outlet,
  redirect,
  useNavigate,
  type NavLinkRenderProps,
} from "react-router";
import Footer from "~/components/ui/Footer";
import Header from "~/components/ui/Header";
import { userContext } from "~/context";
import type { Route } from "./+types/layout";

//@ts-ignore
async function authMiddleware({ context }, next) {
  const accessToken = localStorage.getItem("accessToken");
  const userStr = localStorage.getItem("user") ?? null;
  const user = userStr ? JSON.parse(userStr) : null;
  if (accessToken && user) {
    context.set(userContext, { accessToken, user });
    await next();
  } else {
    throw redirect("/auth/login");
  }
}

export const unstable_clientMiddleware: Route.unstable_ClientMiddlewareFunction[] =
  [authMiddleware];

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
  const user = context.get(userContext);
  return user;
}

export default function EmployeeLayout({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const user = loaderData!.user;

  const getNavLinkClass = ({
    isActive,
    isPending,
    isTransitioning,
  }: NavLinkRenderProps) => {
    return [
      "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",
      isActive
        ? "border-blue-500 text-blue-600"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
      isPending ? "opacity-50" : "",
      isTransitioning ? "transition-colors duration-200" : "",
    ].join(" ");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header variant={user.role} user={user} onLogout={handleLogout} />

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <NavLink to="/employee" end className={getNavLinkClass}>
              Dashboard
            </NavLink>

            <NavLink to="/employee/history" className={getNavLinkClass}>
              History
            </NavLink>

            <NavLink to="/employee/profile" className={getNavLinkClass}>
              Profile
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Outlet />
        </div>
      </main>

      {/* Footer Component */}
      <Footer variant={user.role} />
    </div>
  );
}

import { NavLink, Outlet, redirect, useNavigate } from "react-router";
import Footer from "~/components/ui/Footer";
import Header from "~/components/ui/Header";
import { userContext } from "~/context";
import type { Route } from "./+types/layout";

//@ts-ignore
async function authMiddleware({ context }, next) {
  const accessToken = localStorage.getItem("accessToken");
  const userStr = localStorage.getItem("user") ?? null;
  const user = userStr ? JSON.parse(userStr) : null;
  console.log("Auth Middleware - Access Token:", accessToken);
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

export default function EmployeeLayout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  // Get user from localStorage
  const userStr = localStorage.getItem("user") ?? null;
  const user = userStr ? JSON.parse(userStr) : null;
  console.log("Mana dulu yang jalan");
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header variant={user.role} user={user} onLogout={handleLogout} />
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <NavLink
              to="/employee"
              className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/employee/attendance"
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            >
              Check In/Out
            </NavLink>
            <NavLink
              to="/employee/history"
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            >
              History
            </NavLink>
            <NavLink
              to="/employee/profile"
              className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            >
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

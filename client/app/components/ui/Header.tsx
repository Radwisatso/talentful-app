interface HeaderProps {
  variant?: "default" | "employee" | "admin";
  user?: {
    name: string;
    role?: string;
  };
  onLogout?: () => void;
}

export default function Header({
  variant = "default",
  user,
  onLogout,
}: HeaderProps) {
  const getBadgeInfo = () => {
    switch (variant) {
      case "employee":
        return {
          text: "Employee",
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
        };
      case "admin":
        return {
          text: "Admin",
          bgColor: "bg-purple-100",
          textColor: "text-purple-800",
        };
      default:
        return null;
    }
  };

  const badge = getBadgeInfo();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="ml-3 text-xl font-semibold text-gray-900">
              Dexa Attendance
            </h1>
            {badge && (
              <span
                className={`ml-3 text-sm ${badge.bgColor} ${badge.textColor} px-2 py-1 rounded-md`}
              >
                {badge.text}
              </span>
            )}
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="text-sm text-gray-700">
                Hello,{" "}
                <span className="font-medium text-gray-900">{user.name}</span>
              </div>
            )}
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-gray-500 hover:text-red-600 text-sm font-medium transition-colors duration-200"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

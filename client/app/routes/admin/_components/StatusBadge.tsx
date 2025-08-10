interface StatusBadgeProps {
  status: "ADMIN" | "EMPLOYEE" | string;
  className?: string;
}

export default function StatusBadge({
  status,
  className = "",
}: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

    switch (status) {
      case "ADMIN":
        return {
          classes: `${baseClasses} bg-blue-100 text-blue-800`,
          icon: (
            <svg
              className="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 8a6 6 0 01-7.743 5.743L10 14l-.257-.257A6 6 0 0118 8ZM2 8a6 6 0 1010.743 5.743L12 14l-.743-.257A6 6 0 012 8Zm8-2a2 2 0 100-4 2 2 0 000 4Z"
                clipRule="evenodd"
              />
            </svg>
          ),
        };
      case "EMPLOYEE":
        return {
          classes: `${baseClasses} bg-green-100 text-green-800`,
          icon: (
            <svg
              className="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          ),
        };

      default:
        return {
          classes: `${baseClasses} bg-gray-100 text-gray-800`,
          icon: (
            <svg
              className="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM4 10a6 6 0 1112 0 6 6 0 01-12 0z"
                clipRule="evenodd"
              />
            </svg>
          ),
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <span className={`${statusConfig.classes} ${className}`}>
      {statusConfig.icon}
      {status}
    </span>
  );
}

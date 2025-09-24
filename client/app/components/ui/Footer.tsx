interface FooterProps {
  variant?: "default" | "EMPLOYEE" | "ADMIN";
}

export default function Footer({ variant = "default" }: FooterProps) {
  const getFooterText = () => {
    switch (variant) {
      case "EMPLOYEE":
        return "© 2024 Talentful Attendance System - Employee Portal";
      case "ADMIN":
        return "© 2024 Talentful Attendance System - Admin Portal";
      default:
        return "© 2024 Talentful Attendance System";
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500">{getFooterText()}</p>
      </div>
    </footer>
  );
}

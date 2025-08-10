interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  const baseStyles = "bg-white rounded-lg shadow-md p-6";
  const cardClasses = `${baseStyles} ${className}`;

  return <div className={cardClasses}>{children}</div>;
}

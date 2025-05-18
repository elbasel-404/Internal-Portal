import type { ReactNode } from "react";
import "./index.css";

interface EnvironmentLayoutProps {
  children: ReactNode; // Fixed the type of children
}
const EnvironmentLayout = ({ children }: EnvironmentLayoutProps) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default EnvironmentLayout;

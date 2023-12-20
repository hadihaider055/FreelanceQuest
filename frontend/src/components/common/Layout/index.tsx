import React from "react";

// Components
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="overflow-x-hidden min-h-[calc(100vh - 80px)]">
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;

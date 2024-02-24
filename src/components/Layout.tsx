import React, { ReactNode } from "react";
import Navbar from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <div className="layout">{children}</div>;
};

export default Layout;

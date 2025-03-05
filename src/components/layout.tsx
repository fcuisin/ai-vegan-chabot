import React from "react";
import Header from "./header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="border-t py-4 bg-background">
        <div className="container text-center text-sm text-muted-foreground">
          <p>VegaBot | Discutez, apprenez, répondez !</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

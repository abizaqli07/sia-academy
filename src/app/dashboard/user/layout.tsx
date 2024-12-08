import Header from "~/components/layout/header";
import Sidebar from "~/components/layout/sidebar";
import { type ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden pt-16">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;

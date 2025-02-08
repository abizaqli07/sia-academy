import { type ReactNode } from "react";
import Header from "~/components/layout/layout_admin/header";
import Sidebar from "~/components/layout/layout_admin/sidebar";
import { auth } from "~/server/auth";

const UserDashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session || session?.user.role !== "ADMIN") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-2xl">
          Unauthenticated User, Please login before access this page
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 pt-16">{children}</main>
      </div>
    </>
  );
};

export default UserDashboardLayout;

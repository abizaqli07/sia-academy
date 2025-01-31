import Header from "~/components/layout/header";
import Sidebar from "~/components/layout/sidebar";
import { type ReactNode } from "react";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

const UserDashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session || session?.user.role === "USER") {
    redirect("/auth/signin");
  }

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

export default UserDashboardLayout;

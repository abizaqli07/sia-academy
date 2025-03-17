import { type ReactNode } from "react";
import Navbar from "./_components/navbar";
import { auth } from "~/server/auth";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth()
  
  return (
    <div className="h-fit w-full">
      <Navbar session={session}/>

      <main>
        {children}
      </main>      
    </div>
  );
};

export default HomeLayout;

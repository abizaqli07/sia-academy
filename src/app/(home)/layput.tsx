import { type ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return <main className="h-fit w-full">{children}</main>;
};

export default HomeLayout;

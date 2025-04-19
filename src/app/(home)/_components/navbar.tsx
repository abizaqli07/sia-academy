"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import { type Session } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { VscListSelection } from "react-icons/vsc";
import { Button } from "~/components/ui/button";

const NavContainerAnimate = {
  offscreen: {
    y: "-100vh",
    opacity: 0,
    transition: {
      duration: 0.7,
      type: "tween",
      ease: "easeInOut",
    },
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      type: "tween",
      ease: "easeInOut",
      staggerChildren: 0.1,
    },
  },
};

const NavLinkAnimate = {
  offscreen: {
    y: 400,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeInOut",
    },
  },
};

interface NavbarProps {
  session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
  const pathname = usePathname();

  const [active, setActive] = useState(false);

  const handleActive = (active: boolean) => {
    setActive(!active);
  };

  return (
    <div
      className={`absolute top-4 z-50 w-full bg-transparent transition-all duration-300 ease-in-out`}
    >
      <div className="container mx-auto flex items-center justify-between rounded-lg bg-white dark:bg-primary-dark p-2 shadow-lg">
        <Link href="/">
          <LayoutGrid size={30} />
        </Link>

        <div className="hidden items-center gap-12 text-base md:flex lg:gap-16">
          <Link
            href={"/"}
            className={`${pathname === "/" ? "text-primary" : "text-primary-dark dark:text-gray-300"}`}
          >
            Beranda
          </Link>
          <Link
            href={"/about_us"}
            className={`${pathname === "/about_us" ? "text-primary" : "text-primary-dark dark:text-gray-300"}`}
          >
            Tentang
          </Link>
          <Link
            href={"/join_us"}
            className={`${pathname === "/join_us" ? "text-primary" : "text-primary-dark dark:text-gray-300"}`}
          >
            Bergabung
          </Link>
        </div>

        <div className="hidden md:flex">
          {session == null ? (
            <Link href="/auth/signin">
              <Button>Sign In</Button>
            </Link>
          ) : (
            <Link href={"/redirect"}>
              <Button>Dashboard</Button>
            </Link>
          )}
        </div>

        <div
          className="cursor-pointer text-3xl md:hidden"
          onClick={() => handleActive(active)}
        >
          <VscListSelection />
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed left-0 right-0 top-0 flex h-screen w-screen flex-col items-center gap-12 bg-white pt-36"
              variants={NavContainerAnimate}
              initial="offscreen"
              animate="onscreen"
              exit="offscreen"
            >
              <div
                className="absolute right-8 top-8 cursor-pointer text-3xl font-bold text-primary-dark transition-colors duration-200 ease-out hover:text-primary sm:right-12"
                onClick={() => handleActive(active)}
              >
                <FaArrowRightFromBracket />
              </div>

              <div className="flex flex-col items-center justify-center gap-6 text-center text-lg font-light text-white">
                <motion.div
                  variants={NavLinkAnimate}
                  onClick={() => handleActive(active)}
                >
                  <Link
                    href={"/"}
                    className={`text-base font-semibold ${pathname === "/" ? "border-b-2 border-primary text-primary" : "text-primary-dark"}`}
                  >
                    Beranda
                  </Link>
                </motion.div>
                <motion.div
                  variants={NavLinkAnimate}
                  onClick={() => handleActive(active)}
                >
                  <Link
                    href={"/about_us"}
                    className={`text-base font-semibold ${pathname === "/about_us" ? "border-b-2 border-primary text-primary" : "text-primary-dark"}`}
                  >
                    Tentang
                  </Link>
                </motion.div>
                <motion.div
                  variants={NavLinkAnimate}
                  onClick={() => handleActive(active)}
                >
                  <Link
                    href={"/join_us"}
                    className={`text-base font-semibold ${pathname === "/join_us" ? "border-b-2 border-primary text-primary" : "text-primary-dark"}`}
                  >
                    Bergabung
                  </Link>
                </motion.div>
                <motion.div
                  variants={NavLinkAnimate}
                  onClick={() => handleActive(active)}
                >
                  <div>
                    {session == null ? (
                      <Button onClick={() => void signIn()} className="">
                        Sign In
                      </Button>
                    ) : (
                      <Link href={"/redirect"}>
                        <Button>Dashboard</Button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;

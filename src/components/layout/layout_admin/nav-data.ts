import { type Icons } from "~/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/user",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "All Course",
    href: "/dashboard/admin/courses",
    icon: "user",
    label: "user",
  },
  {
    title: "All Mentor",
    href: "/dashboard/admin/mentors",
    icon: "employee",
    label: "employee",
  },
  {
    title: "Settings",
    href: "/dashboard/admin/settings",
    icon: "login",
    label: "login",
  },
];
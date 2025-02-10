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
    href: "/dashboard/admin",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "All Course",
    href: "/dashboard/admin/courses",
    icon: "laptop",
    label: "course",
  },
  {
    title: "All Mentor",
    href: "/dashboard/admin/mentors",
    icon: "user",
    label: "mentor",
  },
  {
    title: "Settings",
    href: "/dashboard/admin/settings",
    icon: "settings",
    label: "settings",
  },
];
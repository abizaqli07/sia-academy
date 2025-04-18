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
    href: "/dashboard/mentor",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Data Mentoring",
    href: "/dashboard/mentor/mentoring",
    icon: "laptop",
    label: "course",
  },
  {
    title: "Mentee",
    href: "/dashboard/mentor/mentee",
    icon: "user",
    label: "mentor",
  },
];

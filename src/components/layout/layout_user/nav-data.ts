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
    title: "Kursus Saya",
    href: "/dashboard/user/my_course",
    icon: "user",
    label: "kursus",
  },
  {
    title: "Mentoring Saya",
    href: "/dashboard/user/my_mentoring",
    icon: "employee",
    label: "mentoring",
  },
  {
    title: "Kursus",
    href: "/dashboard/user/course",
    icon: "profile",
    label: "kursus",
  },
  {
    title: "Mentor",
    href: "/dashboard/user/mentoring",
    icon: "kanban",
    label: "mentoring",
  },
  {
    title: "Settings",
    href: "/dashboard/user/settings",
    icon: "login",
    label: "login",
  },
];
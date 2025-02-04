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
    title: "My Course",
    href: "/dashboard/user/my_course",
    icon: "user",
    label: "user",
  },
  {
    title: "My Mentoring",
    href: "/dashboard/user/my_mentoring",
    icon: "employee",
    label: "employee",
  },
  {
    title: "Course",
    href: "/dashboard/user/course",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Mentor",
    href: "/dashboard/user/mentoring",
    icon: "kanban",
    label: "kanban",
  },
  {
    title: "Settings",
    href: "/dashboard/user/settings",
    icon: "login",
    label: "login",
  },
];
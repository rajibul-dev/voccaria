import { FaCog, FaCrown, FaHome, FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { MdSchedule } from "react-icons/md";
import { PiChalkboardTeacher } from "react-icons/pi";
import { HiUsers } from "react-icons/hi2";

export const appSidebarNavLinks = [
  {
    label: "Dashboard",
    href: "/app/dashboard",
    Icon: FaHome,
  },
  {
    label: "Scheduler",
    href: "/app/scheduler",
    Icon: MdSchedule,
  },
  {
    label: "Free Lessons",
    href: "/app/free-lessons",
    Icon: PiChalkboardTeacher,
  },
  {
    label: "Paid Lessons",
    href: "/app/paid-lessons",
    Icon: FaCrown,
  },
  {
    label: "Notifications",
    href: "/app/notifications",
    Icon: IoIosNotifications,
  },
  {
    label: "Community",
    href: "/app/community",
    Icon: HiUsers,
  },
  {
    label: "Profile",
    href: "/app/profile",
    Icon: FaUser,
  },
  {
    label: "Settings",
    href: "/app/settings",
    Icon: FaCog,
  },
];

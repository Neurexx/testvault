"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookIcon,
  CheckIcon,
  BarChartIcon,
  SettingsIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


import { ExamIcon, ForumIcon } from "@/components/icons";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const mainNavItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "College Dashboard",
    icon: <BookIcon className="h-4 w-4 transition-all group-hover:scale-110" />,
  },
  {
    href: "/papers",
    label: "Exam Papers",
    icon: <CheckIcon className="h-5 w-5" />,
  },
  {
    href: "/exams",
    label: "Online Exams",
    icon: <ExamIcon className="h-5 w-5 fill-white" />,
  },
  {
    href: "/progress",
    label: "Progress Tracker",
    icon: <BarChartIcon className="h-5 w-5" />,
  },
  {
    href: "/threads",
    label: "Community",
    icon: <ForumIcon className="h-5 w-5" />,
  },
];

const bottomNavItems: NavItem[] = [
  {
    href: "/settings",
    label: "Settings",
    icon: <SettingsIcon className="h-5 w-5" />,
  },
];

function SidebarLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          prefetch={false}
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 
            ${active ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground hover:text-foreground"}`}
        >
          {item.icon}
          <span className="sr-only">{item.label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          {mainNavItems.map((item) => (
            <SidebarLink
              key={item.href}
              item={item}
              active={pathname === item.href}
            />
          ))}
        </TooltipProvider>
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          {bottomNavItems.map((item) => (
            <SidebarLink
              key={item.href}
              item={item}
              active={pathname === item.href}
            />
          ))}
        </TooltipProvider>
      </nav>
    </aside>
  );
}

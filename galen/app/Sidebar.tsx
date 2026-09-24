"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { label: "Home", icon: "home", href: "/" },
  { label: "Your shedule", icon: "calendar" },
  { label: "Pacients", icon: "patients" },
  { label: "Documents", icon: "documents" },
];
const accountNavigation = [
  { label: "Profile", icon: "profile" },
  { label: "Settings", icon: "settings" },
  { label: "Help", icon: "help" },
];

type NavItem = { label: string; icon: string; href?: string };

function NavigationItem({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const className = `flex h-14 w-full items-center gap-3 rounded-lg py-2 text-left text-[14px] font-medium hover:bg-black/5 ${collapsed ? "justify-center px-0" : "px-3 max-md:justify-center max-md:px-0"}`;
  const content = <><Image src={`/figma/${item.icon}.svg`} alt="" width={24} height={24} /><span className={collapsed ? "hidden" : "max-md:hidden"}>{item.label}</span></>;

  return item.href ? (
    <Link href={item.href} aria-label={item.label} title={collapsed ? item.label : undefined} className={className}>{content}</Link>
  ) : (
    <button type="button" aria-label={item.label} title={collapsed ? item.label : undefined} className={className}>{content}</button>
  );
}

export default function Sidebar({ initiallyCollapsed = false }: { initiallyCollapsed?: boolean }) {
  const [collapsed, setCollapsed] = useState(initiallyCollapsed);

  return (
    <aside className={`sticky top-0 flex h-dvh shrink-0 flex-col justify-between border-r border-[#dfdfdf] bg-[#fcfcfc] px-3 py-8 transition-[width] duration-200 max-md:w-[72px] max-md:px-2 max-md:py-6 ${collapsed ? "w-[72px]" : "w-[200px]"}`}>
      <div className="flex flex-col gap-6">
        <div className={`flex items-center px-3 max-md:justify-center max-md:px-0 ${collapsed ? "h-12 justify-center" : "h-6 justify-between"}`}>
          {!collapsed && <span className="font-serif text-[22px] leading-none font-bold max-md:hidden">Galen.AI</span>}
          <button type="button" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} aria-expanded={!collapsed} onClick={() => setCollapsed((value) => !value)} className="rounded max-md:hidden">
            <Image src={`/figma/${collapsed ? "sidebar-collapsed" : "sidebar"}.svg`} alt="" width={24} height={24} />
          </button>
        </div>
        <nav aria-label="Main navigation">{navigation.map((item) => <NavigationItem key={item.label} item={item} collapsed={collapsed} />)}</nav>
      </div>
      <nav aria-label="Account navigation">{accountNavigation.map((item) => <NavigationItem key={item.label} item={item} collapsed={collapsed} />)}</nav>
    </aside>
  );
}

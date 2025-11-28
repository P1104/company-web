"use client";

import React from 'react';
import * as React_hooks from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon, Home, Zap, CreditCard, Package, Mail, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

// --- Interfaces (Unchanged) ---

interface Tab {
  title: string;
  icon: LucideIcon;
  type?: never;
  href?: string;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
  href?: never;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
}

// --- Animation Variants (Unchanged) ---

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

// --- Main Component ---

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
  onChange,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React_hooks.useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React_hooks.useState(false);
  const outsideClickRef = React_hooks.useRef(null);
  const router = useRouter();

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
    onChange?.(null);
    setIsMobileMenuOpen(false);
  });

  const handleSelect = (index: number) => {
    setSelected(index);
    onChange?.(index);
    
    const tab = tabs[index];
    if (tab.type !== "separator" && tab.href) {
      router.push(tab.href);
      setIsMobileMenuOpen(false);
    }
  };

  const Separator = () => (
    <div className="mx-1 h-[24px] w-[1.2px] bg-border" aria-hidden="true" />
  );

  return (
    <div ref={outsideClickRef} className={cn("relative", className)}>
      {/* Desktop View: Hidden on mobile (hidden on small, flex on md) */}
      <div className="hidden md:flex flex-wrap items-center gap-2 rounded-2xl border bg-background p-1 shadow-sm">
        {tabs.map((tab, index) => {
          if (tab.type === "separator") {
            return <Separator key={`separator-${index}`} />;
          }
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.title}
              variants={buttonVariants}
              initial={false}
              animate="animate"
              custom={selected === index}
              onClick={() => handleSelect(index)}
              transition={transition}
              className={cn(
                "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
                selected === index
                  ? cn("bg-muted", activeColor)
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon size={20} />
              <AnimatePresence initial={false}>
                {selected === index && (
                  <motion.span
                    variants={spanVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    className="overflow-hidden"
                  >
                    {tab.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Mobile Hamburger View: Visible only on small screens */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center rounded-2xl border bg-background p-3 shadow-sm transition-colors hover:bg-muted"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 min-w-[200px] origin-top-right rounded-xl border bg-background p-2 shadow-lg z-50"
            >
              <div className="flex flex-col gap-1">
                {tabs.map((tab, index) => {
                  if (tab.type === "separator") {
                    return <div key={`sep-${index}`} className="my-1 border-b border-border" />;
                  }
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.title}
                      onClick={() => handleSelect(index)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                        selected === index ? activeColor : "text-muted-foreground"
                      )}
                    >
                      <Icon size={18} />
                      <span>{tab.title}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const Navbar = () => {
  const navTabs: TabItem[] = [
    { title: "Home", icon: Home, href: "/" },
    { title: "Company", icon: Zap, href: "/about-us" },
    { type: "separator" },
    { title: "Careers", icon: CreditCard, href: "/careers" },
    { title: "Products", icon: Package, href: "/products" },
    { title: "Contact", icon: Mail, href: "/contact-us" },
  ];

  const handleTabChange = (index: number | null) => {
    if (index !== null) {
      console.log(`Selected tab index: ${index}`);
    }
  };

  return (

    <div className="w-full flex justify-end md:justify-center py-4 px-4">
      <ExpandableTabs
        tabs={navTabs}
        activeColor="text-black"
        onChange={handleTabChange}
      />
    </div>
  );
};

export default Navbar;

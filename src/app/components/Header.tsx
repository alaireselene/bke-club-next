"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/app/components/navigation/Logo";
import { NavigationMenu } from "@/app/components/navigation/NavigationMenu";
import { MobileMenu } from "@/app/components/navigation/MobileMenu";
import { DesktopMenu } from "@/app/components/navigation/DesktopMenu";
import type { School } from "@/types/wordpress";

type Props = {
  schools: School[];
};

export function Header({ schools }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("VI");
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (typeof document !== "undefined") {
      document.body.style.overflow = !mobileMenuOpen ? "hidden" : "";
    }
  };

  const toggleLanguage = () => {
    setCurrentLang(currentLang === "VI" ? "EN" : "VI");
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        mobileMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-button")
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "h-20 bg-cardinal-800/95 backdrop-blur-md shadow-lg"
            : "h-24 bg-gradient-to-r from-cardinal-800 via-cardinal-700 to-cardinal-600"
        }`}
      >
        {/* Scientific header decoration - subtle pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "h-20" : "h-24"
            }`}
          >
            <Logo />

            {/* Top Navigation Menu */}
            <NavigationMenu
              currentLang={currentLang}
              onToggleLanguage={toggleLanguage}
            />

            {/* Mobile Menu Button */}
            <button
              className="menu-button relative overflow-hidden text-chalk-100 hover:text-chalk-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-chalk-100 focus:ring-offset-2 md:hidden"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {/* Button background effect */}
              <span className="absolute inset-0 bg-cardinal-600/0 transition-colors duration-300 hover:bg-cardinal-600/50"></span>
              <Menu className="relative h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Secondary Navigation Menu */}
      <DesktopMenu schools={schools} scrolled={scrolled} />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        schools={schools}
        currentLang={currentLang}
        onToggleLanguage={toggleLanguage}
        isAdmin={false} // TODO: Get from auth context
      />
    </>
  );
}

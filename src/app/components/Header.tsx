"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/app/components/navigation/Logo";
import { NavigationMenu } from "@/app/components/navigation/NavigationMenu";
import { MobileMenu } from "@/app/components/navigation/MobileMenu";
import { DesktopMenu } from "@/app/components/navigation/DesktopMenu";
import type { School, Club } from "@/app/components/navigation/types";

type Props = {
  schools: School[];
  clubs: Club[];
};

export function Header({ schools, clubs }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("VI");

  // Group clubs by schoolId for efficient lookup
  const clubsBySchool = clubs.reduce<Record<number, Club[]>>((acc, club) => {
    const schoolId = club.schoolId;
    if (schoolId) {
      if (!acc[schoolId]) {
        acc[schoolId] = [];
      }
      acc[schoolId].push(club);
    }
    return acc;
  }, {});

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (typeof document !== "undefined") {
      document.body.style.overflow = !mobileMenuOpen ? "hidden" : "";
    }
  };

  const toggleLanguage = () => {
    setCurrentLang(currentLang === "VI" ? "EN" : "VI");
  };

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
      <header className="bg-cardinal-700 fixed top-0 z-50 w-full shadow-md transition-shadow duration-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Logo />

            <NavigationMenu
              currentLang={currentLang}
              onToggleLanguage={toggleLanguage}
            />

            {/* Mobile Menu Button */}
            <button
              className="menu-button focus:ring-chalk-100 text-chalk-100 hover:text-chalk-200 hover:bg-cardinal-600/50 rounded-md p-2 focus:ring-2 focus:ring-offset-2 focus:outline-none md:hidden"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <DesktopMenu schools={schools} clubsBySchool={clubsBySchool} />

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        schools={schools}
        clubsBySchool={clubsBySchool}
      />
    </>
  );
}

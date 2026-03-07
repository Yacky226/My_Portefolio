import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Download, Sun, Moon, Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "./ui/sheet";
import { useI18n } from "../hooks/useI18n";
import { useTheme } from "../hooks/useTheme";

interface HeaderProps {
  activeSection?: string;
}

interface NavigationItem {
  name: string;
  href: string;
}

export function Header({ activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t, language, setLanguage } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const toggleLanguage = (): void => {
    const newLang = language === "en" ? "fr" : "en";
    setLanguage(newLang);
  };

  const navigation: NavigationItem[] = [
    { name: t("navigation.home"), href: "home" },
    { name: t("navigation.about"), href: "about" },
    { name: t("navigation.projects"), href: "projects" },
    { name: t("navigation.services"), href: "services" },
    { name: t("navigation.blog"), href: "blog" },
    { name: t("navigation.contact"), href: "contact" },
  ];

  const handleNavClick = (href: string): void => {
    setIsOpen(false);
    // Only scroll if on home page
    if (location.pathname === "/") {
      const element = document.querySelector(`#${href}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleResumeDownload = (): void => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = `Yacouba_Resume_${language.toUpperCase()}.pdf`;
    link.click();
  };

  return (
    <header className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div className="floating-island-scrolled transition-all duration-300">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Desktop Navigation - Capsule Container */}
          <nav className="hidden md:flex items-center">
            <div className="nav-capsule">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={`/#${item.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`nav-link ${
                    activeSection === item.href ? "nav-link-active" : ""
                  }`}
                  aria-current={
                    activeSection === item.href ? "page" : undefined
                  }
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Toggles Capsule */}
            <div className="action-capsule">
              <button
                onClick={toggleLanguage}
                className="action-button"
                aria-label={t("language.switch")}
                title={`Switch to ${language === "en" ? "French" : "English"}`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-semibold">
                  {language.toUpperCase()}
                </span>
              </button>

              <div className="action-separator" />

              <button
                onClick={toggleTheme}
                className="action-button"
                aria-label={t("theme.toggle")}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleResumeDownload}
              className="cta-button"
              aria-label={t("navigation.resume")}
            >
              <Download className="w-4 h-4" />
              <span className="hidden lg:inline ml-2">
                {t("navigation.resume")}
              </span>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2 hover:bg-secondary/50"
                aria-label={t("navigation.menu")}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 border-border/50 backdrop-blur-xl bg-background/95"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>{t("navigation.menu")}</SheetTitle>
                <SheetDescription>
                  {t("navigation.description")}
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col h-full pt-8">
                {/* Mobile Navigation */}
                <nav className="flex-1">
                  <ul className="space-y-2">
                    {navigation.map((item) => (
                      <li key={item.href}>
                        <Link
                          to={`/#${item.href}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.href);
                          }}
                          className={`mobile-nav-link ${
                            activeSection === item.href
                              ? "mobile-nav-link-active"
                              : ""
                          }`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Actions */}
                <div className="border-t border-border/50 pt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleLanguage}
                      className="mobile-action-button"
                      aria-label={t("language.switch")}
                    >
                      <Globe className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {language.toUpperCase()}
                      </span>
                    </button>

                    <button
                      onClick={toggleTheme}
                      className="mobile-action-button"
                      aria-label={t("theme.toggle")}
                    >
                      {theme === "dark" ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <Button
                    onClick={handleResumeDownload}
                    className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-md"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t("navigation.resume")}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

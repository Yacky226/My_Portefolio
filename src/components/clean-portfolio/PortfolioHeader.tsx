import React, { useEffect, useRef, useState } from "react";
import { Download, Languages, Menu, Moon, Sun, X } from "lucide-react";

interface HeaderNavItem {
  id: string;
  label: string;
}

interface PortfolioHeaderProps {
  isScrolled: boolean;
  navItems: HeaderNavItem[];
  language: string;
  theme: "light" | "dark";
  languageSwitchLabel: string;
  themeToggleLabel: string;
  resumeLabel: string;
  hireLabel: string;
  onScrollToSection: (sectionId: string) => void;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  onDownloadResume: () => void;
}

export function PortfolioHeader({
  isScrolled,
  navItems,
  language,
  theme,
  languageSwitchLabel,
  themeToggleLabel,
  resumeLabel,
  hireLabel,
  onScrollToSection,
  onToggleLanguage,
  onToggleTheme,
  onDownloadResume,
}: PortfolioHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuDragOffset, setMenuDragOffset] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    const onResize = () => {
      if (window.innerWidth > 760) {
        setIsMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setMenuDragOffset(0);
      touchStartRef.current = null;
    }
  }, [isMobileMenuOpen]);

  const handleNavigate = (sectionId: string) => {
    onScrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleDownloadResume = () => {
    onDownloadResume();
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    setMenuDragOffset(0);
  };

  const handleMobileMenuTouchMove = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (!touchStartRef.current) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

    // Track only a right-swipe gesture so vertical scrolling still works naturally.
    if (deltaX > 0 && deltaY < 90) {
      setMenuDragOffset(Math.min(deltaX, 220));
    }
  };

  const handleMobileMenuTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (!touchStartRef.current) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
    const shouldClose = deltaX > 80 && deltaY < 90;

    touchStartRef.current = null;
    if (shouldClose) {
      setIsMobileMenuOpen(false);
      setMenuDragOffset(0);
      return;
    }

    setMenuDragOffset(0);
  };

  return (
    <header className={`editorial-header ${isScrolled ? "is-scrolled" : ""}`}>
      <nav className="editorial-nav glass-header" aria-label="Main navigation">
        <button
          type="button"
          className="editorial-brand"
          onClick={() => onScrollToSection("home")}
          data-magnetic="true"
        >
          <span className="editorial-brand-mark">Y</span>
          <span className="editorial-brand-name">Yacouba</span>
        </button>

        <div className="editorial-nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="editorial-link"
              onClick={() => handleNavigate(item.id)}
              data-magnetic="true"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="editorial-actions">
          <button
            type="button"
            className="editorial-icon-btn"
            onClick={onToggleLanguage}
            aria-label={languageSwitchLabel}
            title={languageSwitchLabel}
            data-magnetic="true"
          >
            <Languages size={16} />
            <span>{language.toUpperCase()}</span>
          </button>
          <button
            type="button"
            className="editorial-icon-btn"
            onClick={onToggleTheme}
            aria-label={themeToggleLabel}
            title={themeToggleLabel}
            data-magnetic="true"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            className="editorial-resume-btn"
            onClick={onDownloadResume}
            data-magnetic="true"
          >
            <Download size={14} />
            <span>{resumeLabel}</span>
          </button>
          <button
            type="button"
            className="editorial-hire-btn"
            onClick={() => handleNavigate("contact")}
            data-magnetic="true"
          >
            {hireLabel}
          </button>
        </div>

        <button
          type="button"
          className="editorial-menu-btn"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <div
        className={`editorial-mobile-menu-backdrop ${isMobileMenuOpen ? "is-open" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`editorial-mobile-menu glass-header ${isMobileMenuOpen ? "is-open" : ""}`}
        style={
          isMobileMenuOpen
            ? {
                transform: `translateX(${menuDragOffset}px)`,
                transition: menuDragOffset > 0 ? "none" : undefined,
              }
            : undefined
        }
        onTouchStart={handleMobileMenuTouchStart}
        onTouchMove={handleMobileMenuTouchMove}
        onTouchEnd={handleMobileMenuTouchEnd}
      >
        <div className="editorial-mobile-menu-head">
          <span className="editorial-mobile-menu-title">
            {language === "fr" ? "Menu" : "Menu"}
          </span>
          <button
            type="button"
            className="editorial-mobile-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label={language === "fr" ? "Fermer le menu" : "Close menu"}
          >
            <X size={16} />
          </button>
        </div>

        <div className="editorial-mobile-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="editorial-mobile-link"
              onClick={() => handleNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="editorial-mobile-actions">
          <button
            type="button"
            className="editorial-mobile-btn"
            onClick={onToggleLanguage}
          >
            <Languages size={15} />
            {language.toUpperCase()}
          </button>
          <button
            type="button"
            className="editorial-mobile-btn"
            onClick={onToggleTheme}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            Theme
          </button>
          <button
            type="button"
            className="editorial-mobile-btn"
            onClick={handleDownloadResume}
          >
            <Download size={15} />
            {resumeLabel}
          </button>
          <button
            type="button"
            className="editorial-mobile-btn editorial-mobile-btn-primary"
            onClick={() => handleNavigate("contact")}
          >
            {hireLabel}
          </button>
        </div>
      </div>
    </header>
  );
}

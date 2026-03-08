import React, { useEffect, useMemo, useState } from "react";
import { getBlogPosts, type BlogLanguage } from "../data/blogData";
import { useI18n } from "../hooks/useI18n";
import { useTheme } from "../hooks/useTheme";
import { NAV_ITEMS, PROJECTS_META, SOCIAL_LINKS } from "./clean-portfolio/constants";
import { PortfolioBlog } from "./clean-portfolio/PortfolioBlog";
import { PortfolioFooter } from "./clean-portfolio/PortfolioFooter";
import { PortfolioHeader } from "./clean-portfolio/PortfolioHeader";
import { PortfolioHero } from "./clean-portfolio/PortfolioHero";
import { PortfolioProjects } from "./clean-portfolio/PortfolioProjects";
import { PortfolioServices } from "./clean-portfolio/PortfolioServices";
import type {
  Category,
  ProjectFilter,
  ProjectFilterItem,
  ServiceItem,
  SkillItem,
  TimelineItem,
} from "./clean-portfolio/types";
import { asArray, asString } from "./clean-portfolio/utils";
import "../styles/clean-portfolio.css";

export function CleanPortfolio() {
  const { t, language, setLanguage } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeProjectFilter, setActiveProjectFilter] = useState<ProjectFilter>("all");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
      if (!element.classList.contains("reveal-active")) {
        observer.observe(element);
      }
    });
    return () => observer.disconnect();
  }, [activeProjectFilter]);

  useEffect(() => {
    const magnets = document.querySelectorAll<HTMLElement>("[data-magnetic='true']");
    const cleanups: Array<() => void> = [];

    magnets.forEach((element) => {
      const onMouseMove = (event: MouseEvent) => {
        const bounds = element.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const offsetX = (event.clientX - centerX) * 0.18;
        const offsetY = (event.clientY - centerY) * 0.18;
        element.style.setProperty("--magnetic-x", `${offsetX}px`);
        element.style.setProperty("--magnetic-y", `${offsetY}px`);
      };

      const onMouseLeave = () => {
        element.style.setProperty("--magnetic-x", "0px");
        element.style.setProperty("--magnetic-y", "0px");
      };

      element.addEventListener("mousemove", onMouseMove);
      element.addEventListener("mouseleave", onMouseLeave);
      cleanups.push(() => {
        element.removeEventListener("mousemove", onMouseMove);
        element.removeEventListener("mouseleave", onMouseLeave);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  const categoryLabels: Record<Category, string> = {
    web: asString(t("projects.filter_web"), "Web"),
    mobile: asString(t("projects.filter_mobile"), "Mobile"),
    backend: asString(t("projects.filter_backend"), "Backend"),
  };

  const projects = useMemo(() => {
    return PROJECTS_META.map((meta) => {
      const tagsRaw = t(`projects.data.${meta.id}.tags`);
      const tags =
        typeof tagsRaw === "string"
          ? tagsRaw
              .split("|")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : [];

      return {
        ...meta,
        title: asString(t(`projects.data.${meta.id}.title`)),
        description: asString(t(`projects.data.${meta.id}.description`)),
        tags,
        impact: asString(t(`projects.data.${meta.id}.impact`)),
      };
    });
  }, [t]);

  const visibleProjects = useMemo(() => {
    const filtered =
      activeProjectFilter === "all"
        ? projects
        : projects.filter((project) => project.category === activeProjectFilter);

    return [...filtered].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.year - a.year;
    });
  }, [projects, activeProjectFilter]);

  const projectFilters = useMemo<ProjectFilterItem[]>(() => {
    const counts = projects.reduce(
      (acc, project) => {
        acc[project.category] += 1;
        return acc;
      },
      { web: 0, mobile: 0, backend: 0 }
    );

    return [
      { key: "all", label: asString(t("projects.filter_all"), "All"), value: projects.length },
      { key: "web", label: categoryLabels.web, value: counts.web },
      { key: "mobile", label: categoryLabels.mobile, value: counts.mobile },
      { key: "backend", label: categoryLabels.backend, value: counts.backend },
    ];
  }, [projects, categoryLabels, t]);

  const services = useMemo<ServiceItem[]>(() => {
    const rawServices = asArray<{ title?: string; description?: string }>(t("services.items"));
    return rawServices.slice(0, 3).map((service) => ({
      title: service?.title ?? "",
      description: service?.description ?? "",
    }));
  }, [t]);

  const skills = useMemo<SkillItem[]>(() => {
    const rawSkills = asArray<SkillItem>(t("about.data.skills"));
    return rawSkills
      .map((item) => ({
        name: item?.name ?? "",
        level: Number(item?.level ?? 0),
      }))
      .filter((item) => item.name.length > 0)
      .sort((a, b) => b.level - a.level)
      .slice(0, 3);
  }, [t]);

  const skillChips = useMemo(() => {
    const fromSkills = skills.flatMap((skill) =>
      skill.name
        .split(/[\/,]/)
        .map((token) => token.trim())
        .filter(Boolean)
    );
    return Array.from(new Set(fromSkills)).slice(0, 3);
  }, [skills]);

  const timeline = useMemo<TimelineItem[]>(() => {
    const rawTimeline = asArray<TimelineItem>(t("about.timeline"));
    return rawTimeline.slice(0, 3).map((item) => ({
      year: item?.year ?? "",
      title: item?.title ?? "",
      company: item?.company ?? "",
    }));
  }, [t]);

  const latestPosts = useMemo(() => {
    return [...getBlogPosts(language as BlogLanguage)]
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, 3);
  }, [language]);

  const navItems = useMemo(() => {
    return NAV_ITEMS.map((item) => ({
      id: item.id,
      label: asString(t(item.labelKey)),
    }));
  }, [t]);

  const featuredProject = visibleProjects[0];
  const secondaryPrimary = visibleProjects[1];
  const secondaryCards = visibleProjects.slice(2, 4);
  const additionalProjects = visibleProjects.slice(4);
  const email = asString(t("contact.info.email"), "hello@example.com");
  const year = new Date().getFullYear();
  const heroHeadline: [string, string] =
    language === "fr"
      ? ["Concevoir", "Digital"]
      : ["Crafting", "Digital"];

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  const handleResumeDownload = () => {
    const isFrench = language === "fr";
    const resumePath = isFrench ? "/resume-fr.pdf" : "/resume-en.pdf";
    const fileName = isFrench ? "Yacouba_CV_FR.pdf" : "Yacouba_Resume_EN.pdf";
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="editorial-shell">
      <PortfolioHeader
        isScrolled={isScrolled}
        navItems={navItems}
        language={language}
        theme={theme}
        languageSwitchLabel={asString(t("language.switch"))}
        themeToggleLabel={asString(t("theme.toggle"))}
        resumeLabel={asString(t("navigation.resume"), "CV")}
        hireLabel={asString(t("common.hire_me"), "Hire")}
        onScrollToSection={scrollToSection}
        onToggleLanguage={toggleLanguage}
        onToggleTheme={toggleTheme}
        onDownloadResume={handleResumeDownload}
      />

      <main className="editorial-main">
        <PortfolioHero
          headline={heroHeadline}
          title={asString(t("hero.title"))}
          description={asString(t("hero.description"))}
          primaryCtaLabel={asString(t("hero.cta_primary"))}
          resumeLabel={asString(t("navigation.resume"))}
          profileName={asString(t("hero.name"))}
          profileGreeting={asString(t("hero.greeting"))}
          profileLocation={asString(t("about.location"))}
          profileImageAlt={asString(t("about.image_alt"))}
          skillChips={skillChips}
          onScrollToProjects={() => scrollToSection("projects")}
          onDownloadResume={handleResumeDownload}
        />

        <PortfolioProjects
          title={asString(t("projects.title"))}
          filters={projectFilters}
          activeFilter={activeProjectFilter}
          categoryLabels={categoryLabels}
          featuredProject={featuredProject}
          secondaryPrimary={secondaryPrimary}
          secondaryCards={secondaryCards}
          additionalProjects={additionalProjects}
          viewCaseStudyLabel={asString(t("projects.view_case_study"))}
          caseStudyUrl={SOCIAL_LINKS.github}
          noResultsLabel={asString(t("projects.no_results"))}
          projectCtaTitle={asString(t("services.bottom_cta_title"))}
          projectCtaDescription={asString(t("services.bottom_cta_description"))}
          projectCtaAction={asString(t("services.contact_cta"))}
          viewMoreLabel={language === "fr" ? "Voir plus" : "View more"}
          viewMoreUrl={SOCIAL_LINKS.github}
          onFilterChange={setActiveProjectFilter}
          onContact={() => scrollToSection("contact")}
        />

        <PortfolioServices
          title={asString(t("services.title"))}
          skillsTitle={asString(t("about.skills_title"))}
          servicesSubtitle={asString(t("services.subtitle"))}
          quoteText={asString(t("about.description"))}
          skills={skills}
          services={services}
          timeline={timeline}
        />

        <PortfolioBlog
          title={asString(t("blog.title"))}
          allPostsLabel={asString(t("blog.all_posts"))}
          readTimeLabel={asString(t("blog.read_time"))}
          language={language}
          posts={latestPosts}
        />
      </main>

      <PortfolioFooter
        email={email}
        contactTitle={asString(t("contact.title"))}
        contactCta={asString(t("services.contact_cta"))}
        year={year}
        brandName={asString(t("footer.brand.name"), "Yacouba")}
        resumeLabel={asString(t("navigation.resume"))}
        githubUrl={SOCIAL_LINKS.github}
        linkedinUrl={SOCIAL_LINKS.linkedin}
        onDownloadResume={handleResumeDownload}
      />
    </div>
  );
}

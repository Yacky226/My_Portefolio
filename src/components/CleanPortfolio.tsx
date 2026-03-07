import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Download,
  Globe,
  Mail,
  Moon,
  Sun,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { blogPosts } from "../data/blogData";
import { useI18n } from "../hooks/useI18n";
import { useTheme } from "../hooks/useTheme";
import "../styles/clean-portfolio.css";

type Category = "web" | "mobile" | "backend";
type ProjectFilter = "all" | Category;

interface ProjectMeta {
  id: string;
  image: string;
  year: number;
  category: Category;
  featured: boolean;
}

interface SkillItem {
  name: string;
  level: number;
}

interface ServiceItem {
  title: string;
  description: string;
  deliverables: string[] | string;
  timeline: string;
}

interface TimelineItem {
  year: string;
  title: string;
  company: string;
}

const NAV_IDS = [
  "home",
  "projects",
  "services",
  "about",
  "blog",
  "contact",
] as const;

const PROJECTS_META: ProjectMeta[] = [
  { id: "1", image: "/affiche.jpg", year: 2025, category: "web", featured: true },
  { id: "2", image: "/jeja.jpg", year: 2025, category: "web", featured: true },
  { id: "3", image: "/maze.jpeg", year: 2023, category: "web", featured: true },
  { id: "4", image: "/gladiator.jpg", year: 2023, category: "web", featured: false },
  { id: "5", image: "/Unplash.webp", year: 2025, category: "web", featured: false },
  { id: "6", image: "/congestion.jpeg", year: 2025, category: "web", featured: false },
  { id: "7", image: "/mini-commerce.jpeg", year: 2025, category: "backend", featured: false },
  { id: "8", image: "/chat.jpeg", year: 2025, category: "web", featured: false },
  { id: "9", image: "/reporting.webp", year: 2025, category: "backend", featured: false },
];

const asArray = <T,>(value: unknown): T[] => {
  return Array.isArray(value) ? (value as T[]) : [];
};

const formatDate = (date: Date, language: string) => {
  const locale = language === "fr" ? "fr-FR" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export function CleanPortfolio() {
  const { t, language, setLanguage } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [activeProjectFilter, setActiveProjectFilter] = useState<ProjectFilter>("all");
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const categoryLabels: Record<Category, string> = {
    web: t("projects.filter_web"),
    mobile: t("projects.filter_mobile"),
    backend: t("projects.filter_backend"),
  };

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    setIsScrolled(window.scrollY > 12);

    const onScroll = () => {
      const currentY = window.scrollY;
      if (ticking.current) return;

      ticking.current = true;
      window.requestAnimationFrame(() => {
        const delta = currentY - lastScrollY.current;
        setIsScrolled(currentY > 12);

        if (currentY < 80) {
          setIsHeaderHidden(false);
        } else if (delta > 8) {
          setIsHeaderHidden(true);
        } else if (delta < -8) {
          setIsHeaderHidden(false);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const projects = useMemo(() => {
    return PROJECTS_META.map((meta) => {
      const tagsRaw = t(`projects.data.${meta.id}.tags`);
      const tags =
        typeof tagsRaw === "string"
          ? tagsRaw.split("|").map((tag) => tag.trim()).filter(Boolean)
          : [];

      return {
        ...meta,
        title: t(`projects.data.${meta.id}.title`) as string,
        description: t(`projects.data.${meta.id}.description`) as string,
        tags,
        impact: t(`projects.data.${meta.id}.impact`) as string,
      };
    });
  }, [t]);

  const featuredProjects = useMemo(() => {
    const filtered =
      activeProjectFilter === "all"
        ? projects
        : projects.filter((project) => project.category === activeProjectFilter);

    return [...filtered]
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.year - a.year;
      })
      .slice(0, 6);
  }, [projects, activeProjectFilter]);

  const skills = useMemo(() => {
    const rawSkills = asArray<SkillItem>(t("about.data.skills"));
    return rawSkills
      .map((item) => ({
        name: item?.name ?? "",
        level: Number(item?.level ?? 0),
      }))
      .filter((item) => item.name.length > 0)
      .sort((a, b) => b.level - a.level)
      .slice(0, 6);
  }, [t]);

  const services = useMemo(() => {
    const rawServices = asArray<ServiceItem>(t("services.items"));
    return rawServices.slice(0, 4).map((service) => ({
      title: service?.title ?? "",
      description: service?.description ?? "",
      deliverables: Array.isArray(service?.deliverables)
        ? service.deliverables.slice(0, 3)
        : typeof service?.deliverables === "string"
          ? service.deliverables
              .split("|")
              .map((item) => item.trim())
              .filter(Boolean)
              .slice(0, 3)
          : [],
      timeline: service?.timeline ?? "",
    }));
  }, [t]);

  const projectFilters = useMemo(() => {
    const counts = projects.reduce(
      (acc, project) => {
        acc[project.category] += 1;
        return acc;
      },
      { web: 0, mobile: 0, backend: 0 }
    );

    const filters: Array<{ key: ProjectFilter; label: string; value: number }> = [
      { key: "all", label: t("projects.filter_all"), value: projects.length },
      { key: "web", label: categoryLabels.web, value: counts.web },
      { key: "backend", label: categoryLabels.backend, value: counts.backend },
    ];

    if (counts.mobile > 0) {
      filters.splice(2, 0, {
        key: "mobile",
        label: categoryLabels.mobile,
        value: counts.mobile,
      });
    }

    return filters;
  }, [projects, categoryLabels, t]);

  const skillChips = useMemo(() => {
    const fromSkills = skills.flatMap((skill) =>
      skill.name
        .split(/[\/,]/)
        .map((token) => token.trim())
        .filter(Boolean)
    );

    const fromServices = services.flatMap((service) => service.deliverables);
    const unique = Array.from(new Set([...fromSkills, ...fromServices]));
    return unique.slice(0, 16);
  }, [skills, services]);

  const timeline = useMemo(() => {
    const rawTimeline = asArray<TimelineItem>(t("about.timeline"));
    return rawTimeline.slice(0, 3).map((item) => ({
      year: item?.year ?? "",
      title: item?.title ?? "",
      company: item?.company ?? "",
    }));
  }, [t]);

  const latestPosts = useMemo(() => {
    return [...blogPosts]
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, 3);
  }, []);

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
    const resumePath = language === "fr" ? "/resume-fr.pdf" : "/resume.pdf";
    const fileName = language === "fr" ? "Yacouba_CV.pdf" : "Yacouba_Resume.pdf";
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="clean-shell">
      <div className="clean-background" aria-hidden="true" />

      <header
        className={`clean-header ${isScrolled ? "clean-header-scrolled" : ""} ${
          isHeaderHidden ? "clean-header-hidden" : ""
        }`}
      >
        <button
          className="clean-brand"
          type="button"
          onClick={() => scrollToSection("home")}
        >
          Yacouba
        </button>

        <nav className="clean-nav" aria-label="Main navigation">
          {NAV_IDS.map((id) => (
            <button
              key={id}
              type="button"
              className="clean-nav-link"
              onClick={() => scrollToSection(id)}
            >
              {t(`navigation.${id}`)}
            </button>
          ))}
        </nav>

        <div className="clean-header-actions">
          <button
            type="button"
            className="clean-icon-button"
            onClick={toggleLanguage}
            aria-label={t("language.switch")}
            title={t("language.switch")}
          >
            <Globe size={16} />
            <span>{language.toUpperCase()}</span>
          </button>

          <button
            type="button"
            className="clean-icon-button"
            onClick={toggleTheme}
            aria-label={t("theme.toggle")}
            title={t("theme.toggle")}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            type="button"
            className="clean-resume-button"
            onClick={handleResumeDownload}
          >
            <Download size={16} />
            <span>{t("navigation.resume")}</span>
          </button>
        </div>
      </header>

      <main className="clean-main">
        <section id="home" className="clean-hero clean-reveal">
          <div>
            <p className="clean-eyebrow">{t("hero.greeting")}</p>
            <h1>{t("hero.name")}</h1>
            <p className="clean-role">{t("hero.title")}</p>
            <p className="clean-description">{t("hero.description")}</p>

            <div className="clean-hero-actions">
              <button
                type="button"
                className="clean-primary-button"
                onClick={() => scrollToSection("projects")}
              >
                {t("hero.cta_primary")}
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                className="clean-secondary-button"
                onClick={handleResumeDownload}
              >
                {t("hero.cta_secondary")}
              </button>
            </div>

            <div className="clean-hero-stats">
              <span>{t("hero.stats.experience")}</span>
              <span>{t("hero.stats.projects")}</span>
              <span>{t("hero.stats.clients")}</span>
            </div>
          </div>

          <div className="clean-hero-card">
            <ImageWithFallback
              src="/profil.jpg"
              alt={t("about.image_alt")}
              className="clean-hero-image"
            />
            <div className="clean-status-pill">{t("hero.badge_available")}</div>
          </div>
        </section>

        <section id="projects" className="clean-section clean-reveal">
          <div className="clean-section-heading">
            <p className="clean-kicker">01</p>
            <h2>{t("projects.title")}</h2>
            <p>{t("projects.subtitle")}</p>
          </div>

          <div className="clean-featured-grid">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project, index) => (
                <article key={project.id} className="clean-featured-card">
                  <div className="clean-featured-image-wrap">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="clean-featured-image"
                    />
                    <span className="clean-featured-rank">0{index + 1}</span>
                  </div>
                  <div className="clean-featured-content">
                    <div className="clean-featured-topline">
                      <p className="clean-meta">
                        {project.year} - {categoryLabels[project.category]}
                      </p>
                      <span className="clean-tag">{project.impact}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="clean-tags">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="clean-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="clean-link-action"
                      onClick={() => scrollToSection("contact")}
                    >
                      {t("projects.view_project")}
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="clean-empty-state">{t("projects.no_results")}</div>
            )}
          </div>

          <div className="clean-project-bottom">
            <div className="clean-project-stats">
              {projectFilters.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`clean-stat-chip clean-filter-chip ${
                    activeProjectFilter === item.key ? "is-active" : ""
                  }`}
                  onClick={() => setActiveProjectFilter(item.key)}
                  aria-pressed={activeProjectFilter === item.key}
                >
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="clean-tech-strip">
              {(activeProjectFilter === "all" ? projects : featuredProjects)
                .slice(0, activeProjectFilter === "all" ? 8 : 6)
                .flatMap((project) => project.tags)
                .slice(0, 16)
                .map((tag, index) => (
                  <span key={`${tag}-${index}`} className="clean-tech-pill">
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </section>

        <section id="services" className="clean-section clean-reveal">
          <div className="clean-section-heading">
            <p className="clean-kicker">02</p>
            <h2>{t("services.title")}</h2>
            <p>{t("services.subtitle")}</p>
          </div>

          <div className="clean-skills-modern">
            <div className="clean-panel clean-skills-intro">
              <h3>{t("about.skills_title")}</h3>
              <p>{t("about.subtitle")}</p>

              <ul className="clean-skill-meter-grid">
                {skills.map((skill) => (
                  <li key={skill.name} className="clean-skill-meter-card">
                    <div>
                      <span>{skill.name}</span>
                      <strong>{skill.level}%</strong>
                    </div>
                    <div className="clean-progress">
                      <span style={{ width: `${skill.level}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="clean-skill-cloud">
              {skillChips.map((chip) => (
                <span key={chip} className="clean-tech-pill">
                  {chip}
                </span>
              ))}
            </div>

            <div className="clean-competence-grid">
              {services.map((service) => (
                <article key={service.title} className="clean-panel clean-competence-card">
                  <div className="clean-competence-head">
                    <p className="clean-meta">{service.timeline}</p>
                    <span className="clean-tag">{t("services.timeline_label")}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="clean-deliverable-chips">
                    {service.deliverables.map((item) => (
                      <li key={item} className="clean-deliverable-chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="clean-section clean-reveal">
          <div className="clean-section-heading">
            <p className="clean-kicker">03</p>
            <h2>{t("about.title")}</h2>
            <p>{t("about.subtitle")}</p>
          </div>

          <div className="clean-split">
            <article className="clean-panel">
              <p className="clean-description">{t("about.description")}</p>
            </article>

            <div className="clean-timeline">
              {timeline.map((item) => (
                <article key={`${item.year}-${item.title}`} className="clean-panel">
                  <p className="clean-meta">{item.year}</p>
                  <h3>{item.title}</h3>
                  <p>{item.company}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="blog" className="clean-section clean-reveal">
          <div className="clean-section-heading">
            <p className="clean-kicker">04</p>
            <h2>{t("blog.title")}</h2>
            <p>{t("blog.subtitle")}</p>
          </div>

          <div className="clean-grid">
            {latestPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="clean-card-link">
                <article className="clean-card">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="clean-card-image"
                  />
                  <div className="clean-card-body">
                    <p className="clean-meta">
                      <Calendar size={14} />
                      {formatDate(post.publishedAt, language)}
                      <Clock size={14} />
                      {post.readTime} {t("blog.read_time")}
                    </p>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="clean-read-more">
                      {t("blog.read_more")}
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section id="contact" className="clean-section clean-reveal">
          <div className="clean-contact">
            <div>
              <p className="clean-kicker">05</p>
              <h2>{t("contact.title")}</h2>
              <p>{t("contact.subtitle")}</p>
            </div>

            <div className="clean-contact-actions">
              <a
                href={`mailto:${t("contact.info.email")}`}
                className="clean-primary-button"
              >
                <Mail size={16} />
                {t("contact.form.submit")}
              </a>
              <p className="clean-meta">{t("contact.info.email")}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import type { Category, ProjectFilter, ProjectFilterItem, ProjectItem } from "./types";

interface PortfolioProjectsProps {
  title: string;
  filters: ProjectFilterItem[];
  activeFilter: ProjectFilter;
  categoryLabels: Record<Category, string>;
  featuredProject?: ProjectItem;
  secondaryPrimary?: ProjectItem;
  secondaryCards: ProjectItem[];
  viewCaseStudyLabel: string;
  noResultsLabel: string;
  projectCtaTitle: string;
  projectCtaDescription: string;
  projectCtaAction: string;
  viewMoreLabel: string;
  viewMoreUrl: string;
  onFilterChange: (filter: ProjectFilter) => void;
  onContact: () => void;
}

export function PortfolioProjects({
  title,
  filters,
  activeFilter,
  categoryLabels,
  featuredProject,
  secondaryPrimary,
  secondaryCards,
  viewCaseStudyLabel,
  noResultsLabel,
  projectCtaTitle,
  projectCtaDescription,
  projectCtaAction,
  viewMoreLabel,
  viewMoreUrl,
  onFilterChange,
  onContact,
}: PortfolioProjectsProps) {
  return (
    <section id="projects" className="editorial-section">
      <div className="editorial-section-head scroll-reveal">
        <div>
          <span className="editorial-kicker">Portfolio</span>
          <h2>{title}</h2>
        </div>
        <div className="editorial-filter-row">
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`editorial-filter-btn ${item.key === activeFilter ? "is-active" : ""}`}
              onClick={() => onFilterChange(item.key)}
            >
              {item.label} ({item.value})
            </button>
          ))}
        </div>
      </div>

      {featuredProject ? (
        <div className="editorial-project-grid">
          <article className="editorial-featured-card scroll-reveal">
            <div className="editorial-featured-media">
              <ImageWithFallback
                src={featuredProject.image}
                alt={featuredProject.title}
                className="editorial-cover"
              />
            </div>
            <div className="editorial-featured-body">
              <p className="editorial-meta-line">
                {featuredProject.year} / {categoryLabels[featuredProject.category]}
              </p>
              <h3>{featuredProject.title}</h3>
              <p>{featuredProject.description}</p>
              <div className="editorial-tag-row">
                {featuredProject.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="editorial-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                type="button"
                className="editorial-dark-btn"
                onClick={onContact}
                data-magnetic="true"
              >
                {viewCaseStudyLabel}
                <ArrowUpRight size={16} />
              </button>
            </div>
          </article>

          <div className="editorial-project-subgrid">
            {secondaryPrimary ? (
              <article className="bento-card editorial-project-large scroll-reveal">
                <ImageWithFallback
                  src={secondaryPrimary.image}
                  alt={secondaryPrimary.title}
                  className="editorial-square-cover"
                />
                <div>
                  <span className="editorial-meta-line">
                    {categoryLabels[secondaryPrimary.category]}
                  </span>
                  <h3>{secondaryPrimary.title}</h3>
                </div>
              </article>
            ) : null}

            <div className="editorial-project-stack">
              {secondaryCards.map((project) => (
                <article key={project.id} className="bento-card editorial-project-mini scroll-reveal">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="editorial-mini-cover"
                  />
                  <div>
                    <span className="editorial-meta-line">
                      {categoryLabels[project.category]}
                    </span>
                    <h3>{project.title}</h3>
                  </div>
                </article>
              ))}

              <article className="bento-card editorial-project-cta scroll-reveal">
                <h3>{projectCtaTitle}</h3>
                <p>{projectCtaDescription}</p>
                <button
                  type="button"
                  className="editorial-underline-btn"
                  onClick={onContact}
                >
                  {projectCtaAction}
                </button>
              </article>
            </div>
          </div>
        </div>
      ) : (
        <div className="editorial-empty">{noResultsLabel}</div>
      )}

      <div className="editorial-project-actions scroll-reveal">
        <a
          href={viewMoreUrl}
          target="_blank"
          rel="noreferrer"
          className="editorial-view-more-btn"
          data-magnetic="true"
        >
          {viewMoreLabel}
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}

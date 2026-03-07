import React from "react";
import type { ServiceItem, SkillItem, TimelineItem } from "./types";

interface PortfolioServicesProps {
  title: string;
  skillsTitle: string;
  servicesSubtitle: string;
  quoteText: string;
  skills: SkillItem[];
  services: ServiceItem[];
  timeline: TimelineItem[];
}

export function PortfolioServices({
  title,
  skillsTitle,
  servicesSubtitle,
  quoteText,
  skills,
  services,
  timeline,
}: PortfolioServicesProps) {
  return (
    <section id="services" className="editorial-section">
      <div className="editorial-section-head scroll-reveal">
        <div>
          <span className="editorial-kicker">Skills</span>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="editorial-expertise-grid">
        <article className="bento-card editorial-tech-card scroll-reveal">
          <h3>{skillsTitle}</h3>
          <div className="editorial-skill-circles">
            {skills.map((skill) => (
              <div key={skill.name} className="editorial-skill-item">
                <div
                  className="editorial-skill-ring"
                  style={
                    {
                      "--progress": `${Math.min(Math.max(skill.level, 0), 100)}`,
                    } as React.CSSProperties
                  }
                >
                  <span>{skill.level}%</span>
                </div>
                <small>{skill.name}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="bento-card editorial-services-card scroll-reveal">
          <h3>{servicesSubtitle}</h3>
          <div className="editorial-service-list">
            {services.map((service) => (
              <div key={service.title} className="editorial-service-item">
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="bento-card editorial-timeline-card scroll-reveal">
          <h3>Timeline</h3>
          <div className="editorial-timeline">
            {timeline.map((item) => (
              <div key={`${item.year}-${item.title}`} className="editorial-timeline-item">
                <strong>{item.year}</strong>
                <p>{item.title}</p>
                <small>{item.company}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="bento-card editorial-quote-card scroll-reveal">
          <blockquote>"{quoteText}"</blockquote>
        </article>
      </div>
    </section>
  );
}

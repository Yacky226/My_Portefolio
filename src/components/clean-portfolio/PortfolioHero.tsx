import React from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { ImageWithFallback } from "../ui/ImageWithFallback";

interface PortfolioHeroProps {
  headline: [string, string];
  title: string;
  description: string;
  primaryCtaLabel: string;
  resumeLabel: string;
  profileName: string;
  profileGreeting: string;
  profileLocation: string;
  profileImageAlt: string;
  skillChips: string[];
  onScrollToProjects: () => void;
  onDownloadResume: () => void;
}

export function PortfolioHero({
  headline,
  title,
  description,
  primaryCtaLabel,
  resumeLabel,
  profileName,
  profileGreeting,
  profileLocation,
  profileImageAlt,
  skillChips,
  onScrollToProjects,
  onDownloadResume,
}: PortfolioHeroProps) {
  return (
    <section id="home" className="editorial-hero">
      <div className="scroll-reveal">
        <h1 className="editorial-title">
          {headline[0]} <br />
          <span className="editorial-title-italic">{headline[1]}</span> <br />
        
        </h1>
        <p className="editorial-subtitle">{title}</p>
        <p className="editorial-description">{description}</p>
        <div className="editorial-hero-actions">
          <button
            type="button"
            className="editorial-primary-btn"
            onClick={onScrollToProjects}
            data-magnetic="true"
          >
            {primaryCtaLabel}
            <ArrowUpRight size={16} />
          </button>
          <button
            type="button"
            className="editorial-secondary-btn"
            onClick={onDownloadResume}
            data-magnetic="true"
          >
            <Download size={16} />
            {resumeLabel}
          </button>
        </div>
      </div>

      <div className="editorial-id-wrap scroll-reveal">
        <article className="bento-card editorial-id-card">
          <div className="editorial-id-photo-wrap">
            <ImageWithFallback
              src="/profil.jpg"
              alt={profileImageAlt}
              className="editorial-id-photo"
            />
          </div>
          <h2>{profileName}</h2>

          
        </article>
      </div>
    </section>
  );
}

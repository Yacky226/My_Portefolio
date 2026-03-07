import React from "react";
import { ArrowUp, Mail } from "lucide-react";

interface PortfolioFooterProps {
  email: string;
  contactTitle: string;
  contactCta: string;
  year: number;
  brandName: string;
  resumeLabel: string;
  githubUrl: string;
  linkedinUrl: string;
  onDownloadResume: () => void;
}

export function PortfolioFooter({
  email,
  contactTitle,
  contactCta,
  year,
  brandName,
  resumeLabel,
  githubUrl,
  linkedinUrl,
  onDownloadResume,
}: PortfolioFooterProps) {
  return (
    <footer id="contact" className="editorial-footer">
      <div className="editorial-footer-wrap">
        <div className="editorial-footer-main">
          <div>
            <h2>
              {contactTitle}
              <br />
              <span>{contactCta}</span>
            </h2>
            <div className="editorial-footer-links">
              <a href={`mailto:${email}`} data-magnetic="true">
                {email}
              </a>
            </div>
          </div>

          <div className="editorial-footer-side">
            <button
              type="button"
              className="editorial-back-circle"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
            >
              <ArrowUp size={28} />
            </button>
            <div className="editorial-socials">
              <a href={githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={`mailto:${email}`}>
                <Mail size={14} />
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="editorial-footer-bottom">
          <p>
            {year} - {brandName}
          </p>
          <button type="button" onClick={onDownloadResume}>
            {resumeLabel}
          </button>
        </div>
      </div>
    </footer>
  );
}

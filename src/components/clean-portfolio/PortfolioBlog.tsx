import React from "react";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import type { BlogPost } from "../../data/blogData";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { formatDate } from "./utils";

interface PortfolioBlogProps {
  title: string;
  allPostsLabel: string;
  readTimeLabel: string;
  language: string;
  posts: BlogPost[];
}

export function PortfolioBlog({
  title,
  allPostsLabel,
  readTimeLabel,
  language,
  posts,
}: PortfolioBlogProps) {
  return (
    <section id="blog" className="editorial-section">
      <div className="editorial-section-head scroll-reveal">
        <div>
          <span className="editorial-kicker">Journal</span>
          <h2>{title}</h2>
        </div>
        <span className="editorial-all-posts">{allPostsLabel}</span>
      </div>

      <div className="editorial-blog-row no-scrollbar">
        {posts.map((post, index) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="editorial-post-card scroll-reveal"
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <div className="editorial-post-media">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="editorial-post-cover"
              />
            </div>
            <span className="editorial-post-tag">{post.tags[0]}</span>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <div className="editorial-post-meta">
              <span>
                <Calendar size={13} />
                {formatDate(post.publishedAt, language)}
              </span>
              <span>
                <Clock size={13} />
                {post.readTime} {readTimeLabel}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

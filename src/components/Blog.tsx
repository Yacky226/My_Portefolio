import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { useI18n } from "../hooks/useI18n";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BlogPost, blogPosts } from "../data/blogData";
import { useScrollReveal } from "../hooks/useScrollReveal";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export function Blog() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal<HTMLElement>();

  const featuredPosts = useMemo(
    () => blogPosts.filter((post) => post.featured),
    []
  );
  const recentPosts = useMemo(() => blogPosts.slice(0, 3), []);

  return (
    <section ref={sectionRef} id="blog" className="py-20 md:py-32 section-reveal">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block mb-4">
            <Badge
              className="px-4 py-1.5 text-sm font-semibold"
              style={{
                backgroundColor: "var(--accent-color)",
                color: "white",
              }}
            >
              Blog
            </Badge>
          </div>
          <h2
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
            style={{ color: "var(--text)" }}
          >
            {t("blog.title")}
          </h2>
          <p
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {t("blog.subtitle")}
          </p>
        </div>

        {featuredPosts.length > 0 && (
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-10">
              <div
                className="h-px flex-1"
                style={{ backgroundColor: "var(--border)" }}
              />
              <h3
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "var(--text)" }}
              >
                {t("blog.featured_section_title")}
              </h3>
              <div
                className="h-px flex-1"
                style={{ backgroundColor: "var(--border)" }}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {featuredPosts.map((post) => (
                <FeaturedPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "var(--text)" }}
              >
                {t("blog.latest")}
              </h3>
            </div>
            <Button
              variant="outline"
              className="border-border hover:bg-surface transition-all duration-300 hover:scale-105 hover:border-accent"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              {t("blog.all_posts")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {recentPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-32">
          <Card
            className="relative overflow-hidden border-border"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 pointer-events-none" />
            <CardContent className="relative p-8 md:p-16 text-center">
              <div className="max-w-2xl mx-auto">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                  style={{ backgroundColor: "var(--accent-color)" }}
                >
                  <span className="text-3xl">✉</span>
                </div>
                <h3
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: "var(--text)" }}
                >
                  {t("blog.newsletter.title")}
                </h3>
                <p
                  className="text-base md:text-lg text-muted mb-8 leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {t("blog.newsletter.description")}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder={t("blog.newsletter.email_placeholder")}
                    autoComplete="email"
                    id="email-subscribe"
                    className="flex-1 px-5 py-4 rounded-xl border-2 border-border bg-background text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                    }}
                  />
                  <Button
                    className="font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{
                      backgroundColor: "var(--accent-color)",
                      color: "white",
                    }}
                  >
                    {t("blog.newsletter.subscribe")}
                  </Button>
                </div>

                <p
                  className="text-sm text-muted mt-6"
                  style={{ color: "var(--muted)" }}
                >
                  {t("blog.newsletter.no_spam")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

interface FeaturedPostCardProps {
  post: BlogPost;
}

function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  const { t } = useI18n();

  return (
    <Link to={`/blog/${post.id}`} className="block group">
      <Card
        className="cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-border bg-surface overflow-hidden h-full"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="relative overflow-hidden">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-72 object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute top-4 left-4">
            <Badge
              className="px-3 py-1.5 font-semibold shadow-lg"
              style={{
                backgroundColor: "var(--accent-color)",
                color: "white",
              }}
            >
              {t("blog.featured_label")}
            </Badge>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <CardContent className="p-6 md:p-8">
          <div className="space-y-5">
            <div className="flex items-center gap-4 text-sm text-muted">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>
                  {post.readTime} {t("blog.read_time")}
                </span>
              </div>
            </div>

            <h3
              className="text-xl md:text-2xl font-bold group-hover:text-accent transition-colors duration-300 leading-tight"
              style={{ color: "var(--text)" }}
            >
              {post.title}
            </h3>

            <p
              className="text-muted leading-relaxed text-sm md:text-base"
              style={{ color: "var(--muted)" }}
            >
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-3 py-1 bg-background border border-border hover:border-accent transition-colors"
                  style={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            <Button
              variant="ghost"
              className="p-0 h-auto font-semibold group-hover:translate-x-2 transition-all duration-300 flex items-center gap-2"
              style={{ color: "var(--accent-color)" }}
            >
              {t("blog.read_more")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

interface BlogPostCardProps {
  post: BlogPost;
}

function BlogPostCard({ post }: BlogPostCardProps) {
  const { t } = useI18n();

  return (
    <Link to={`/blog/${post.id}`} className="block group h-full">
      <Card
        className="cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl border-border bg-surface h-full flex flex-col"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <CardHeader className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <ImageWithFallback
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </CardHeader>

        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="space-y-4 flex-1 flex flex-col">
            <div className="flex items-center justify-between text-sm text-muted">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {post.readTime} {t("blog.read_time")}
                </span>
              </div>
            </div>

            <h3
              className="text-lg md:text-xl font-bold group-hover:text-accent transition-colors duration-300 line-clamp-2 leading-tight"
              style={{ color: "var(--text)" }}
            >
              {post.title}
            </h3>

            <p
              className="text-sm text-muted leading-relaxed line-clamp-3 flex-1"
              style={{ color: "var(--muted)" }}
            >
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-2.5 py-1 bg-background border border-border hover:border-accent transition-colors"
                  style={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                >
                  #{tag}
                </Badge>
              ))}
              {post.tags.length > 2 && (
                <Badge
                  variant="secondary"
                  className="text-xs px-2.5 py-1 bg-background border border-border"
                  style={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    color: "var(--muted)",
                  }}
                >
                  +{post.tags.length - 2}
                </Badge>
              )}
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <p
                className="text-xs text-muted"
                style={{ color: "var(--muted)" }}
              >
                {formatDate(post.publishedAt)}
              </p>
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                style={{ color: "var(--accent-color)" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

import React, { useState, useMemo } from "react";
import { ExternalLink, Github, Search, Filter, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useI18n } from "../hooks/useI18n";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  category: "web" | "mobile" | "backend";
  year: number;
  impact: string;
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
}

const BASE_PROJECTS_META: Array<
  Pick<
    Project,
    | "id"
    | "image"
    | "category"
    | "year"
    | "demoUrl"
    | "githubUrl"
    | "caseStudyUrl"
    | "featured"
  >
> = [
    {
      id: "1",
      image: "/affiche.jpg",
      category: "web",
      year: 2025,
      featured: true,
    },
    {
      id: "2",
      image: "/jeja.jpg",
      category: "web",
      year: 2025,
      featured: true,
    },
    {
      id: "3",
      image: "/maze.jpeg",
      category: "web",
      year: 2023,
      featured: true,
    },
    {
      id: "4",
      image: "/gladiator.jpg",
      category: "web",
      year: 2023,
      featured: false,
    },
    {
      id: "5",
      image: "/Unplash.webp",
      category: "web",
      year: 2025,
      featured: false,
    },
    {
      id: "6",
      image: "/congestion.jpeg",
      category: "web",
      year: 2025,
      featured: false,
    },
    {
      id: "7",
      image: "/mini-commerce.jpeg",
      category: "backend",
      year: 2025,
      featured: false,
    },
    {
      id: "8",
      image: "/chat.jpeg",
      category: "web",
      year: 2025,
      featured: false,
    },
    {
      id: "9",
      image: "/reporting.webp",
      category: "backend",
      year: 2025,
      featured: false,
    },
  ];

export function Projects() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal<HTMLElement>();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "web" | "mobile" | "backend"
  >("all");

  const projects: Project[] = useMemo(
    () =>
      BASE_PROJECTS_META.map((meta) => {
        const id = meta.id;
        const title = t(`projects.data.${id}.title`);
        const description = t(`projects.data.${id}.description`);
        // tags stored as "Tag1|Tag2|Tag3" in translations
        const tagsRaw = t(`projects.data.${id}.tags`);
        const tags =
          typeof tagsRaw === "string" && tagsRaw.length > 0
            ? tagsRaw.split("|").map((s) => s.trim())
            : [];
        const impact = t(`projects.data.${id}.impact`);
        return {
          id,
          title,
          description,
          image: meta.image,
          tags,
          category: meta.category,
          year: meta.year,
          impact,
          demoUrl: meta.demoUrl,
          githubUrl: meta.githubUrl,
          caseStudyUrl: meta.caseStudyUrl,
          featured: meta.featured,
        };
      }),
    [t]
  );

  const filters = useMemo(
    () => [
      { key: "all", label: t("projects.filter_all") },
      { key: "web", label: t("projects.filter_web") },
      { key: "mobile", label: t("projects.filter_mobile") },
      { key: "backend", label: t("projects.filter_backend") },
    ],
    [t]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        project.impact.toLowerCase().includes(q);

      const matchesFilter =
        activeFilter === "all" || project.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [projects, searchTerm, activeFilter]);

  const featuredProjects = useMemo(
    () => projects.filter((p) => p.featured).slice(0, 3),
    [projects]
  );

  return (
    <section ref={sectionRef} id="projects" className="py-20 section-reveal">
      <div className="container">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "var(--text)" }}
          >
            {t("projects.title")}
          </h2>
          <p
            className="text-xl text-muted max-w-3xl mx-auto"
            style={{ color: "var(--muted)" }}
          >
            {t("projects.subtitle")}
          </p>
        </div>

        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
              <Input
                type="text"
                id="project-search"
                placeholder={t("projects.search_placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-surface border-border"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted mr-2" />
              {filters.map((filter) => (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.key as any)}
                  className={`transition-all duration-200 ${activeFilter === filter.key
                    ? "bg-accent text-bg"
                    : "border-border hover:bg-surface"
                    }`}
                  style={{
                    backgroundColor:
                      activeFilter === filter.key
                        ? "var(--accent)"
                        : "transparent",
                    borderColor: "var(--border)",
                    color:
                      activeFilter === filter.key ? "var(--bg)" : "var(--text)",
                  }}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p
                className="text-muted text-lg"
                style={{ color: "var(--muted)" }}
              >
                {t("projects.no_results")}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const { t } = useI18n();

  const moreTagsText =
    project.tags.length > 3
      ? t("projects.more_tags").replace(
        "{count}",
        String(project.tags.length - 3)
      )
      : null;

  return (
    <Card
      className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-border bg-surface ${featured ? "ring-2 ring-accent/20" : ""
        }`}
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {project.githubUrl && (
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="outline"
                className="bg-surface/80 backdrop-blur-sm border-border text-text p-2"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  window.open(project.githubUrl, "_blank");
                }}
                aria-label={t("projects.aria_view_source")}
              >
                <Github className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h3
              className="text-xl font-semibold group-hover:text-accent transition-colors"
              style={{ color: "var(--text)" }}
            >
              {project.title}
            </h3>
            <span
              className="text-sm text-muted"
              style={{ color: "var(--muted)" }}
            >
              {project.year}
            </span>
          </div>

          <p
            className="text-muted leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-bg border-border"
                style={{
                  backgroundColor: "var(--bg)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                {tag}
              </Badge>
            ))}
            {moreTagsText && (
              <Badge
                variant="secondary"
                className="text-xs bg-bg border-border"
                style={{
                  backgroundColor: "var(--bg)",
                  borderColor: "var(--border)",
                  color: "var(--muted)",
                }}
              >
                {moreTagsText}
              </Badge>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            {project.caseStudyUrl && (
              <Button
                size="sm"
                className="bg-accent hover:bg-accent-2 text-bg font-medium flex-1"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  window.location.href = project.caseStudyUrl!;
                }}
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--bg)",
                }}
              >
                {t("projects.view_case_study")}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}

            {project.demoUrl && (
              <Button
                size="sm"
                variant="outline"
                className="border-border hover:bg-surface"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  window.open(project.demoUrl, "_blank");
                }}
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                {t("projects.live_demo")}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import type { NavItem, ProjectMeta } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { id: "projects", labelKey: "navigation.projects" },
  { id: "services", labelKey: "navigation.services" },
  { id: "blog", labelKey: "navigation.blog" },
];

export const PROJECTS_META: ProjectMeta[] = [
  {
    id: "2",
    image: "/jeja.jpg",
    year: 2025,
    category: "web",
    featured: true,
    imageFit: "contain",
    imagePosition: "center top",
  },
  {
    id: "3",
    image: "/maze.jpeg",
    year: 2023,
    category: "web",
    featured: true,
    imageFit: "contain",
    imagePosition: "center",
  },
  { id: "4", image: "/gladiator.jpg", year: 2023, category: "web", featured: false },
  {
    id: "5",
    image: "/Unplash.webp",
    year: 2025,
    category: "web",
    featured: false,
    imageFit: "contain",
    imagePosition: "center",
  },
  { id: "6", image: "/congestion.jpeg", year: 2025, category: "web", featured: false },
  { id: "7", image: "/mini-commerce.jpeg", year: 2025, category: "backend", featured: false },
  { id: "8", image: "/chat.jpeg", year: 2025, category: "backend", featured: false },
  { id: "9", image: "/reporting.webp", year: 2025, category: "backend", featured: false },
  { id: "10", image: "/parkourt.avif", year: 2025, category: "mobile", featured: true },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/Yacky226",
  linkedin: "https://www.linkedin.com/in/yacouba52",
};

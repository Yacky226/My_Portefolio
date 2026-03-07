export type Category = "web" | "mobile" | "backend";
export type ProjectFilter = "all" | Category;

export interface NavItem {
  id: string;
  labelKey: string;
}

export interface ProjectMeta {
  id: string;
  image: string;
  year: number;
  category: Category;
  featured: boolean;
}

export interface ProjectItem extends ProjectMeta {
  title: string;
  description: string;
  tags: string[];
  impact: string;
}

export interface ProjectFilterItem {
  key: ProjectFilter;
  label: string;
  value: number;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
}

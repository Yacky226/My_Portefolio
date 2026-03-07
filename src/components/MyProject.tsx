import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Search, Filter, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { useI18n } from '../hooks/useI18n';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: 'web' | 'mobile' | 'backend';
  year: number;
  impact: string;
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
}

interface ProjectsProps {
  onViewProject?: (project: Project) => void;
}

export function Projects({ onViewProject }: ProjectsProps) {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock project data - in a real app, this would come from an API
  const projects: Project[] = [
    {
      id: '1',
      title: 'Student Management System',
      description: 'Full-stack web application for university course registration and grade management. Built as capstone project with team of 4 students.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBvbmxpbmV8ZW58MXx8fHwxNzU4Mjk3OTM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['React', 'Node.js', 'MySQL', 'Express', 'Bootstrap'],
      category: 'web',
      year: 2024,
      impact: 'Grade A+ achieved',
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/alex/student-system',
      caseStudyUrl: '#case-study-1',
      featured: true
    },
    {
      id: '2',
      title: 'Budget Tracker Mobile App',
      description: 'Personal finance management app built during mobile development course. Features expense tracking, budgeting, and spending analytics.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBmaW5hbmNlJTIwYnVkZ2V0fGVufDF8fHx8MTc1ODI4Mzc0OHww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['React Native', 'SQLite', 'Chart.js', 'AsyncStorage'],
      category: 'mobile',
      year: 2024,
      impact: 'Featured in course showcase',
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/alex/budget-tracker',
      featured: true
    },
    {
      id: '3',
      title: 'Algorithm Visualizer',
      description: 'Interactive web application that visualizes sorting and searching algorithms. Built to help fellow students understand data structures.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGdvcml0aG0lMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc1ODE5Mjg2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['JavaScript', 'D3.js', 'HTML5', 'CSS3', 'GitHub Pages'],
      category: 'web',
      year: 2023,
      impact: '500+ student users',
      demoUrl: 'https://alex.github.io/algo-viz',
      githubUrl: 'https://github.com/alex/algo-visualizer',
      caseStudyUrl: '#case-study-3',
      featured: true
    },
    {
      id: '4',
      title: 'REST API with Authentication',
      description: 'Backend service for task management with user authentication, JWT tokens, and comprehensive API documentation.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger', 'Jest'],
      category: 'backend',
      year: 2023,
      impact: '95% test coverage',
      githubUrl: 'https://github.com/alex/task-api',
      featured: false
    },
    {
      id: '5',
      title: 'Hackathon Project - EcoTracker',
      description: 'Environmental impact tracking app built in 48 hours. Won "Best Use of Technology" award at university hackathon.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      tags: ['Vue.js', 'Firebase', 'Chart.js', 'PWA', 'Netlify'],
      category: 'web',
      year: 2023,
      impact: 'Hackathon winner',
      demoUrl: 'https://eco-tracker.netlify.app',
      githubUrl: 'https://github.com/alex/eco-tracker',
      featured: false
    },
    {
      id: '6',
      title: 'Open Source Contribution',
      description: 'Contributed bug fixes and new features to popular React component library. First meaningful open source contribution.',
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      tags: ['React', 'TypeScript', 'Storybook', 'Jest', 'GitHub Actions'],
      category: 'web',
      year: 2024,
      impact: '3 PRs merged',
      githubUrl: 'https://github.com/component-lib/react-components',
      featured: false
    },
    {
      id: '7',
      title: 'Machine Learning Study Tool',
      description: 'Python application that uses NLP to generate quiz questions from study materials. Final project for AI course.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      tags: ['Python', 'NLTK', 'Tkinter', 'Machine Learning', 'NLP'],
      category: 'backend',
      year: 2023,
      impact: 'Top 5% in class',
      githubUrl: 'https://github.com/alex/ml-study-tool',
      featured: false
    },
    {
      id: '8',
      title: 'Portfolio Website',
      description: 'Personal portfolio website showcasing projects and skills. Built with modern web technologies and responsive design.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'i18n', 'Accessibility'],
      category: 'web',
      year: 2024,
      impact: 'WCAG AA compliant',
      demoUrl: 'https://alex-portfolio.dev',
      githubUrl: 'https://github.com/alex/portfolio',
      featured: false
    }
  ];

  const filters = [
    { key: 'all', label: t('projects.filter.all') },
    { key: 'web', label: t('projects.filter.web') },
    { key: 'mobile', label: t('projects.filter.mobile') },
    { key: 'backend', label: t('projects.filter.backend') }
  ];

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [projects, searchTerm, activeFilter]);

  // Featured projects (first 3)
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <section id="projects" className="py-20">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text)' }}>
            {t('projects.title')}
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto" style={{ color: 'var(--muted)' }}>
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured onViewProject={onViewProject} />
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
              <Input
                type="text"
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-surface border-border"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)'
                }}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted mr-2" />
              {filters.map((filter) => (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.key)}
                  className={`transition-all duration-200 ${
                    activeFilter === filter.key
                      ? 'bg-accent text-bg'
                      : 'border-border hover:bg-surface'
                  }`}
                  style={{
                    backgroundColor: activeFilter === filter.key ? 'var(--accent)' : 'transparent',
                    borderColor: 'var(--border)',
                    color: activeFilter === filter.key ? 'var(--bg)' : 'var(--text)'
                  }}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* All Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onViewProject={onViewProject} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted text-lg" style={{ color: 'var(--muted)' }}>
                {t('projects.empty_state.title')}
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
  onViewProject?: (project: Project) => void;
}

function ProjectCard({ project, featured = false, onViewProject }: ProjectCardProps) {
  const { t } = useI18n();

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-border bg-surface ${
        featured ? 'ring-2 ring-accent/20' : ''
      }`}
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)'
      }}
      onClick={() => project.caseStudyUrl && onViewProject?.(project)}
    >
      <CardHeader className="p-0">
        {/* Project Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.demoUrl && (
              <Button
                size="sm"
                className="bg-accent hover:bg-accent-2 text-bg p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.demoUrl, '_blank');
                }}
                aria-label="View live demo"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
            {project.githubUrl && (
              <Button
                size="sm"
                variant="outline"
                className="bg-surface/80 backdrop-blur-sm border-border text-text p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.githubUrl, '_blank');
                }}
                aria-label="View source code"
              >
                <Github className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 left-4">
              <Badge 
                className="bg-accent text-bg font-semibold"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg)'
                }}
              >
                {t('common.featured')}
              </Badge>
            </div>
          )}
          
          {/* Impact Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge 
              variant="outline" 
              className="bg-surface/80 backdrop-blur-sm border-border text-text"
              style={{
                backgroundColor: 'rgba(11, 18, 32, 0.8)',
                borderColor: 'var(--border)',
                color: 'var(--text)'
              }}
            >
              {project.impact}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Title and Year */}
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-semibold group-hover:text-accent transition-colors" style={{ color: 'var(--text)' }}>
              {project.title}
            </h3>
            <span className="text-sm text-muted" style={{ color: 'var(--muted)' }}>
              {project.year}
            </span>
          </div>

          {/* Description */}
          <p className="text-muted leading-relaxed" style={{ color: 'var(--muted)' }}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="text-xs bg-bg border-border"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)'
                }}
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge 
                variant="secondary"
                className="text-xs bg-bg border-border"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border)',
                  color: 'var(--muted)'
                }}
              >
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {project.caseStudyUrl && (
              <Button
                size="sm"
                className="bg-accent hover:bg-accent-2 text-bg font-medium flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewProject?.(project);
                }}
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg)'
                }}
              >
                {t('projects.actions.case_study')}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
            
            {project.demoUrl && (
              <Button
                size="sm"
                variant="outline"
                className="border-border hover:bg-surface"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.demoUrl, '_blank');
                }}
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--text)'
                }}
              >
                {t('projects.actions.live_demo')}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
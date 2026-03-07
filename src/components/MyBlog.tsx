import React from 'react';
import { Clock, ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { useI18n } from '../hooks/useI18n';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: Date;
  readTime: number;
  tags: string[];
  featured: boolean;
}

// Move formatDate outside as a utility function
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

interface BlogProps {
  onViewPost?: (post: BlogPost) => void;
}

export function Blog({ onViewPost }: BlogProps) {
  const { t } = useI18n();

  // Mock blog posts - in a real app, this would come from a CMS or API
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'My Journey Learning React and TypeScript',
      excerpt: 'A student\'s perspective on learning modern web development. Challenges faced, resources used, and lessons learned during my first year with React.',
      content: '',
      image: 'https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwYmxvZyUyMHdyaXRpbmclMjBjb2Rpbmd8ZW58MXx8fHwxNzU4MzAzNTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      author: 'Alex',
      publishedAt: new Date('2024-01-15'),
      readTime: 6,
      tags: ['React', 'TypeScript', 'Learning'],
      featured: true
    },
    {
      id: '2',
      title: 'Building My First Full-Stack Application',
      excerpt: 'From concept to deployment: how I built my capstone project. Technologies used, challenges overcome, and what I learned about software architecture.',
      content: '',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      author: 'Alex',
      publishedAt: new Date('2024-01-10'),
      readTime: 8,
      tags: ['Full-Stack', 'Project', 'Learning'],
      featured: true
    },
    {
      id: '3',
      title: 'Internship Experience: From Theory to Practice',
      excerpt: 'What it\'s really like working as a software engineering intern. The gap between academic learning and real-world development.',
      content: '',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      author: 'Alex',
      publishedAt: new Date('2024-01-05'),
      readTime: 5,
      tags: ['Internship', 'Career', 'Experience'],
      featured: false
    },
    {
      id: '4',
      title: 'Preparing for Technical Interviews as a Student',
      excerpt: 'My study plan and resources for technical interviews. Data structures, algorithms, and coding practice that actually helped.',
      content: '',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      author: 'Alex',
      publishedAt: new Date('2023-12-28'),
      readTime: 7,
      tags: ['Interviews', 'Career', 'Study Tips'],
      featured: false
    },
    {
      id: '5',
      title: 'Contributing to Open Source as a Student',
      excerpt: 'How I made my first open source contributions and what I learned about collaborative development and the tech community.',
      content: '',
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      author: 'Alex',
      publishedAt: new Date('2023-12-20'),
      readTime: 4,
      tags: ['Open Source', 'GitHub', 'Community'],
      featured: false
    },
    {
      id: '6',
      title: 'Hackathon Wins and Lessons Learned',
      excerpt: 'Reflecting on my hackathon experiences - the good, the bad, and the valuable lessons learned about rapid prototyping and teamwork.',
      content: '',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      author: 'Alex',
      publishedAt: new Date('2023-11-15'),
      readTime: 6,
      tags: ['Hackathon', 'Teamwork', 'Innovation'],
      featured: false
    }
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-20">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text)' }}>
            {t('blog.title')}
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto" style={{ color: 'var(--muted)' }}>
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>
              Featured Articles
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <FeaturedPostCard key={post.id} post={post} onViewPost={onViewPost} />
              ))}
            </div>
          </div>
        )}

        {/* Recent Posts */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
              {t('blog.latest')}
            </h3>
            <Button
              variant="outline"
              className="border-border hover:bg-surface"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--text)'
              }}
            >
              {t('blog.all_posts')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} onViewPost={onViewPost} />
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card 
            className="bg-surface border-border"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)'
            }}
          >
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                Stay Updated
              </h3>
              <p className="text-muted mb-8 max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
                Get the latest articles and insights about web development, technology trends, and best practices delivered to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-bg text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
                  style={{
                    backgroundColor: 'var(--bg)',
                    borderColor: 'var(--border)',
                    color: 'var(--text)'
                  }}
                />
                <Button
                  className="bg-accent hover:bg-accent-2 text-bg font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--bg)'
                  }}
                >
                  Subscribe
                </Button>
              </div>
              
              <p className="text-xs text-muted mt-4" style={{ color: 'var(--muted)' }}>
                No spam, unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

interface FeaturedPostCardProps {
  post: BlogPost;
  onViewPost?: (post: BlogPost) => void;
}

function FeaturedPostCard({ post, onViewPost }: FeaturedPostCardProps) {
  const { t } = useI18n();

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-border bg-surface overflow-hidden"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)'
      }}
      onClick={() => onViewPost?.(post)}
    >
      <div className="relative">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Featured Badge */}
        <div className="absolute top-4 left-4">
          <Badge 
            className="bg-accent text-bg font-semibold"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg)'
            }}
          >
            Featured
          </Badge>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-sm text-muted">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} {t('blog.read_time')}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold group-hover:text-accent transition-colors" style={{ color: 'var(--text)' }}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted leading-relaxed" style={{ color: 'var(--muted)' }}>
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
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
          </div>

          {/* Read More */}
          <Button
            variant="ghost"
            className="p-0 h-auto font-semibold text-accent hover:text-accent-2 group-hover:translate-x-1 transition-all"
            style={{ color: 'var(--accent)' }}
            onClick={(e) => {
              e.stopPropagation();
              onViewPost?.(post);
            }}
          >
            {t('blog.read_more')}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface BlogPostCardProps {
  post: BlogPost;
  onViewPost?: (post: BlogPost) => void;
}

function BlogPostCard({ post, onViewPost }: BlogPostCardProps) {
  const { t } = useI18n();

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-border bg-surface"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)'
      }}
      onClick={() => onViewPost?.(post)}
    >
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-muted">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime} {t('blog.read_time')}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold group-hover:text-accent transition-colors line-clamp-2" style={{ color: 'var(--text)' }}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted leading-relaxed line-clamp-3" style={{ color: 'var(--muted)' }}>
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 2).map((tag) => (
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
            {post.tags.length > 2 && (
              <Badge 
                variant="secondary"
                className="text-xs bg-bg border-border"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border)',
                  color: 'var(--muted)'
                }}
              >
                +{post.tags.length - 2}
              </Badge>
            )}
          </div>

          {/* Date */}
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted" style={{ color: 'var(--muted)' }}>
              {formatDate(post.publishedAt)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useI18n } from '../hooks/useI18n';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BlogPost as BlogPostType, blogPosts } from '../data/blogData';

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export function BlogPost() {
  const { t } = useI18n();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id === id);
    setPost(foundPost || null);
    setLoading(false);
  }, [id]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        Article not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container py-20">
       {/* Bouton de retour : marginTop fixe en pixels (ne dépend pas de Tailwind purge) */}
        <div style={{ marginTop: '20px', marginBottom: '32px' }}>
          <Button variant="ghost" onClick={handleBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t ? t('blog.back') ?? 'Retour' : 'Retour'}
          </Button>
        </div>



        {/* Contenu de l'article */}
        <article className="max-w-4xl mx-auto">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover rounded-lg mb-8 shadow-lg"
          />

          <div className="space-y-6 mb-8">
            <div className="flex items-center space-x-4 text-sm text-muted">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min de lecture</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold" style={{ color: 'var(--text)' }}>
              {post.title}
            </h1>

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
          </div>

          <Card className="bg-surface border-border">
            <CardContent
              className="p-8 prose prose-invert max-w-none prose-headings:text-text prose-p:text-muted prose-li:text-muted"
              style={{ color: 'var(--text)' }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Card>
        </article>
      </main>
    </div>
  );
}

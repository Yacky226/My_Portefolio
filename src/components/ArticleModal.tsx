// src/components/ArticleModal.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Modal } from './Modal';
import { Button } from './ui/button';
import { ArrowLeft, Share2, X } from 'lucide-react';
import { buildPostsFromI18n, formatDate } from '../lib/helpers';
import { useI18n } from '../hooks/useI18n';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Props = {
  postId: string;
  onClose?: () => void;
};

export function ArticleModal({ postId, onClose }: Props) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const posts = useMemo(() => buildPostsFromI18n(t), [t]);
  const post = posts.find(p => p.id === postId) ?? posts[0];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const safeHtml = useMemo(() => DOMPurify.sanitize(post.content || ''), [post.content]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const total = Math.max(1, el.scrollHeight - el.clientHeight);
      const scrolled = el.scrollTop;
      setProgress(Math.max(0, Math.min(100, Math.round((scrolled / total) * 100))));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll as EventListener);
  }, []);

  const close = () => {
    if (onClose) onClose();
    else navigate(-1);
  };

  return (
    <Modal onClose={close} ariaLabel={post.title}>
      <div className="sticky top-0 bg-surface/80 backdrop-blur-sm border-b border-border z-20">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={close} className="p-0"><ArrowLeft className="w-4 h-4" /></Button>
            <div className="text-sm text-muted">{formatDate(post.publishedAt)} • {post.readTime} {t('blog.read_time')}</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-36 h-1 bg-border rounded overflow-hidden" aria-hidden>
              <div style={{ width: `${progress}%` }} className="h-1 bg-accent transition-all" />
            </div>
            <Button variant="ghost" onClick={close}><X className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="p-6 article-modal-content">
        <div className="rounded-lg overflow-hidden mb-6">
          <ImageWithFallback src={post.image} alt={post.title} className="w-full h-64 object-cover rounded" />
        </div>

        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted mb-4">
            <div>{post.author}</div>
            <div>{formatDate(post.publishedAt)}</div>
          </div>
        </header>

        <div className="article-content prose max-w-none" dangerouslySetInnerHTML={{ __html: safeHtml }} />

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <Button variant="outline" onClick={close}>{t('common.close') || 'Close'}</Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => { navigator.clipboard?.writeText(window.location.href); alert(t('blog.share.copied') || 'Link copied'); }}>
              <Share2 className="w-4 h-4 mr-2" /> {t('blog.share.copy') || 'Copy link'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

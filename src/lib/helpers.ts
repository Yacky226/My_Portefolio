// src/lib/helpers.ts
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  publishedAt: Date;
  readTime: number;
  tags: string[];
  featured: boolean;
}

export const formatDate = (isoOrDate: string | Date) => {
  const date = typeof isoOrDate === 'string' ? new Date(isoOrDate) : isoOrDate;
  return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
};

export function buildPostsFromI18n(t: (k: string) => any): BlogPost[] {
  const baseMeta: { id: string; image?: string }[] = [
    { id: '1', image: 'https://images.unsplash.com/photo-1649451844813-3130d6f42f8a' },
    { id: '2', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3' },
    { id: '3', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f' },
    { id: '4', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa' },
    { id: '5', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb' },
    { id: '6', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09' }
  ];

  return baseMeta.map(meta => {
    const id = meta.id;
    const title = t(`blog.data.${id}.title`);
    const excerpt = t(`blog.data.${id}.excerpt`);
    const content = t(`blog.data.${id}.content`);
    const author = t(`blog.data.${id}.author`);
    const dateStr = t(`blog.data.${id}.publishedAt`);
    const publishedAt = dateStr ? new Date(dateStr) : new Date();
    const readTimeRaw = t(`blog.data.${id}.readTime`);
    const readTime = typeof readTimeRaw === 'string' ? Number(readTimeRaw) : Number(readTimeRaw || 0);
    const tagsRaw = t(`blog.data.${id}.tags`);
    const tags: string[] = Array.isArray(tagsRaw)
      ? tagsRaw
      : (typeof tagsRaw === 'string' && tagsRaw.length > 0 ? tagsRaw.split('|').map((s: string) => s.trim()) : []);
    const featuredRaw = t(`blog.data.${id}.featured`);
    const featured = featuredRaw === true || featuredRaw === 'true' || featuredRaw === 1;

    return { id, title, excerpt, content, image: meta.image, author, publishedAt, readTime, tags, featured } as BlogPost;
  });
}

export function extractHeadingsFromHtml(html: string) {
  if (typeof window === 'undefined') return [] as { id: string; text: string; level: number }[];
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const nodes = doc.querySelectorAll('h2, h3');
    const headings: { id: string; text: string; level: number }[] = [];
    nodes.forEach((n, i) => {
      const text = n.textContent || `heading-${i}`;
      const id = n.id || text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `heading-${i}`;
      n.id = id;
      headings.push({ id, text, level: n.tagName === 'H2' ? 2 : 3 });
    });
    return headings;
  } catch {
    return [];
  }
}

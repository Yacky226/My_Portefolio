import React from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Tag, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
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

interface BlogPostProps {
  post: BlogPost;
  onBack: () => void;
}

// Mock blog post content - in a real app, this would come from a CMS
const getFullContent = (postId: string): string => {
  const contents: Record<string, string> = {
    '1': `
      <p>Learning React and TypeScript as a student has been one of the most rewarding experiences of my academic journey. When I first started, I was overwhelmed by the ecosystem and the seemingly endless concepts to master.</p>
      
      <h2>The Beginning</h2>
      <p>My journey started in my second year when I took a web development course. Initially, I was comfortable with vanilla JavaScript and HTML/CSS, but React felt like a completely different beast. The concept of components, state management, and the virtual DOM were foreign to me.</p>
      
      <h2>First Challenges</h2>
      <p>The biggest challenge was understanding the React lifecycle and hooks. I remember spending hours debugging why my useEffect was causing infinite re-renders. Here are some of the key hurdles I faced:</p>
      
      <ul>
        <li><strong>State Management:</strong> Understanding when to use useState vs useReducer vs context</li>
        <li><strong>Component Design:</strong> Learning how to break down complex UIs into reusable components</li>
        <li><strong>TypeScript Integration:</strong> Adding type safety without making the code overly complex</li>
        <li><strong>Performance Optimization:</strong> When and how to use React.memo, useMemo, and useCallback</li>
      </ul>
      
      <h2>Resources That Helped</h2>
      <p>Throughout my learning journey, I discovered several invaluable resources:</p>
      
      <ul>
        <li><strong>Official Documentation:</strong> Both React and TypeScript docs are exceptionally well written</li>
        <li><strong>Kent C. Dodds' Blog:</strong> His testing philosophy changed how I approach component testing</li>
        <li><strong>TypeScript Handbook:</strong> Essential for understanding advanced TypeScript patterns</li>
        <li><strong>React DevTools:</strong> Game-changer for debugging and performance analysis</li>
      </ul>
      
      <h2>Building Projects</h2>
      <p>The real learning happened when I started building projects. My first real project was a simple todo app, but it taught me:</p>
      
      <ul>
        <li>How to structure a React application</li>
        <li>Managing complex state across multiple components</li>
        <li>Creating custom hooks for reusable logic</li>
        <li>Implementing proper error boundaries</li>
      </ul>
      
      <h2>Current Understanding</h2>
      <p>After two years of learning and building, I now feel confident working with React and TypeScript. Some key insights I've gained:</p>
      
      <ul>
        <li><strong>Composition over Inheritance:</strong> React's component model really shines when you embrace composition</li>
        <li><strong>TypeScript is Worth It:</strong> The initial overhead pays dividends in large applications</li>
        <li><strong>Testing is Essential:</strong> Writing tests from the beginning saves countless hours of debugging</li>
        <li><strong>Performance Matters:</strong> But premature optimization is still the root of all evil</li>
      </ul>
      
      <h2>Advice for Other Students</h2>
      <p>If you're just starting your React/TypeScript journey, here's my advice:</p>
      
      <ol>
        <li><strong>Start with the Basics:</strong> Make sure you understand JavaScript fundamentals first</li>
        <li><strong>Build, Build, Build:</strong> Nothing beats hands-on experience</li>
        <li><strong>Read Other People's Code:</strong> GitHub is a goldmine of learning opportunities</li>
        <li><strong>Join the Community:</strong> The React community is incredibly welcoming and helpful</li>
        <li><strong>Don't Rush TypeScript:</strong> Learn React first, then gradually add TypeScript</li>
      </ol>
      
      <h2>Looking Forward</h2>
      <p>My learning journey continues. I'm currently exploring Next.js for full-stack development and diving deeper into advanced TypeScript patterns. The React ecosystem keeps evolving, and that's what makes it exciting.</p>
      
      <p>The key is to stay curious, keep building, and never stop learning. Every project teaches you something new, and every bug you fix makes you a better developer.</p>
    `,
    '2': `
      <p>Building my capstone project was a transformative experience that bridged the gap between academic learning and real-world software development. This full-stack application became the culmination of everything I had learned throughout my degree.</p>
      
      <h2>Project Overview</h2>
      <p>The project was a comprehensive student management system designed to handle course registration, grade tracking, and academic planning. What started as a simple CRUD application evolved into a complex system with real-time features and advanced analytics.</p>
      
      <h2>Technology Stack</h2>
      <p>After careful consideration, I chose a modern tech stack that would showcase my skills:</p>
      
      <ul>
        <li><strong>Frontend:</strong> React with TypeScript for type safety</li>
        <li><strong>Backend:</strong> Node.js with Express for the REST API</li>
        <li><strong>Database:</strong> PostgreSQL for data persistence</li>
        <li><strong>Authentication:</strong> JWT with refresh token rotation</li>
        <li><strong>Real-time:</strong> Socket.io for live notifications</li>
        <li><strong>Deployment:</strong> Docker containers on AWS</li>
      </ul>
      
      <h2>Architecture Decisions</h2>
      <p>One of the most challenging aspects was designing the system architecture. I spent weeks researching and planning:</p>
      
      <ul>
        <li><strong>Database Design:</strong> Normalized schema with proper indexing strategies</li>
        <li><strong>API Design:</strong> RESTful endpoints with consistent error handling</li>
        <li><strong>State Management:</strong> Redux Toolkit for complex client-side state</li>
        <li><strong>Authentication Flow:</strong> Secure token management with automatic refresh</li>
      </ul>
      
      <h2>Major Challenges</h2>
      
      <h3>Database Performance</h3>
      <p>As the application grew, I encountered significant performance issues. Complex queries were taking too long, especially when generating reports with thousands of records. I learned about:</p>
      
      <ul>
        <li>Query optimization and proper indexing</li>
        <li>Database connection pooling</li>
        <li>Implementing caching strategies with Redis</li>
        <li>Using database migrations for schema changes</li>
      </ul>
      
      <h3>Real-time Features</h3>
      <p>Implementing real-time notifications was more complex than expected. I had to learn about:</p>
      
      <ul>
        <li>WebSocket connection management</li>
        <li>Handling connection failures gracefully</li>
        <li>Scaling real-time features across multiple server instances</li>
        <li>Optimizing message delivery to prevent spam</li>
      </ul>
      
      <h3>Security Implementation</h3>
      <p>Security was a major concern, especially handling sensitive student data:</p>
      
      <ul>
        <li>Input validation and sanitization</li>
        <li>SQL injection prevention</li>
        <li>Rate limiting to prevent abuse</li>
        <li>Proper CORS configuration</li>
        <li>Data encryption at rest and in transit</li>
      </ul>
      
      <h2>Development Process</h2>
      <p>I followed an agile development approach, working in two-week sprints:</p>
      
      <ol>
        <li><strong>Planning:</strong> Created detailed user stories and acceptance criteria</li>
        <li><strong>Design:</strong> Built wireframes and database schemas</li>
        <li><strong>Development:</strong> Implemented features with comprehensive testing</li>
        <li><strong>Review:</strong> Code reviews with my advisor and peers</li>
        <li><strong>Deployment:</strong> Continuous integration with automated testing</li>
      </ol>
      
      <h2>Testing Strategy</h2>
      <p>Testing was integrated throughout the development process:</p>
      
      <ul>
        <li><strong>Unit Tests:</strong> Jest for utility functions and components</li>
        <li><strong>Integration Tests:</strong> Testing API endpoints with Supertest</li>
        <li><strong>End-to-End Tests:</strong> Cypress for critical user journeys</li>
        <li><strong>Load Testing:</strong> Artillery for performance under stress</li>
      </ul>
      
      <h2>Key Learnings</h2>
      
      <h3>Technical Skills</h3>
      <ul>
        <li>Advanced React patterns and performance optimization</li>
        <li>Database design and query optimization</li>
        <li>API design best practices</li>
        <li>DevOps and deployment strategies</li>
        <li>Security implementation in web applications</li>
      </ul>
      
      <h3>Soft Skills</h3>
      <ul>
        <li>Project management and time estimation</li>
        <li>Technical documentation writing</li>
        <li>Presenting technical concepts to non-technical audiences</li>
        <li>Problem-solving under pressure</li>
        <li>Self-directed learning and research</li>
      </ul>
      
      <h2>Results and Impact</h2>
      <p>The final application exceeded expectations:</p>
      
      <ul>
        <li><strong>Performance:</strong> Handled 1000+ concurrent users</li>
        <li><strong>Reliability:</strong> 99.9% uptime during testing period</li>
        <li><strong>User Experience:</strong> Positive feedback from student testers</li>
        <li><strong>Code Quality:</strong> 95% test coverage with comprehensive documentation</li>
      </ul>
      
      <h2>Future Improvements</h2>
      <p>While the project was successful, there's always room for improvement:</p>
      
      <ul>
        <li>Microservices architecture for better scalability</li>
        <li>GraphQL API for more efficient data fetching</li>
        <li>Machine learning for predictive analytics</li>
        <li>Mobile application for better accessibility</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>This capstone project was more than just a graduation requirement—it was a comprehensive learning experience that prepared me for the professional world. The combination of technical challenges, project management, and real-world constraints provided invaluable experience that no classroom could replicate.</p>
      
      <p>The project received an A+ grade and was selected for presentation at the university's annual showcase. More importantly, it gave me confidence in my abilities as a full-stack developer and opened doors for internship opportunities.</p>
    `,
    '3': `
      <p>My summer internship at TechCorp was an eye-opening experience that bridged the gap between academic learning and professional software development. It was my first taste of working in a real development team, and the lessons learned continue to shape my approach to programming.</p>
      
      <h2>The Company and Role</h2>
      <p>TechCorp is a mid-sized fintech company focusing on payment processing solutions. I joined their backend development team as a Software Engineering Intern, working on their core API services that handle millions of transactions daily.</p>
      
      <h2>First Week: Culture Shock</h2>
      <p>The transition from university projects to professional development was jarring:</p>
      
      <ul>
        <li><strong>Scale:</strong> Working with a codebase of over 500,000 lines</li>
        <li><strong>Complexity:</strong> Understanding interconnected microservices</li>
        <li><strong>Process:</strong> Following strict code review and deployment procedures</li>
        <li><strong>Standards:</strong> Adhering to company coding standards and documentation requirements</li>
      </ul>
      
      <h2>Technical Environment</h2>
      <p>The technology stack was more complex than anything I'd worked with in school:</p>
      
      <ul>
        <li><strong>Languages:</strong> Python, Go, and Java across different services</li>
        <li><strong>Databases:</strong> PostgreSQL, Redis, and Elasticsearch</li>
        <li><strong>Infrastructure:</strong> Kubernetes on AWS with monitoring via Datadog</li>
        <li><strong>Tools:</strong> JIRA for project management, Slack for communication</li>
      </ul>
      
      <h2>Major Projects</h2>
      
      <h3>Payment Retry Logic Enhancement</h3>
      <p>My main project involved improving the retry mechanism for failed payment processing:</p>
      
      <ul>
        <li>Analyzed existing failure patterns using data analytics</li>
        <li>Designed exponential backoff with jitter to reduce system load</li>
        <li>Implemented comprehensive monitoring and alerting</li>
        <li>Reduced failed payment rates by 15%</li>
      </ul>
      
      <h3>API Documentation Overhaul</h3>
      <p>A secondary project focused on improving developer experience:</p>
      
      <ul>
        <li>Rewrote API documentation using OpenAPI specifications</li>
        <li>Added interactive examples and code snippets</li>
        <li>Created automated testing for documentation accuracy</li>
        <li>Received positive feedback from client integration teams</li>
      </ul>
      
      <h2>Biggest Challenges</h2>
      
      <h3>Understanding Legacy Code</h3>
      <p>Much of the system had been built over several years by different teams:</p>
      
      <ul>
        <li>Inconsistent coding patterns and architectural decisions</li>
        <li>Limited documentation for business logic</li>
        <li>Complex interdependencies between services</li>
        <li>Fear of making changes due to potential side effects</li>
      </ul>
      
      <h3>Production Environment Complexity</h3>
      <p>Unlike university projects, this system had to handle real money and real users:</p>
      
      <ul>
        <li>Zero-downtime deployment requirements</li>
        <li>Comprehensive monitoring and alerting systems</li>
        <li>Strict security and compliance requirements</li>
        <li>Performance optimization under high load</li>
      </ul>
      
      <h3>Team Collaboration</h3>
      <p>Working with a distributed team across different time zones:</p>
      
      <ul>
        <li>Asynchronous communication and decision-making</li>
        <li>Code reviews with senior engineers who had different standards</li>
        <li>Participating in architecture discussions and technical debates</li>
        <li>Understanding business requirements from product managers</li>
      </ul>
      
      <h2>Key Learnings</h2>
      
      <h3>Technical Skills</h3>
      <ul>
        <li><strong>System Design:</strong> Understanding distributed systems and microservices</li>
        <li><strong>Performance:</strong> Profiling and optimizing high-throughput applications</li>
        <li><strong>Monitoring:</strong> Implementing comprehensive logging and metrics</li>
        <li><strong>Security:</strong> Authentication, authorization, and data protection</li>
        <li><strong>DevOps:</strong> CI/CD pipelines and infrastructure as code</li>
      </ul>
      
      <h3>Professional Skills</h3>
      <ul>
        <li><strong>Communication:</strong> Writing clear technical proposals and updates</li>
        <li><strong>Time Management:</strong> Estimating tasks and managing multiple priorities</li>
        <li><strong>Problem Solving:</strong> Debugging complex issues in production systems</li>
        <li><strong>Continuous Learning:</strong> Staying updated with new technologies and practices</li>
      </ul>
      
      <h2>Comparison with Academic Work</h2>
      
      <table>
        <tr>
          <th>Aspect</th>
          <th>University</th>
          <th>Industry</th>
        </tr>
        <tr>
          <td>Scope</td>
          <td>Individual projects (weeks)</td>
          <td>Team projects (months/years)</td>
        </tr>
        <tr>
          <td>Complexity</td>
          <td>Focused problems</td>
          <td>Complex interdependencies</td>
        </tr>
        <tr>
          <td>Standards</td>
          <td>Academic correctness</td>
          <td>Production readiness</td>
        </tr>
        <tr>
          <td>Feedback</td>
          <td>Grades and professor comments</td>
          <td>Code reviews and user impact</td>
        </tr>
        <tr>
          <td>Consequences</td>
          <td>Personal grade impact</td>
          <td>Business and user impact</td>
        </tr>
      </table>
      
      <h2>Memorable Moments</h2>
      
      <h3>First Production Bug</h3>
      <p>Three weeks into the internship, a change I made caused a minor issue in production. The experience taught me:</p>
      
      <ul>
        <li>The importance of comprehensive testing</li>
        <li>How to remain calm under pressure</li>
        <li>The value of good monitoring and rollback procedures</li>
        <li>That mistakes are learning opportunities, not career-enders</li>
      </ul>
      
      <h3>Architecture Review Meeting</h3>
      <p>Being invited to contribute to a major architecture decision made me realize how much I'd grown. I was able to:</p>
      
      <ul>
        <li>Ask meaningful questions about scalability</li>
        <li>Understand trade-offs between different solutions</li>
        <li>Contribute ideas based on my recent university coursework</li>
        <li>See how theory applies to real-world problems</li>
      </ul>
      
      <h2>Impact and Recognition</h2>
      <p>By the end of the internship, I had:</p>
      
      <ul>
        <li>Reduced payment failure rates by 15%</li>
        <li>Improved API documentation satisfaction scores by 40%</li>
        <li>Contributed to 12 production releases</li>
        <li>Received an offer for a return internship</li>
      </ul>
      
      <h2>Advice for Other Students</h2>
      
      <h3>Before the Internship</h3>
      <ul>
        <li>Build projects that demonstrate your ability to work with existing code</li>
        <li>Learn about version control workflows beyond basic git commands</li>
        <li>Practice explaining technical concepts clearly</li>
        <li>Familiarize yourself with common development tools and practices</li>
      </ul>
      
      <h3>During the Internship</h3>
      <ul>
        <li>Ask questions early and often—don't wait until you're stuck</li>
        <li>Take initiative on documentation and testing</li>
        <li>Participate in code reviews to learn from experienced developers</li>
        <li>Build relationships beyond your immediate team</li>
        <li>Keep a journal of what you learn each day</li>
      </ul>
      
      <h2>Looking Forward</h2>
      <p>This internship fundamentally changed my perspective on software development. I now understand that:</p>
      
      <ul>
        <li>Writing code is just one part of being a software engineer</li>
        <li>Maintainability and readability are more important than cleverness</li>
        <li>Business context matters as much as technical excellence</li>
        <li>Continuous learning is essential in this field</li>
      </ul>
      
      <p>The experience has shaped my final year coursework choices and career goals. I'm now more interested in distributed systems and have a better understanding of what to expect in my future career.</p>
      
      <p>Most importantly, it gave me confidence that I can succeed as a professional software engineer and contribute meaningfully to real products that impact users' lives.</p>
    `
  };
  
  return contents[postId] || '<p>Content not available.</p>';
};

// Format date utility
const formatDate = (date: Date, locale: string = 'en-US') => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export function BlogPost({ post, onBack }: BlogPostProps) {
  const { t } = useI18n();
  const locale = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language : 'en-US';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying to clipboard
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      // You could show a toast notification here
      console.log('Link copied to clipboard');
    });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-muted hover:text-accent"
          style={{ color: 'var(--muted)' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.previous')}
        </Button>

        {/* Hero Image */}
        <div className="relative rounded-lg overflow-hidden mb-8">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
          
          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-6 left-6">
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
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--text)' }}>
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-muted mb-6">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt, locale)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} {t('blog.read_time')}</span>
            </div>
          </div>

          <p className="text-xl text-muted leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="text-sm bg-surface border-border"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)'
                }}
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Share Button */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleShare}
              className="border-border hover:bg-surface"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--text)'
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              {t('blog.share')}
            </Button>
          </div>
        </header>

        {/* Article Content */}
        <Card 
          className="bg-surface border-border"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)'
          }}
        >
          <CardContent className="p-8 md:p-12">
            <div 
              className="prose prose-lg max-w-none"
              style={{ 
                color: 'var(--text)',
                '--tw-prose-headings': 'var(--text)',
                '--tw-prose-links': 'var(--accent)',
                '--tw-prose-bold': 'var(--text)',
                '--tw-prose-code': 'var(--text)',
                '--tw-prose-pre-bg': 'var(--bg)',
                '--tw-prose-th-borders': 'var(--border)',
                '--tw-prose-td-borders': 'var(--border)',
              } as React.CSSProperties}
              dangerouslySetInnerHTML={{ 
                __html: getFullContent(post.id) 
              }}
            />
          </CardContent>
        </Card>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
                About the Author
              </h3>
              <p className="text-muted" style={{ color: 'var(--muted)' }}>
                {post.author} is a final-year Software Engineering student at the University of Toronto, 
                passionate about web development and sharing knowledge with fellow students.
              </p>
            </div>
            
            <Button
              onClick={handleShare}
              className="bg-accent hover:bg-accent-2 text-bg"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg)'
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              {t('blog.share')}
            </Button>
          </div>
        </footer>

        {/* Back to Blog Button */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-border hover:bg-surface"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--text)'
            }}
          >
            ← Back to Blog
          </Button>
        </div>
      </div>
    </div>
  );
}
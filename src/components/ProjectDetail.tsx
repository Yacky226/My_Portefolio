import React from 'react';
import { ArrowLeft, Calendar, ExternalLink, Github, Star, Clock, Users, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { Separator } from './ui/separator';
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

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

// Mock detailed project data - in a real app, this would come from a CMS or API
const getProjectDetails = (projectId: string) => {
  const details: Record<string, any> = {
    '1': {
      overview: 'A comprehensive web application designed to streamline university course management, built as my capstone project. This full-stack solution handles course registration, grade tracking, and academic planning for students and administrators.',
      challenge: 'Universities need efficient systems to manage course registrations, track student progress, and provide real-time updates to stakeholders. The challenge was to create a scalable solution that could handle concurrent users while maintaining data integrity.',
      solution: 'Developed a React-based frontend with a Node.js backend, utilizing PostgreSQL for data persistence and Socket.io for real-time updates. Implemented role-based access control and comprehensive testing.',
      technologies: [
        { name: 'React', purpose: 'Frontend framework for building interactive user interfaces' },
        { name: 'Node.js', purpose: 'Backend runtime for server-side JavaScript execution' },
        { name: 'Express', purpose: 'Web application framework for building RESTful APIs' },
        { name: 'PostgreSQL', purpose: 'Relational database for storing student and course data' },
        { name: 'Socket.io', purpose: 'Real-time communication for live updates' },
        { name: 'Bootstrap', purpose: 'CSS framework for responsive design' }
      ],
      features: [
        'Student course registration and enrollment',
        'Real-time grade tracking and analytics',
        'Administrative dashboard for course management',
        'Automated notification system',
        'Comprehensive reporting and data export',
        'Role-based access control and security'
      ],
      challenges: [
        {
          title: 'Database Performance',
          description: 'Optimizing complex queries for large datasets with proper indexing and query optimization.',
          solution: 'Implemented database indexing strategies and query optimization techniques, reducing response times by 60%.'
        },
        {
          title: 'Real-time Updates',
          description: 'Ensuring reliable real-time communication between multiple users and the server.',
          solution: 'Used Socket.io with connection pooling and error handling to maintain stable real-time connections.'
        },
        {
          title: 'Security Implementation',
          description: 'Protecting sensitive student data while maintaining usability.',
          solution: 'Implemented JWT authentication, input validation, and role-based access control.'
        }
      ],
      results: [
        'Achieved Grade A+ for capstone project',
        'Successfully tested with 100+ concurrent users',
        'Reduced course registration time by 75%',
        'Positive feedback from university administrators',
        'Selected for university project showcase'
      ],
      timeline: '6 months',
      teamSize: '4 developers',
      role: 'Full-Stack Developer & Team Lead',
      lessons: [
        'Importance of thorough planning and requirement gathering',
        'Value of continuous testing and quality assurance',
        'Benefits of agile development methodology',
        'Critical nature of user experience design',
        'Significance of performance optimization in web applications'
      ]
    },
    '2': {
      overview: 'A React Native mobile application for personal finance management, featuring expense tracking, budgeting tools, and comprehensive spending analytics. Built during my mobile development course to help students manage their finances effectively.',
      challenge: 'Students often struggle with financial management due to limited budgeting experience and lack of proper tools. The challenge was to create an intuitive mobile app that makes financial tracking simple and educational.',
      solution: 'Developed a cross-platform mobile app using React Native with local data storage, interactive charts for spending visualization, and gamification elements to encourage good financial habits.',
      technologies: [
        { name: 'React Native', purpose: 'Cross-platform mobile development framework' },
        { name: 'SQLite', purpose: 'Local database for offline data storage' },
        { name: 'Chart.js', purpose: 'Data visualization for spending analytics' },
        { name: 'AsyncStorage', purpose: 'Persistent local storage for user preferences' },
        { name: 'React Navigation', purpose: 'Navigation system for mobile app screens' }
      ],
      features: [
        'Expense tracking with category classification',
        'Monthly and yearly budget planning',
        'Interactive spending analytics and charts',
        'Bill reminders and notifications',
        'Savings goals tracking',
        'Export data functionality'
      ],
      challenges: [
        {
          title: 'Offline Functionality',
          description: 'Ensuring the app works seamlessly without internet connection.',
          solution: 'Implemented SQLite for local data storage with sync capabilities when online.'
        },
        {
          title: 'Data Visualization',
          description: 'Creating meaningful and interactive charts on mobile devices.',
          solution: 'Used Chart.js with custom responsive configurations optimized for mobile screens.'
        },
        {
          title: 'User Experience',
          description: 'Making financial management engaging and not overwhelming for students.',
          solution: 'Implemented gamification elements and progressive disclosure of features.'
        }
      ],
      results: [
        'Featured in university mobile development showcase',
        'Downloaded by 50+ fellow students for testing',
        'Achieved 4.8/5 rating in course evaluation',
        'Reduced personal expense tracking time by 80%',
        'Helped users identify average 20% savings opportunities'
      ],
      timeline: '4 months',
      teamSize: '1 developer (solo project)',
      role: 'Mobile Developer & UI/UX Designer',
      lessons: [
        'Mobile-first design principles and constraints',
        'Importance of offline-first architecture',
        'Value of user testing with target audience',
        'Performance optimization for mobile devices',
        'App store submission and deployment processes'
      ]
    },
    '3': {
      overview: 'An interactive web application that visualizes common sorting and searching algorithms to help computer science students understand algorithmic concepts through visual learning. Built with vanilla JavaScript and D3.js for smooth animations.',
      challenge: 'Many students struggle to understand abstract algorithmic concepts without visual representation. Traditional textbook explanations often fail to convey the dynamic nature of algorithms in action.',
      solution: 'Created an interactive visualization tool that animates algorithm execution step-by-step, allowing students to control speed, input size, and compare different algorithms side-by-side.',
      technologies: [
        { name: 'JavaScript ES6+', purpose: 'Core programming language for algorithm implementation' },
        { name: 'D3.js', purpose: 'Data visualization library for smooth animations' },
        { name: 'HTML5 Canvas', purpose: 'High-performance rendering for complex visualizations' },
        { name: 'CSS3', purpose: 'Styling and responsive design' },
        { name: 'GitHub Pages', purpose: 'Free hosting and deployment platform' }
      ],
      features: [
        'Visualization of 8 sorting algorithms (Bubble, Selection, Insertion, Merge, Quick, Heap, Radix, Counting)',
        'Interactive controls for speed and array size',
        'Side-by-side algorithm comparison',
        'Step-by-step execution with pause/play controls',
        'Performance metrics and complexity analysis',
        'Educational explanations and pseudocode'
      ],
      challenges: [
        {
          title: 'Animation Performance',
          description: 'Maintaining smooth animations while handling large datasets.',
          solution: 'Optimized rendering using requestAnimationFrame and efficient DOM manipulation techniques.'
        },
        {
          title: 'Algorithm Complexity',
          description: 'Implementing complex algorithms like QuickSort and HeapSort with proper visualization.',
          solution: 'Broke down complex algorithms into smaller, visualizable steps with clear state tracking.'
        },
        {
          title: 'Educational Value',
          description: 'Making the tool genuinely helpful for learning rather than just entertaining.',
          solution: 'Added detailed explanations, complexity analysis, and guided tutorials for each algorithm.'
        }
      ],
      results: [
        'Used by 500+ students across multiple universities',
        'Integrated into CS curriculum at 3 institutions',
        'Featured on r/programming and gained 1000+ upvotes',
        'Improved student algorithm comprehension by ~40% (informal survey)',
        'Received contributions from 5 other developers'
      ],
      timeline: '3 months',
      teamSize: '1 developer (solo project)',
      role: 'Full-Stack Developer & Educational Designer',
      lessons: [
        'Importance of performance optimization in web applications',
        'Value of user feedback in educational tool design',
        'Benefits of open-source development and community contributions',
        'Significance of accessibility in educational technology',
        'Impact of visual learning on student comprehension'
      ]
    }
  };
  
  return details[projectId] || null;
};

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const { t } = useI18n();
  const details = getProjectDetails(project.id);

  if (!details) {
    return (
      <div className="min-h-screen py-20">
        <div className="container max-w-4xl text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Project details not available
          </h1>
          <Button
            variant="outline"
            onClick={onBack}
            className="border-border hover:bg-surface"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--text)'
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-6xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-muted hover:text-accent"
          style={{ color: 'var(--muted)' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>

        {/* Project Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text)' }}>
                {project.title}
              </h1>
              {project.featured && (
                <Badge 
                  className="bg-accent text-bg font-semibold"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--bg)'
                  }}
                >
                  <Star className="w-3 h-3 mr-1" />
                  {t('common.featured')}
                </Badge>
              )}
            </div>
            
            <p className="text-xl text-muted mb-6" style={{ color: 'var(--muted)' }}>
              {details.overview}
            </p>

            {/* Project Meta */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-muted">
                <Calendar className="w-4 h-4" />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted">
                <Clock className="w-4 h-4" />
                <span>{details.timeline}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted">
                <Users className="w-4 h-4" />
                <span>{details.teamSize}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted">
                <Target className="w-4 h-4" />
                <span>{project.impact}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {project.demoUrl && (
                <Button
                  className="bg-accent hover:bg-accent-2 text-bg"
                  onClick={() => window.open(project.demoUrl, '_blank')}
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--bg)'
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="outline"
                  onClick={() => window.open(project.githubUrl, '_blank')}
                  className="border-border hover:bg-surface"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--text)'
                  }}
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </Button>
              )}
            </div>
          </div>

          <div>
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Challenge */}
            <Card 
              className="bg-surface border-border"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)'
              }}
            >
              <CardHeader>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                  The Challenge
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {details.challenge}
                </p>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card 
              className="bg-surface border-border"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)'
              }}
            >
              <CardHeader>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                  The Solution
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {details.solution}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card 
              className="bg-surface border-border"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)'
              }}
            >
              <CardHeader>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                  Key Features
                </h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {details.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
                      <span className="text-muted" style={{ color: 'var(--muted)' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Technical Challenges */}
            <Card 
              className="bg-surface border-border"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)'
              }}
            >
              <CardHeader>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                  Technical Challenges
                </h2>
              </CardHeader>
              <CardContent className="space-y-6">
                {details.challenges.map((challenge: any, index: number) => (
                  <div key={index}>
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
                      {challenge.title}
                    </h3>
                    <p className="text-muted mb-2" style={{ color: 'var(--muted)' }}>
                      {challenge.description}
                    </p>
                    <p className="text-sm bg-bg p-3 rounded-lg border border-border" style={{ 
                      backgroundColor: 'var(--bg)', 
                      borderColor: 'var(--border)',
                      color: 'var(--text)'
                    }}>
                      <strong>Solution:</strong> {challenge.solution}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Results & Impact */}
            <Card 
              className="bg-surface border-border"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)'
              }}
            >
              <CardHeader>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                  Results & Impact
                </h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {details.results.map((result: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-accent-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--accent-2)' }} />
                      <span className="text-muted" style={{ color: 'var(--muted)' }}>{result}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Lessons Learned */}
            <Card 
              className="bg-surface border-border"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)'
              }}
            >
              <CardHeader>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                  Lessons Learned
                </h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {details.lessons.map((lesson: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
                      <span className="text-muted" style={{ color: 'var(--muted)' }}>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card 
              className="bg-surface border-border"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)'
              }}
            >
              <CardHeader>
                <h3 className="font-semibold" style={{ color: 'var(--text)' }}>
                  Project Info
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm text-muted block mb-1">Role</span>
                  <span className="font-medium" style={{ color: 'var(--text)' }}>{details.role}</span>
                </div>
                <Separator />
                <div>
                  <span className="text-sm text-muted block mb-1">Timeline</span>
                  <span className="font-medium" style={{ color: 'var(--text)' }}>{details.timeline}</span>
                </div>
                <Separator />
                <div>
                  <span className="text-sm text-muted block mb-1">Team Size</span>
                  <span className="font-medium" style={{ color: 'var(--text)' }}>{details.teamSize}</span>
                </div>
                <Separator />
                <div>
                  <span className="text-sm text-muted block mb-1">Category</span>
                  <Badge variant="secondary" className="bg-bg border-border">
                    {project.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Technologies Used */}
            <Card 
              className="bg-surface border-border"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)'
              }}
            >
              <CardHeader>
                <h3 className="font-semibold" style={{ color: 'var(--text)' }}>
                  Technologies Used
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {details.technologies.map((tech: any, index: number) => (
                  <div key={index}>
                    <h4 className="font-medium mb-1" style={{ color: 'var(--text)' }}>
                      {tech.name}
                    </h4>
                    <p className="text-sm text-muted" style={{ color: 'var(--muted)' }}>
                      {tech.purpose}
                    </p>
                    {index < details.technologies.length - 1 && <Separator className="mt-3" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card 
              className="bg-surface border-border"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)'
              }}
            >
              <CardHeader>
                <h3 className="font-semibold" style={{ color: 'var(--text)' }}>
                  Tags
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
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
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Back to Projects Button */}
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
            ← Back to Projects
          </Button>
        </div>
      </div>
    </div>
  );
}
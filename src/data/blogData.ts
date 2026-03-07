export interface BlogPost {
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

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'My Journey Learning React and TypeScript',
    excerpt: 'A student\'s perspective on learning modern web development. Challenges faced, resources used, and lessons learned during my first year with React.',
    content: '<p>Voici le contenu complet de l\'article. J\'ai commencé par les bases de React en suivant la documentation officielle. C\'était excitant mais challenging au début.</p><p>Ensuite, j\'ai intégré TypeScript pour ajouter de la rigueur au code. Cela m\'a aidé à éviter de nombreuses erreurs runtime.</p><ul><li>Challenge 1 : Comprendre les Hooks comme useState et useEffect.</li><li>Challenge 2 : Configurer le routing avec React Router.</li><li>Ressources : freeCodeCamp, React docs, et des tutos YouTube.</li></ul><p>Après un an, je me sens beaucoup plus confiant pour des projets complexes.</p>',
    image: 'https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwYmxvZyUyMHdyaXRpbmclMjBjb2Rpbmd8ZW58MXx8fHwxNzU4MzAzNTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Yacouba',
    publishedAt: new Date('2024-01-15'),
    readTime: 6,
    tags: ['React', 'TypeScript', 'Learning'],
    featured: true
  },
  {
    id: '2',
    title: 'Building My First Full-Stack Application',
    excerpt: 'From concept to deployment: how I built my capstone project. Technologies used, challenges overcome, and what I learned about software architecture.',
    content: '<p>Dans cet article, je détaille la construction de mon premier projet full-stack : un portfolio interactif.</p><p>J\'ai utilisé Node.js et Express pour le backend, avec une base de données MongoDB. Pour le frontend, React avec TypeScript.</p><img src="https://example.com/schema-app.png" alt="Schéma de l\'application" style="max-width:100%; height:auto;" /><p>Les défis incluaient la gestion des erreurs API et l\'authentification JWT. J\'ai déployé sur Vercel pour le front et Heroku pour le back.</p><p>Leçon apprise : L\'architecture modulaire est clé pour scaler.</p>',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    author: 'Yacouba',
    publishedAt: new Date('2024-01-10'),
    readTime: 8,
    tags: ['Full-Stack', 'Project', 'Learning'],
    featured: true
  },
  {
    id: '3',
    title: 'Internship Experience: From Theory to Practice',
    excerpt: 'What it\'s really like working as a software engineering intern. The gap between academic learning and real-world development.',
    content: '<p>Mon stage en ingénierie logicielle a été une révélation. À l\'université, on apprend les concepts, mais en entreprise, c\'est du concret : deadlines, code reviews, et outils comme GitHub Actions.</p><p>J\'ai travaillé sur une feature d\'authentification OAuth, ce qui m\'a forcé à debugger en production.</p><ul><li>Le gap : L\'académie est théorique, le réel est itératif.</li><li>Conseils : Pose des questions, lis du code existant.</li></ul><p>À la fin, j\'ai gagné en confiance et en réseau.</p>',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    author: 'Yacouba',
    publishedAt: new Date('2024-01-05'),
    readTime: 5,
    tags: ['Internship', 'Career', 'Experience'],
    featured: false
  },
  {
    id: '4',
    title: 'Preparing for Technical Interviews as a Student',
    excerpt: 'My study plan and resources for technical interviews. Data structures, algorithms, and coding practice that actually helped.',
    content: '<p>Préparer les entretiens tech en tant qu\'étudiant demande de la discipline. Mon plan : 2h/jour sur LeetCode.</p><p>Focus sur : Arbres, graphes, dynamic programming. Ressources : Cracking the Coding Interview, Grokking Algorithms.</p><ul><li>Pratique : Résous 300+ problèmes.</li><li>Mock interviews : Pramp ou Interviewing.io.</li></ul><p>Résultat : J\'ai passé 3 entretiens avec succès !</p>',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    author: 'Yacouba',
    publishedAt: new Date('2023-12-28'),
    readTime: 7,
    tags: ['Interviews', 'Career', 'Study Tips'],
    featured: false
  },
  {
    id: '5',
    title: 'Contributing to Open Source as a Student',
    excerpt: 'How I made my first open source contributions and what I learned about collaborative development and the tech community.',
    content: '<p>Contribuer à l\'open source est accessible aux étudiants. J\'ai commencé par des issues "good first issue" sur GitHub.</p><p>Mon premier PR : Fix d\'un bug dans une lib React. Processus : Fork, branch, PR, review.</p><ul><li>Leçons : Communication claire, patience pour les feedbacks.</li><li>Communauté : Rejoins Discord ou Twitter spaces.</li></ul><p>Aujourd\'hui, j\'ai 5+ contributions et un meilleur CV.</p>',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    author: 'Yacouba',
    publishedAt: new Date('2023-12-20'),
    readTime: 4,
    tags: ['Open Source', 'GitHub', 'Community'],
    featured: false
  },
  {
    id: '6',
    title: 'Hackathon Wins and Lessons Learned',
    excerpt: 'Reflecting on my hackathon experiences - the good, the bad, and the valuable lessons learned about rapid prototyping and teamwork.',
    content: '<p>Les hackathons sont intenses ! J\'en ai gagné 2 sur 5. Thème : IA pour l\'éducation.</p><p>Stack : React + Firebase pour MVP rapide. Équipe : 3 devs, on a prototypé en 48h.</p><ul><li>Bon : Idéation fun, networking.</li><li>Mauvais : Burnout, bugs de dernière minute.</li><li>Leçons : Priorise MVP, communique souvent.</li></ul><p>Prochain : MLH hackathon !</p>',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    author: 'Yacouba',
    publishedAt: new Date('2023-11-15'),
    readTime: 6,
    tags: ['Hackathon', 'Teamwork', 'Innovation'],
    featured: false
  }
];
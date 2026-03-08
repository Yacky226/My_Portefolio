export type BlogLanguage = "en" | "fr";

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

const blogPostsEn: BlogPost[] = [
  {
    id: "1",
    title: "React + TypeScript: From Student Demos to Production Habits",
    excerpt:
      "How I moved from small classroom demos to clean, maintainable React code by using strict typing, reusable components, and better project structure.",
    content: `
      <p>I started with React by building simple pages fast, but I quickly felt the limits: duplicated code, unclear props, and bugs that appeared late.</p>
      <p>Adding TypeScript changed my workflow. Instead of guessing, I defined interfaces for data, component props, and API responses from day one.</p>
      <h2>What changed in practice</h2>
      <ul>
        <li>I split large screens into modular components with explicit responsibilities.</li>
        <li>I replaced "any" with real types and utility helpers.</li>
        <li>I introduced clear folder boundaries for data, UI, and business logic.</li>
      </ul>
      <h2>Result</h2>
      <p>My development speed improved because refactoring became safer. More importantly, collaboration became easier because the code communicates intent clearly.</p>
      <p>If you are still learning, my advice is simple: start small, type everything that matters, and keep your components focused.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwYmxvZyUyMHdyaXRpbmclMjBjb2Rpbmd8ZW58MXx8fHwxNzU4MzAzNTMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-10-02"),
    readTime: 2,
    tags: ["React", "TypeScript", "Frontend"],
    featured: true,
  },
  {
    id: "2",
    title: "Designing Mobile Features with React Native and a NestJS API",
    excerpt:
      "A practical breakdown of how I design and connect mobile screens to backend services while keeping performance and offline resilience in mind.",
    content: `
      <p>On my React Native projects, the hardest part was not writing screens. The hard part was making the app reliable in real usage conditions.</p>
      <h2>Architecture decisions</h2>
      <ul>
        <li>UI layer focused on rendering and interactions.</li>
        <li>Service layer for API calls and error handling.</li>
        <li>Centralized models for request and response contracts.</li>
      </ul>
      <p>I used NestJS on the backend to expose clean REST endpoints and PostgreSQL for consistent persistence.</p>
      <h2>Lessons learned</h2>
      <ul>
        <li>Mobile UX must anticipate slow networks and temporary failures.</li>
        <li>Loading and error states are part of the product, not just technical details.</li>
        <li>Strong API contracts reduce debugging time dramatically.</li>
      </ul>
      <p>This workflow helped me ship mobile features with fewer regressions and better user confidence.</p>
    `,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-09-18"),
    readTime: 2,
    tags: ["React Native", "NestJS", "Mobile"],
    featured: true,
  },
  {
    id: "3",
    title: "Internship Notes: What University Does Not Teach You",
    excerpt:
      "My internship changed how I think about software delivery: priorities, communication, and measurable impact matter as much as code quality.",
    content: `
      <p>During my internship, I worked on an e-commerce management platform. The project looked simple on paper, but execution required constant alignment.</p>
      <h2>Main differences with academic projects</h2>
      <ul>
        <li>Requirements evolve quickly and decisions must be documented.</li>
        <li>Code reviews focus on maintainability, not only correctness.</li>
        <li>Delivery deadlines force clear scoping and prioritization.</li>
      </ul>
      <p>I also improved my communication habits: writing short updates, raising blockers early, and proposing alternatives when constraints appear.</p>
      <p>This experience taught me that strong engineers ship value continuously, not just features.</p>
    `,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-08-22"),
    readTime: 2,
    tags: ["Internship", "Career", "Delivery"],
    featured: false,
  },
  {
    id: "4",
    title: "Building Location-Aware Apps with PostGIS: A Student Guide",
    excerpt:
      "How I used PostGIS to model geo data, run spatial queries, and build practical map features for mobile and web applications.",
    content: `
      <p>PostGIS was one of the most useful technologies I learned for real-world applications. It turns PostgreSQL into a powerful spatial database.</p>
      <h2>Core capabilities I used</h2>
      <ul>
        <li>Store points, lines, and polygons for map entities.</li>
        <li>Run distance and containment queries for nearby search.</li>
        <li>Combine standard SQL with spatial indexing for speed.</li>
      </ul>
      <p>In one project, these queries powered features such as nearby places and route-based filtering. The biggest gain was precision with strong performance.</p>
      <p>If your app needs geo intelligence, PostGIS gives you robust tools without leaving the SQL ecosystem.</p>
    `,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-07-30"),
    readTime: 2,
    tags: ["PostGIS", "GIS", "Backend"],
    featured: false,
  },
  {
    id: "5",
    title: "Traffic Forecasting with ARIMA + SUMO: What Worked, What Failed",
    excerpt:
      "A practical look at combining statistical forecasting and simulation for congestion analysis, including the assumptions that can break your model.",
    content: `
      <p>Combining ARIMA forecasts with SUMO simulation helped me understand traffic behavior beyond static dashboards.</p>
      <h2>Pipeline overview</h2>
      <ul>
        <li>Collect and clean traffic time-series data.</li>
        <li>Train ARIMA to forecast short-term demand peaks.</li>
        <li>Inject forecasts into SUMO scenarios to test interventions.</li>
      </ul>
      <p>The approach was useful, but only when assumptions were explicit. Seasonality shifts, missing data, and event outliers can reduce forecast quality quickly.</p>
      <p>The key lesson: simulation is most valuable when paired with transparent forecasting limits and iterative validation.</p>
    `,
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-06-12"),
    readTime: 2,
    tags: ["ARIMA", "SUMO", "Data Science"],
    featured: false,
  },
  {
    id: "6",
    title: "Open Source as a Career Accelerator: A Realistic Approach",
    excerpt:
      "A simple strategy I use to contribute on GitHub without burning out: pick small issues, communicate clearly, and optimize for consistency.",
    content: `
      <p>Open source gave me practical collaboration experience before full-time work. The key is to treat each contribution like a professional delivery.</p>
      <h2>My contribution framework</h2>
      <ul>
        <li>Pick issues that match your current level.</li>
        <li>Write a short plan before coding.</li>
        <li>Keep pull requests small and testable.</li>
        <li>Respond to review comments quickly and clearly.</li>
      </ul>
      <p>This process improved my Git workflow, technical writing, and code review confidence. It also made my portfolio stronger with verifiable public work.</p>
      <p>You do not need huge contributions. You need consistent, high-quality iterations.</p>
    `,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-05-20"),
    readTime: 2,
    tags: ["Open Source", "GitHub", "Career"],
    featured: false,
  },
];

const blogPostsFr: BlogPost[] = [
  {
    id: "1",
    title: "React + TypeScript : des demos etudiantes aux habitudes de production",
    excerpt:
      "Comment je suis passe de petits projets de cours a un code React propre et maintenable grace au typage strict et a une meilleure structure.",
    content: `
      <p>Au debut, je construisais des pages React rapidement, mais les limites sont vite apparues : duplication, props peu claires et bugs tardifs.</p>
      <p>L'ajout de TypeScript a change mon workflow. Au lieu de deviner, je definis les interfaces des donnees, des props et des reponses API des le debut.</p>
      <h2>Ce qui a change concretement</h2>
      <ul>
        <li>J'ai decoupe les grands ecrans en composants modulaires et lisibles.</li>
        <li>J'ai remplace les "any" par des types utiles.</li>
        <li>J'ai separe clairement la data, l'UI et la logique metier.</li>
      </ul>
      <h2>Resultat</h2>
      <p>Le refactoring est devenu plus sur, et la collaboration plus simple car le code exprime mieux l'intention.</p>
      <p>Mon conseil : commence petit, type ce qui compte, et garde tes composants focuses.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwYmxvZyUyMHdyaXRpbmclMjBjb2Rpbmd8ZW58MXx8fHwxNzU4MzAzNTMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-10-02"),
    readTime: 2,
    tags: ["React", "TypeScript", "Frontend"],
    featured: true,
  },
  {
    id: "2",
    title: "Concevoir des fonctionnalites mobiles avec React Native et NestJS",
    excerpt:
      "Retour pratique sur la conception d'ecrans mobiles relies a une API backend, avec un focus sur la performance et la resilience hors ligne.",
    content: `
      <p>Sur mes projets React Native, le plus difficile n'etait pas de creer les ecrans, mais de rendre l'application fiable en usage reel.</p>
      <h2>Choix d'architecture</h2>
      <ul>
        <li>Une couche UI dediee au rendu et aux interactions.</li>
        <li>Une couche service pour les appels API et la gestion d'erreurs.</li>
        <li>Des modeles centralises pour les contrats requete/reponse.</li>
      </ul>
      <p>Cote backend, j'ai utilise NestJS pour exposer des endpoints REST clairs et PostgreSQL pour la persistance.</p>
      <h2>Lecons retenues</h2>
      <ul>
        <li>L'UX mobile doit anticiper les reseaux instables.</li>
        <li>Les etats loading/error font partie du produit.</li>
        <li>Des contrats API solides reduisent fortement le debugging.</li>
      </ul>
      <p>Cette approche m'a permis de livrer plus vite avec moins de regressions.</p>
    `,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-09-18"),
    readTime: 2,
    tags: ["React Native", "NestJS", "Mobile"],
    featured: true,
  },
  {
    id: "3",
    title: "Notes de stage : ce que l'universite n'enseigne pas",
    excerpt:
      "Mon stage a change ma vision de la livraison logicielle : priorites, communication et impact mesurable comptent autant que la qualite du code.",
    content: `
      <p>Pendant mon stage, j'ai travaille sur une plateforme de gestion e-commerce. Sur papier, le projet semblait simple, mais l'execution demandait un alignement constant.</p>
      <h2>Difference avec les projets academiques</h2>
      <ul>
        <li>Les besoins evoluent vite et doivent etre documentes.</li>
        <li>Les code reviews evaluent surtout la maintenabilite.</li>
        <li>Les deadlines imposent un scope clair et des priorites.</li>
      </ul>
      <p>J'ai aussi ameliore ma communication : updates courts, blocages remontes tot, et alternatives proposees rapidement.</p>
      <p>Le point cle : un bon ingenieur livre de la valeur en continu, pas seulement des features.</p>
    `,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-08-22"),
    readTime: 2,
    tags: ["Stage", "Carriere", "Delivery"],
    featured: false,
  },
  {
    id: "4",
    title: "Construire des applications geolocalisees avec PostGIS",
    excerpt:
      "Comment j'ai utilise PostGIS pour modeliser des donnees spatiales, executer des requetes geographiques et ajouter des features cartographiques utiles.",
    content: `
      <p>PostGIS est une des technologies les plus utiles que j'ai apprises pour des applications reelles. Elle transforme PostgreSQL en base de donnees spatiale puissante.</p>
      <h2>Capacites principales utilisees</h2>
      <ul>
        <li>Stocker des points, lignes et polygones.</li>
        <li>Executer des requetes de distance et de containment.</li>
        <li>Combiner SQL classique et index spatiaux pour la performance.</li>
      </ul>
      <p>Sur un projet, ces requetes ont alimente la recherche proximite et le filtrage par zone. Le gain principal : precision et rapidite.</p>
      <p>Si ton application a besoin d'intelligence geographique, PostGIS est un excellent choix.</p>
    `,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-07-30"),
    readTime: 2,
    tags: ["PostGIS", "GIS", "Backend"],
    featured: false,
  },
  {
    id: "5",
    title: "Prevision du trafic avec ARIMA + SUMO : ce qui marche vraiment",
    excerpt:
      "Analyse pratique d'un pipeline combinant prevision statistique et simulation, avec les hypotheses qui peuvent casser un modele.",
    content: `
      <p>Combiner ARIMA avec SUMO m'a aide a mieux comprendre le trafic au-dela des dashboards statiques.</p>
      <h2>Pipeline simplifie</h2>
      <ul>
        <li>Collecter et nettoyer les series temporelles de trafic.</li>
        <li>Entrainer ARIMA pour prevoir les pics de demande.</li>
        <li>Injecter les previsions dans des scenarios SUMO.</li>
      </ul>
      <p>L'approche est utile seulement si les hypotheses sont explicites. Les changements de saisonnalite, donnees manquantes et outliers peuvent vite degrader la qualite.</p>
      <p>La lecon cle : la simulation vaut surtout avec une validation iterative des limites du modele.</p>
    `,
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-06-12"),
    readTime: 2,
    tags: ["ARIMA", "SUMO", "Data Science"],
    featured: false,
  },
  {
    id: "6",
    title: "Open source comme accelerateur de carriere",
    excerpt:
      "Une methode simple pour contribuer sur GitHub sans epuisement : petites issues, communication claire et progression reguliere.",
    content: `
      <p>L'open source m'a donne une experience concrete de collaboration avant le monde professionnel. Le secret est de traiter chaque contribution comme une livraison serieuse.</p>
      <h2>Mon cadre de contribution</h2>
      <ul>
        <li>Choisir des issues adaptees a ton niveau actuel.</li>
        <li>Ecrire un mini plan avant de coder.</li>
        <li>Garder des pull requests petites et testables.</li>
        <li>Repondre vite et clairement aux reviews.</li>
      </ul>
      <p>Ce processus a ameliore mon workflow Git, ma communication technique et ma confiance en code review.</p>
      <p>Pas besoin de grosses contributions. Il faut des iterations regulieres et de qualite.</p>
    `,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-05-20"),
    readTime: 2,
    tags: ["Open Source", "GitHub", "Carriere"],
    featured: false,
  },
];

export const blogPostsByLanguage: Record<BlogLanguage, BlogPost[]> = {
  en: blogPostsEn,
  fr: blogPostsFr,
};

export const blogPosts = blogPostsByLanguage.en;

export function getBlogPosts(language: BlogLanguage): BlogPost[] {
  return blogPostsByLanguage[language] ?? blogPostsByLanguage.en;
}

export function getBlogPostById(id: string, language: BlogLanguage): BlogPost | undefined {
  return getBlogPosts(language).find((post) => post.id === id) ?? blogPostsByLanguage.en.find((post) => post.id === id);
}

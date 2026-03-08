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
      <p>When I first started using React, my main objective was simple: make the interface work. I was focused on getting pages on the screen quickly, connecting buttons, fetching data, and moving to the next feature. That approach helped me learn fast, but after a few projects I began to see the same problems again and again: duplicated UI blocks, props that were not clear, state handled in too many places, and bugs that only appeared late during testing.</p>

      <p>The real shift happened when I started using TypeScript seriously. At first, I saw it as a tool that would slow me down because it forced me to think more before coding. In reality, it improved my workflow. Instead of guessing what a component should receive or what an API should return, I started defining interfaces and types from the beginning. That small habit changed the quality of my frontend code.</p>

      <h2>What changed in my workflow</h2>
      <p>I stopped building large screens as one big file. Instead, I began splitting them into smaller components with one clear responsibility each. For example, instead of having a complete dashboard page manage everything, I separated headers, cards, filters, tables, and modal logic into dedicated units. This made the code easier to read, easier to test, and much easier to reuse.</p>

      <ul>
        <li>I defined interfaces for component props instead of passing loosely shaped objects.</li>
        <li>I typed API responses to avoid surprises during integration.</li>
        <li>I reduced the use of <code>any</code> and replaced it with useful domain-specific types.</li>
        <li>I separated UI, services, hooks, and business logic into clearer folders.</li>
      </ul>

      <h2>Why TypeScript helped me more than expected</h2>
      <p>For me, TypeScript is not only about type safety. It is also about communication. When I open a file and see a well-defined type, I immediately understand what data is expected, what is optional, and how different parts of the app connect together. That saves time during development and makes refactoring much safer.</p>

      <p>It also changed how I think about components. A good React component should be predictable, focused, and easy to reuse. TypeScript encourages that because the more precise your types are, the more obvious the component boundaries become.</p>

      <h2>What I do differently now</h2>
      <p>Today, when I start a React project, I think first about structure. I try to identify reusable parts early, define shared types, and avoid mixing rendering logic with business rules. I also pay more attention to naming, because readable code matters just as much as working code.</p>

      <p>I still believe in learning by building, but I no longer build in a purely fast-and-loose way. I prefer a pace that allows the project to grow without becoming difficult to maintain after a few weeks.</p>

      <h2>Final thought</h2>
      <p>If you are still learning React, my advice is simple: do not wait for a “big” project to write cleaner code. Start now. Type the important parts, keep components small, and organize your project in a way that your future self will understand easily. For me, that transition from demos to disciplined habits made a huge difference.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwYmxvZyUyMHdyaXRpbmclMjBjb2Rpbmd8ZW58MXx8fHwxNzU4MzAzNTMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-10-02"),
    readTime: 4,
    tags: ["React", "TypeScript", "Frontend"],
    featured: true,
  },
  {
    id: "2",
    title: "Designing Mobile Features with React Native and a NestJS API",
    excerpt:
      "A practical breakdown of how I design and connect mobile screens to backend services while keeping performance and offline resilience in mind.",
    content: `
      <p>Building mobile applications taught me a lesson that web projects do not always force you to learn immediately: a feature is not finished just because the screen looks good. On mobile, users deal with unstable networks, slower devices, interrupted sessions, and real-world usage that exposes weak architecture very quickly.</p>

      <p>That is why, in my React Native projects, I started paying more attention to structure. I wanted the UI to stay clean, but I also needed the app to remain reliable when API calls failed, when the response was slower than expected, or when the user reopened the app after some time.</p>

      <h2>My usual approach</h2>
      <p>I try to keep a clear separation between the screen layer and the service layer. Screens should mostly focus on rendering, user interactions, and local state linked to the view. API calls, transformation of backend responses, and error handling are easier to maintain when they are grouped in dedicated services.</p>

      <ul>
        <li>The UI layer handles display, forms, navigation, and loading states.</li>
        <li>The service layer centralizes API requests and response mapping.</li>
        <li>Shared models define request and response contracts clearly.</li>
        <li>Reusable hooks help me avoid repeating fetching logic across screens.</li>
      </ul>

      <h2>Why backend design matters for mobile</h2>
      <p>I used NestJS on the backend because I like having a structured framework with modules, services, controllers, and validation. That organization makes it easier to expose clean REST endpoints that mobile screens can consume with fewer surprises. On the database side, PostgreSQL gave me a stable and predictable persistence layer.</p>

      <p>One important thing I learned is that mobile development becomes much easier when the API contract is stable. If field names change often, or if validation is inconsistent, the mobile side becomes fragile very quickly. Clear DTOs and consistent responses reduce debugging time a lot.</p>

      <h2>What I learned from real usage</h2>
      <p>Mobile UX is not only about visuals. Users need feedback when something is loading, when a request fails, or when data is temporarily unavailable. A blank screen or a silent failure creates mistrust immediately. That is why I now treat loading states, retry actions, and error messages as part of the product itself, not just technical details.</p>

      <ul>
        <li>Every request should have a visible loading state.</li>
        <li>Every error should be understandable for the user.</li>
        <li>Forms must remain responsive even when network conditions are poor.</li>
        <li>Caching and temporary persistence can improve the experience significantly.</li>
      </ul>

      <h2>Final thought</h2>
      <p>For me, designing mobile features means thinking beyond the happy path. A strong mobile feature is not only functional when everything is perfect. It should remain understandable, stable, and trustworthy even when the environment is imperfect. That mindset changed the way I connect React Native apps to backend services.</p>
    `,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-09-18"),
    readTime: 4,
    tags: ["React Native", "NestJS", "Mobile"],
    featured: true,
  },
  {
    id: "3",
    title: "Internship Notes: What University Does Not Teach You",
    excerpt:
      "My internship changed how I think about software delivery: priorities, communication, and measurable impact matter as much as code quality.",
    content: `
      <p>During my internship, I worked on an e-commerce management platform. Before that experience, most of my projects followed a familiar pattern: receive requirements, build the solution, test it, and submit it. In a professional environment, I discovered that software development is much more dynamic than that.</p>

      <p>The first major difference was that requirements were not fixed. A feature that seemed clear at the beginning could evolve after a meeting, after user feedback, or because of a business constraint. That taught me that writing code is only one part of the job. Understanding priorities, documenting decisions, and staying aligned with the team are just as important.</p>

      <h2>What felt different from academic projects</h2>
      <ul>
        <li>Requirements changed more often than I expected.</li>
        <li>Deadlines forced us to focus on what delivered value first.</li>
        <li>Code reviews emphasized maintainability and clarity.</li>
        <li>Communication was essential to avoid blockers and misunderstandings.</li>
      </ul>

      <p>At university, success often means making the project work technically. During the internship, success meant delivering something useful, on time, and in a way that the team could continue maintaining later. That changed my perspective a lot.</p>

      <h2>Communication became a real engineering skill</h2>
      <p>I also improved the way I communicate. Instead of waiting too long when I was blocked, I learned to raise issues early. Instead of giving vague updates, I tried to write short and clear progress summaries. When constraints appeared, I did not only report the problem: I tried to suggest alternative solutions.</p>

      <p>This helped me understand that being a good engineer is not only about solving problems alone. It is also about making collaboration easier for everyone around you.</p>

      <h2>What I took from the experience</h2>
      <p>The most important lesson I learned is that software delivery is about continuous value. A strong engineer is not the one who builds the most complex feature in isolation. It is the one who can move the project forward in a reliable way, communicate clearly, and make decisions that serve the real objective of the product.</p>

      <p>That internship helped me mature technically, but even more importantly, it helped me grow professionally.</p>
    `,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-08-22"),
    readTime: 4,
    tags: ["Internship", "Career", "Delivery"],
    featured: false,
  },
  {
    id: "4",
    title: "Building Location-Aware Apps with PostGIS: A Student Guide",
    excerpt:
      "How I used PostGIS to model geo data, run spatial queries, and build practical map features for mobile and web applications.",
    content: `
      <p>PostGIS is one of the technologies that made me realize how far a relational database can go beyond standard CRUD operations. Before using it, I mostly saw databases as tools for storing and retrieving business data. With PostGIS, I discovered that PostgreSQL can also become a powerful spatial engine.</p>

      <p>What interested me most was the ability to work with real geographic concepts directly in the database: points, lines, polygons, distances, intersections, and containment rules. Instead of handling all location logic in the application layer, I could move a large part of that intelligence closer to the data.</p>

      <h2>What I used it for</h2>
      <ul>
        <li>Storing coordinates and geometric shapes for map entities.</li>
        <li>Finding nearby places with distance-based queries.</li>
        <li>Filtering results inside a specific geographic zone.</li>
        <li>Combining classic SQL queries with spatial conditions.</li>
      </ul>

      <h2>Why it was useful</h2>
      <p>In one of my projects, location-based features were not just decorative. The application needed to identify nearby places, support filtering by area, and handle spatial data efficiently. PostGIS made those use cases much more robust. Instead of manually computing everything in code, I could rely on optimized spatial functions and indexing mechanisms.</p>

      <p>The performance advantage was also important. Once the spatial indexes were in place, queries that could have become expensive remained fast enough for practical use. That showed me how valuable it is to choose the right data technology instead of forcing all logic into the backend service.</p>

      <h2>What I learned</h2>
      <p>Using PostGIS taught me to think more carefully about data modeling. Geographic data is not just another field type. It requires clear definitions, the right coordinate system, and a good understanding of the queries you want to support. But once that foundation is set, the possibilities are very strong.</p>

      <p>For students or developers building map-related applications, I think PostGIS is worth learning. It gives you serious geospatial capabilities while staying inside an ecosystem many developers already know well: PostgreSQL and SQL.</p>
    `,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-07-30"),
    readTime: 4,
    tags: ["PostGIS", "GIS", "Backend"],
    featured: false,
  },
  {
    id: "5",
    title: "Traffic Forecasting with ARIMA + SUMO: What Worked, What Failed",
    excerpt:
      "A practical look at combining statistical forecasting and simulation for congestion analysis, including the assumptions that can break your model.",
    content: `
      <p>One of the most interesting projects I worked on combined two different perspectives on traffic analysis: forecasting and simulation. On one side, ARIMA helped model short-term traffic demand from time-series data. On the other side, SUMO allowed me to simulate traffic behavior under different scenarios. Bringing both together gave me a much richer understanding than using either of them alone.</p>

      <h2>The basic pipeline</h2>
      <ul>
        <li>Collect and clean historical traffic data.</li>
        <li>Analyze seasonality and trends in the time series.</li>
        <li>Train an ARIMA model to forecast near-future demand peaks.</li>
        <li>Inject those forecasts into SUMO scenarios for simulation.</li>
        <li>Compare outcomes under different control strategies or interventions.</li>
      </ul>

      <h2>What worked well</h2>
      <p>This combination was useful because it connected prediction with experimentation. Instead of stopping at a forecast chart, I could test what that forecast might mean in a simulated traffic network. For example, if predicted demand increased in a certain period, I could observe how congestion evolved under different assumptions.</p>

      <p>That made the project more realistic and more useful for analysis. It was not just about predicting numbers. It was about understanding possible operational consequences.</p>

      <h2>What did not work as smoothly</h2>
      <p>The biggest limitation came from assumptions. ARIMA can perform well on structured time series, but it becomes less reliable when the data contains abrupt changes, missing values, or unusual events that break normal patterns. Traffic data is often affected by exactly those situations.</p>

      <p>Another issue was that simulation quality depends heavily on the quality of the scenario setup. Even with a reasonable forecast, a simulation can become misleading if the underlying network assumptions are too simplified.</p>

      <h2>Main lesson</h2>
      <p>What I learned is that forecasting and simulation are powerful together, but only if their limits are explicit. A model is not useful because it looks mathematically correct. It is useful when you understand what it can explain, what it cannot explain, and how to validate it iteratively.</p>

      <p>This project strengthened my interest in data-driven systems because it showed me how analytical models and practical decision support can work together.</p>
    `,
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-06-12"),
    readTime: 4,
    tags: ["ARIMA", "SUMO", "Data Science"],
    featured: false,
  },
  {
    id: "6",
    title: "Open Source as a Career Accelerator: A Realistic Approach",
    excerpt:
      "A simple strategy I use to contribute on GitHub without burning out: pick small issues, communicate clearly, and optimize for consistency.",
    content: `
      <p>Open source can look intimidating when you are still learning. Many repositories are large, the codebases are unfamiliar, and it is easy to think you need to make huge contributions to matter. My experience taught me the opposite. What matters most is consistency, clarity, and choosing a scope that matches your current level.</p>

      <p>I started seeing open source not as a place to prove everything at once, but as a place to practice real collaboration. Even a small improvement can teach you a lot if you approach it seriously.</p>

      <h2>My personal framework</h2>
      <ul>
        <li>Choose issues that are understandable and realistic for your current skills.</li>
        <li>Read the project structure before touching the code.</li>
        <li>Write a small plan before implementation.</li>
        <li>Keep pull requests focused and easy to review.</li>
        <li>Respond clearly and respectfully to review feedback.</li>
      </ul>

      <h2>Why this helped me</h2>
      <p>This process improved more than my coding. It improved my Git workflow, my ability to read existing code, my technical writing, and my confidence during code review. Open source also gave me a more public and verifiable way to show how I work, which is valuable for a portfolio or a career transition.</p>

      <p>I also learned that sustainability matters. It is easy to get excited, take on too much, and then disappear from a project. I prefer a smaller but consistent rhythm. That approach keeps motivation high and makes each contribution more thoughtful.</p>

      <h2>Final thought</h2>
      <p>You do not need spectacular contributions to benefit from open source. A realistic, disciplined approach is enough to grow a lot. For me, open source became less about visibility and more about building durable habits that also translate well into professional work.</p>
    `,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-05-20"),
    readTime: 4,
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
      <p>Quand j'ai commence avec React, mon objectif etait surtout de faire fonctionner l'interface. Je voulais afficher les pages rapidement, connecter les boutons, recuperer les donnees, puis passer a la suite. Cette approche m'a aide a apprendre vite, mais apres quelques projets, j'ai commence a voir les memes problemes revenir : duplication de code, props floues, logique melangee dans les composants et bugs decouverts trop tard.</p>

      <p>Le vrai changement est venu quand j'ai commence a utiliser TypeScript serieusement. Au debut, je pensais que cela allait me ralentir, parce qu'il fallait reflechir davantage avant d'ecrire le code. En realite, cela a ameliore mon workflow. Au lieu de deviner ce qu'un composant attend ou ce qu'une API retourne, j'ai commence a definir les interfaces et les types des le depart.</p>

      <h2>Ce qui a change dans ma maniere de travailler</h2>
      <p>J'ai arrete de construire des ecrans entiers dans un seul fichier. J'ai commence a les decouper en composants plus petits, chacun avec une responsabilite claire. Par exemple, au lieu d'avoir toute la logique d'une page dashboard au meme endroit, j'ai separe les cartes, les filtres, les tableaux, les formulaires et les modales.</p>

      <ul>
        <li>Je definis les interfaces des props au lieu de passer des objets flous.</li>
        <li>Je type les reponses API pour eviter les surprises a l'integration.</li>
        <li>Je limite fortement l'usage de <code>any</code>.</li>
        <li>Je separe mieux l'UI, les services, les hooks et la logique metier.</li>
      </ul>

      <h2>Pourquoi TypeScript m'a vraiment aide</h2>
      <p>Pour moi, TypeScript ne sert pas seulement a eviter des erreurs. Il aide aussi a mieux communiquer dans le code. Quand j'ouvre un fichier et que je vois des types bien definis, je comprends rapidement quelles donnees sont attendues, lesquelles sont optionnelles, et comment les differentes parties de l'application se relient entre elles.</p>

      <p>Il a aussi change ma facon de penser les composants. Un bon composant React doit etre previsible, focalise et reutilisable. Le typage pousse naturellement dans cette direction, parce qu'il rend les limites du composant plus visibles.</p>

      <h2>Ce que je fais differemment aujourd'hui</h2>
      <p>Maintenant, quand je commence un projet React, je pense d'abord a la structure. J'essaie d'identifier tot les elements reutilisables, de definir les types partages et d'eviter de melanger affichage et logique metier. Je fais aussi plus attention au naming, parce qu'un code lisible compte autant qu'un code fonctionnel.</p>

      <h2>Conclusion</h2>
      <p>Si tu apprends encore React, mon conseil est simple : n'attends pas un “grand” projet pour adopter de meilleures habitudes. Commence maintenant. Type ce qui compte, garde tes composants petits et organise ton projet pour que ton toi du futur puisse le comprendre facilement. Pour moi, ce passage des demos rapides a des habitudes plus propres a vraiment fait la difference.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwYmxvZyUyMHdyaXRpbmclMjBjb2Rpbmd8ZW58MXx8fHwxNzU4MzAzNTMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-10-02"),
    readTime: 4,
    tags: ["React", "TypeScript", "Frontend"],
    featured: true,
  },
  {
    id: "2",
    title: "Concevoir des fonctionnalites mobiles avec React Native et NestJS",
    excerpt:
      "Retour pratique sur la conception d'ecrans mobiles relies a une API backend, avec un focus sur la performance et la resilience hors ligne.",
    content: `
      <p>Le developpement mobile m'a appris quelque chose d'important : une fonctionnalite n'est pas terminee juste parce que l'ecran est beau. Sur mobile, les utilisateurs ont des reseaux instables, des appareils differents, des interruptions frequentes et des usages reels qui exposent tres vite les faiblesses d'architecture.</p>

      <p>C'est pour cela que, dans mes projets React Native, j'ai commence a faire plus attention a la structure. Je voulais garder une interface claire, mais aussi rendre l'application fiable quand les appels API echouent, quand le temps de reponse est lent ou quand l'utilisateur revient apres une interruption.</p>

      <h2>Mon approche generale</h2>
      <p>J'essaie de bien separer la couche d'affichage et la couche service. Les ecrans doivent surtout gerer le rendu, les interactions utilisateur et l'etat lie a la vue. Les appels reseau, la transformation des donnees et la gestion des erreurs sont plus maintenables lorsqu'ils sont regroupes dans des services dedies.</p>

      <ul>
        <li>La couche UI gere l'affichage, les formulaires et la navigation.</li>
        <li>La couche service centralise les appels API.</li>
        <li>Des modeles partages definissent clairement les contrats de donnees.</li>
        <li>Des hooks reutilisables evitent de dupliquer la logique de recuperation.</li>
      </ul>

      <h2>Pourquoi le backend compte beaucoup</h2>
      <p>J'ai utilise NestJS cote backend parce que j'apprecie sa structure par modules, services et controllers. Cela aide a exposer des endpoints REST propres, plus faciles a consommer depuis le mobile. Avec PostgreSQL, j'avais en plus une base de donnees stable et coherente pour la persistance.</p>

      <p>Une chose tres importante que j'ai apprise, c'est qu'une application mobile devient beaucoup plus simple a maintenir quand le contrat API est stable. Si les champs changent souvent ou si la validation est incoherente, le frontend mobile devient vite fragile.</p>

      <h2>Ce que l'usage reel m'a appris</h2>
      <p>L'experience utilisateur mobile ne se limite pas au design. Il faut donner un retour visuel pendant le chargement, expliquer les erreurs et permettre a l'utilisateur de comprendre ce qui se passe. Un ecran vide ou un echec silencieux cree immediatement de la frustration.</p>

      <ul>
        <li>Chaque requete doit avoir un etat de chargement visible.</li>
        <li>Chaque erreur doit etre compréhensible.</li>
        <li>Les formulaires doivent rester fluides meme avec un reseau lent.</li>
        <li>Le cache et une persistence temporaire peuvent beaucoup ameliorer l'experience.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Pour moi, concevoir une fonctionnalite mobile, c'est penser au-dela du cas ideal. Une bonne fonctionnalite n'est pas seulement celle qui marche quand tout va bien, mais celle qui reste claire, stable et fiable quand les conditions sont imparfaites. C'est cette vision qui a change ma maniere de connecter React Native a des services backend.</p>
    `,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-09-18"),
    readTime: 4,
    tags: ["React Native", "NestJS", "Mobile"],
    featured: true,
  },
  {
    id: "3",
    title: "Notes de stage : ce que l'universite n'enseigne pas",
    excerpt:
      "Mon stage a change ma vision de la livraison logicielle : priorites, communication et impact mesurable comptent autant que la qualite du code.",
    content: `
      <p>Pendant mon stage, j'ai travaille sur une plateforme de gestion e-commerce. Avant cette experience, beaucoup de mes projets suivaient un schema assez classique : recevoir des exigences, coder la solution, tester, puis rendre le travail. En environnement professionnel, j'ai compris que le developpement logiciel est beaucoup plus dynamique.</p>

      <p>La premiere grande difference, c'est que les besoins ne sont pas fixes. Une fonctionnalite qui semble claire au debut peut evoluer apres une reunion, un retour utilisateur ou une contrainte metier. Cela m'a appris que coder n'est qu'une partie du travail. Comprendre les priorites, documenter les decisions et rester aligne avec l'equipe sont tout aussi importants.</p>

      <h2>Ce qui m'a marque par rapport aux projets academiques</h2>
      <ul>
        <li>Les besoins changent plus vite que prevu.</li>
        <li>Les deadlines obligent a livrer ce qui apporte le plus de valeur d'abord.</li>
        <li>Les code reviews insistent sur la maintenabilite et la lisibilite.</li>
        <li>La communication est indispensable pour eviter les blocages.</li>
      </ul>

      <p>A l'universite, reussir signifie souvent que le projet fonctionne techniquement. En stage, reussir signifiait livrer quelque chose d'utile, dans les temps, et d'une maniere que l'equipe pourrait maintenir ensuite. Cela a beaucoup change ma vision.</p>

      <h2>La communication est devenue une vraie competence technique</h2>
      <p>J'ai aussi ameliore ma facon de communiquer. Au lieu d'attendre trop longtemps quand j'etais bloque, j'ai appris a signaler les problemes plus tot. Au lieu de faire des retours vagues, j'ai essaye d'ecrire des updates courts et clairs. Et quand une contrainte apparaissait, je ne me contentais pas de remonter le probleme : j'essayais de proposer des alternatives.</p>

      <h2>Ce que je retiens</h2>
      <p>La lecon la plus importante, c'est que la livraison logicielle concerne la creation de valeur continue. Un bon ingenieur n'est pas seulement celui qui code une fonctionnalite complexe seul. C'est aussi celui qui fait avancer le projet de facon fiable, communique clairement et prend des decisions utiles pour le produit.</p>

      <p>Ce stage m'a fait progresser techniquement, mais surtout professionnellement.</p>
    `,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-08-22"),
    readTime: 4,
    tags: ["Stage", "Carriere", "Delivery"],
    featured: false,
  },
  {
    id: "4",
    title: "Construire des applications geolocalisees avec PostGIS",
    excerpt:
      "Comment j'ai utilise PostGIS pour modeliser des donnees spatiales, executer des requetes geographiques et ajouter des features cartographiques utiles.",
    content: `
      <p>PostGIS fait partie des technologies qui m'ont montre qu'une base de donnees relationnelle peut aller bien au-dela du CRUD classique. Avant de l'utiliser, je voyais surtout la base de donnees comme un endroit pour stocker et recuperer des donnees metier. Avec PostGIS, j'ai decouvert que PostgreSQL pouvait aussi devenir un vrai moteur spatial.</p>

      <p>Ce qui m'a le plus interesse, c'est la possibilite de manipuler directement dans la base des concepts geographiques reels : points, lignes, polygones, distances, intersections et zones. Au lieu de faire toute la logique spatiale dans l'application, je pouvais rapprocher cette intelligence des donnees elles-memes.</p>

      <h2>Ce que j'ai utilise concretement</h2>
      <ul>
        <li>Stockage de coordonnees et de formes geometriques.</li>
        <li>Recherche de lieux proches avec des requetes de distance.</li>
        <li>Filtrage de resultats dans une zone precise.</li>
        <li>Combinaison de SQL classique avec des conditions spatiales.</li>
      </ul>

      <h2>Pourquoi c'etait utile</h2>
      <p>Dans un de mes projets, les fonctionnalites liees a la localisation n'etaient pas secondaires. L'application devait identifier des lieux proches, supporter le filtrage par zone et gerer les donnees geographiques efficacement. PostGIS a rendu tout cela beaucoup plus robuste.</p>

      <p>Le gain de performance etait aussi important. Une fois les index spatiaux bien en place, les requetes restaient rapides et exploitables. Cela m'a montre l'importance de choisir la bonne technologie de donnees au lieu de forcer toute la logique dans le backend.</p>

      <h2>Ce que j'ai appris</h2>
      <p>PostGIS m'a appris a mieux reflechir a la modelisation. La donnee geographique n'est pas un simple champ supplementaire. Il faut choisir le bon systeme de coordonnees, comprendre les requetes qu'on veut supporter et bien penser l'indexation. Mais une fois cette base posee, les possibilites sont tres fortes.</p>

      <p>Pour les etudiants ou developpeurs qui construisent des applications cartographiques, je trouve que PostGIS vaut vraiment la peine d'etre appris.</p>
    `,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-07-30"),
    readTime: 4,
    tags: ["PostGIS", "GIS", "Backend"],
    featured: false,
  },
  {
    id: "5",
    title: "Prevision du trafic avec ARIMA + SUMO : ce qui marche vraiment",
    excerpt:
      "Analyse pratique d'un pipeline combinant prevision statistique et simulation, avec les hypotheses qui peuvent casser un modele.",
    content: `
      <p>L'un des projets les plus interessants sur lesquels j'ai travaille combinait deux approches du trafic : la prevision et la simulation. D'un cote, ARIMA permettait de modeliser la demande a partir de series temporelles. De l'autre, SUMO donnait la possibilite de simuler le comportement du trafic dans differents scenarios. Ensemble, ces deux outils m'ont donne une vision plus riche que si je les avais utilises separement.</p>

      <h2>Le pipeline general</h2>
      <ul>
        <li>Collecter et nettoyer les donnees historiques de trafic.</li>
        <li>Analyser les tendances et la saisonnalite.</li>
        <li>Entrainer un modele ARIMA pour prevoir les pics de demande.</li>
        <li>Injecter ces previsions dans des scenarios SUMO.</li>
        <li>Comparer les resultats selon differentes strategies.</li>
      </ul>

      <h2>Ce qui a bien fonctionne</h2>
      <p>Cette combinaison etait interessante parce qu'elle reliait prediction et experimentation. Au lieu de m'arreter a un graphique de prevision, je pouvais tester ce que cette prevision signifiait dans un reseau simule. Si la demande augmentait a certaines heures, je pouvais observer les effets possibles sur la congestion.</p>

      <p>Cela rendait l'analyse plus concrete. Il ne s'agissait pas seulement de predire des valeurs, mais de mieux comprendre les consequences operationnelles.</p>

      <h2>Ce qui a moins bien marche</h2>
      <p>La plus grande limite venait des hypotheses. ARIMA peut etre pertinent sur des series assez structurees, mais il devient plus fragile en presence de donnees manquantes, d'evenements exceptionnels ou de changements brusques. Or, le trafic reel contient souvent ce genre de perturbations.</p>

      <p>Autre point important : la qualite de la simulation depend fortement du scenario choisi. Meme avec une prevision correcte, une simulation peut etre trompeuse si le reseau ou les hypothèses sont trop simplifies.</p>

      <h2>Lecon principale</h2>
      <p>Ce projet m'a appris que la prevision et la simulation sont tres puissantes ensemble, mais seulement si leurs limites sont bien explicites. Un modele n'est pas utile juste parce qu'il semble mathematiquement correct. Il est utile quand on comprend ce qu'il explique, ce qu'il n'explique pas et comment le valider progressivement.</p>

      <p>Ce travail a renforce mon interet pour les systemes data-driven, parce qu'il montrait bien le lien entre modele analytique et aide a la decision.</p>
    `,
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-06-12"),
    readTime: 4,
    tags: ["ARIMA", "SUMO", "Data Science"],
    featured: false,
  },
  {
    id: "6",
    title: "Open source comme accelerateur de carriere",
    excerpt:
      "Une methode simple pour contribuer sur GitHub sans epuisement : petites issues, communication claire et progression reguliere.",
    content: `
      <p>L'open source peut sembler intimidant quand on est encore en apprentissage. Beaucoup de repositories sont volumineux, les codebases sont inconnues, et on peut vite penser qu'il faut faire de tres grosses contributions pour etre legitime. Mon experience m'a montre l'inverse. Ce qui compte le plus, c'est la regularite, la clarte et le choix d'un scope adapte a son niveau actuel.</p>

      <p>J'ai commence a voir l'open source non pas comme un endroit pour tout prouver d'un coup, mais comme un terrain pour apprendre une vraie collaboration technique. Meme une petite amelioration peut enseigner beaucoup si on l'aborde serieusement.</p>

      <h2>Mon cadre personnel</h2>
      <ul>
        <li>Choisir des issues realistes par rapport a mon niveau actuel.</li>
        <li>Lire la structure du projet avant de modifier le code.</li>
        <li>Ecrire un petit plan avant l'implementation.</li>
        <li>Garder des pull requests simples et faciles a reviewer.</li>
        <li>Repondre clairement et avec respect aux retours.</li>
      </ul>

      <h2>Pourquoi cela m'a aide</h2>
      <p>Ce processus a ameliore plus que mon code. Il a renforce mon workflow Git, ma capacite a lire du code existant, ma redaction technique et ma confiance pendant les reviews. L'open source m'a aussi donne une facon plus visible et verifiable de montrer ma maniere de travailler, ce qui est utile pour un portfolio ou une evolution de carriere.</p>

      <p>J'ai aussi compris qu'il fallait rester durable. Il est facile de se surcharger au debut puis de disparaitre. Je prefere un rythme plus modeste mais regulier. Cela permet de rester motive et de produire des contributions plus propres.</p>

      <h2>Conclusion</h2>
      <p>Il n'est pas necessaire de faire des contributions spectaculaires pour progresser grace a l'open source. Une approche simple, realiste et disciplinee suffit largement. Pour moi, l'open source est devenu moins une question de visibilite qu'un moyen de construire de bonnes habitudes qui servent aussi dans le monde professionnel.</p>
    `,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    author: "Yacouba",
    publishedAt: new Date("2025-05-20"),
    readTime: 4,
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
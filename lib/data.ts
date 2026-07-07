// ═══════════════════════════════════════════════════════════════
// PORTFOLIO DATA — ANIKET RAMDAS DANGE
// ═══════════════════════════════════════════════════════════════

export const personal = {
  name: "Aniket Ramdas Dange",
  initials: "ARD",
  title: "Full Stack Developer",
  roles: [
    "Full Stack Developer",
    "React.js Engineer",
    "AI Integration Builder",
    "MERN Stack Expert",
  ],
  tagline: "I build digital products people remember.",
  bio: "Results-driven Full Stack Developer with 3+ years of experience building end-to-end web applications across the MERN stack, Next.js, and TypeScript. Hands-on with RESTful API design, JWT/RBAC authentication, and integrating AI/ML capabilities (OpenAI, Gemini, RAG pipelines) into production apps. Delivered government portals, education platforms, and enterprise billing systems.",
  email: "aniket.dange@email.com",
  phone: "+91 9665540016",
  github: "https://github.com/aniketdange3",
  linkedin: "https://www.linkedin.com/in/aniket508/",
  location: "Nagpur, Maharashtra, India",
  available: true,
  stats: {
    projects: 5,
    years: 3,
    clients: 10,
    apis: 15,
  },
};

export const skills = [
  // Languages
  { id: "javascript", label: "JavaScript (ES6+)", category: "frontend", level: 95, color: "#F7DF1E", desc: "Building dynamic interactive components and core web application logic." },
  { id: "typescript", label: "TypeScript", category: "frontend", level: 90, color: "#3178C6", desc: "Adding static type safety and preventing runtime errors in large apps." },
  { id: "html5", label: "HTML5", category: "frontend", level: 95, color: "#E34F26", desc: "Creating semantically correct web document structures for SEO and accessibility." },
  { id: "css3", label: "CSS3", category: "frontend", level: 92, color: "#1572B6", desc: "Creating fluid responsive layouts and modern hardware-accelerated animations." },

  // Frontend
  { id: "react", label: "React.js", category: "frontend", level: 95, color: "#61DAFB", desc: "Building reusable virtual DOM UI components and managing client states." },
  { id: "nextjs", label: "Next.js", category: "frontend", level: 88, color: "#FFFFFF", desc: "Server-side rendering, static generation, API routing, and high-performance layouts." },
  { id: "redux", label: "Redux Toolkit", category: "frontend", level: 85, color: "#764ABC", desc: "Handling global application state, slice patterns, and complex data flows." },
  { id: "tanstack", label: "TanStack Query", category: "frontend", level: 82, color: "#FF4154", desc: "Caching server states, auto-refetches, and asynchronous data syncing." },
  { id: "tailwind", label: "Tailwind CSS", category: "frontend", level: 95, color: "#06B6D4", desc: "Utility-first rapid responsive styling and component customization." },
  { id: "mui", label: "Material UI", category: "frontend", level: 80, color: "#007FFF", desc: "Ready-made customizable React UI widgets following Google Design guidelines." },
  { id: "bootstrap", label: "Bootstrap", category: "frontend", level: 85, color: "#7952B3", desc: "Quick layout grids and legacy framework CSS styling components." },

  // Backend
  { id: "nodejs", label: "Node.js", category: "backend", level: 88, color: "#339933", desc: "Executing server-side JS, high-concurrency event loops, and tooling." },
  { id: "expressjs", label: "Express.js", category: "backend", level: 88, color: "#FFFFFF", desc: "Building lightweight MVC server architectures, routers, and request handlers." },
  { id: "restapi", label: "RESTful APIs", category: "backend", level: 92, color: "#00D9FF", desc: "Structuring CRUD APIs, status codes, endpoints, and request payloads." },
  { id: "jwt", label: "JWT / RBAC", category: "backend", level: 85, color: "#7B5EFF", desc: "Configuring stateless token authorization and role-based permissions." },

  // Database
  { id: "mongodb", label: "MongoDB", category: "backend", level: 85, color: "#47A248", desc: "Storing schemaless JSON document databases, aggregation queries, and indexing." },
  { id: "postgres", label: "PostgreSQL", category: "backend", level: 78, color: "#4169E1", desc: "Executing relational schemas, complex joins, and database queries." },
  { id: "mongoose", label: "Mongoose", category: "backend", level: 85, color: "#880000", desc: "Object modeling for MongoDB, defining schemas, validations, and hooks." },

  // AI / ML
  { id: "openai", label: "OpenAI API", category: "ai", level: 82, color: "#00A67E", desc: "Integrating LLM smarts, text generation, and dynamic chat responses." },
  { id: "gemini", label: "Google Gemini", category: "ai", level: 78, color: "#8AB4F8", desc: "Deploying multi-modal analysis, reasoning tasks, and lightweight agents." },
  { id: "rag", label: "RAG Pipelines", category: "ai", level: 75, color: "#FFB547", desc: "Providing external vector knowledge databases to LLMs for custom facts." },
  { id: "prompt", label: "Prompt Engineering", category: "ai", level: 80, color: "#FF5E8A", desc: "Designing system messages, chain-of-thought instructions, and context windows." },

  // Testing
  { id: "jest", label: "Jest", category: "backend", level: 80, color: "#C21325", desc: "Writing automated JavaScript unit tests, mock handlers, and snapshot assertions." },
  { id: "rtl", label: "React Testing Lib", category: "backend", level: 78, color: "#E33332", desc: "Testing React elements by querying standard DOM queries like users do." },

  // Tools & DevOps
  { id: "git", label: "Git & GitHub", category: "cloud", level: 90, color: "#F05032", desc: "Managing version branches, PR reviews, and team codebase synchronization." },
  { id: "vite", label: "Vite / Webpack", category: "cloud", level: 82, color: "#646CFF", desc: "Bundling source code, live hot reload, transpilers, and loading assets." },
  { id: "figma", label: "Figma", category: "cloud", level: 75, color: "#F24E1E", desc: "Extracting design styles, dimensions, grid specs, and prototype layouts." },
  { id: "postman", label: "Postman", category: "cloud", level: 85, color: "#FF6C37", desc: "Testing request payloads, headers, response status codes, and mock APIs." },
  { id: "cicd", label: "CI/CD Pipelines", category: "cloud", level: 72, color: "#00D9FF", desc: "Automating builds, testing scripts, and cloud deployments on git push." },
];

export const skillConnections = [
  ["react", "nextjs"], ["react", "redux"], ["react", "tanstack"],
  ["react", "typescript"], ["nextjs", "tailwind"], ["nextjs", "typescript"],
  ["nodejs", "expressjs"], ["nodejs", "mongodb"], ["nodejs", "postgres"],
  ["expressjs", "restapi"], ["restapi", "jwt"], ["jwt", "react"],
  ["mongodb", "mongoose"], ["openai", "rag"], ["gemini", "rag"],
  ["rag", "prompt"], ["prompt", "openai"], ["jest", "rtl"],
  ["jest", "react"], ["git", "cicd"], ["vite", "react"],
  ["figma", "tailwind"], ["postman", "restapi"], ["tanstack", "restapi"],
  ["redux", "react"],
];

export const projects = [
  {
    id: "garmsarthi",
    title: "Garmsarthi",
    subtitle: "Government Land Record Portal",
    description:
      "Land record and village data management portal serving 200+ government officials across Maharashtra. Handles Namuna 8 & 9 records with advanced search, filtering, and reporting. Achieved 95% accessibility score with WCAG compliance and ARIA semantics.",
    tags: ["React.js", "Tailwind CSS", "RESTful APIs", "JWT", "RBAC", "WCAG"],
    color: "#7B5EFF",
    accent: "#00D9FF",
    metrics: {
      users: "200+ Officials",
      retrieval: "50% Faster",
      a11y: "95% Score",
      coverage: "85% Tests",
    },
    links: { github: "https://github.com/aniketdange3/gramsarti-master", live: "http://91.98.152.25:5051/dashboard" },
    featured: true,
  },
  {
    id: "pathneo",
    title: "Pathneo",
    subtitle: "Education & Counseling Platform",
    description:
      "Full-stack MERN education platform with student, counselor, and admin dashboards. Role-specific interfaces and permissions, real-time analytics, user profile management, and 100% mobile/desktop compatibility via responsive design and JWT authentication.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "JWT"],
    color: "#FF5E8A",
    accent: "#FFB547",
    metrics: {
      dashboards: "3 Role Types",
      compat: "100% Responsive",
      auth: "JWT + RBAC",
      stack: "Full MERN",
    },
    links: { github: "#", live: "#" },
    featured: true,
  },
  {
    id: "billing",
    title: "ConstructBill",
    subtitle: "Construction Billing & Management",
    description:
      "End-to-end billing, estimation, and project tracking system for construction businesses. Invoice generation, customer management, financial dashboards with interactive charts, and PDF/Excel export functionality. Processes 500+ monthly transactions.",
    tags: ["MERN Stack", "Redux Toolkit", "Charts", "PDF Export", "Excel"],
    color: "#00D9FF",
    accent: "#7B5EFF",
    metrics: {
      transactions: "500+/Month",
      modules: "Billing + CRM",
      export: "PDF & Excel",
      tracking: "Real-time",
    },
    links: { github: "#", live: "#" },
    featured: true,
  },
  {
    id: "midline",
    title: "MidLine Media",
    subtitle: "Corporate Website",
    description:
      "Fully responsive corporate website with SEO optimization (meta tags, sitemap, structured data), reusable component library, and optimized performance. The component library reduced future development effort by 40%.",
    tags: ["React.js", "Tailwind CSS", "SEO", "Responsive", "Component Library"],
    color: "#FFB547",
    accent: "#FF5E8A",
    metrics: {
      seo: "Optimized",
      effort: "40% Saved",
      design: "Responsive",
      components: "Reusable Lib",
    },
    links: { github: "#", live: "#" },
    featured: false,
  },
  {
    id: "resort",
    title: "Resort Booking",
    subtitle: "Hospitality Booking Platform",
    description:
      "Responsive resort booking interface with room listings, gallery, availability calendar, and inquiry management. Cross-device optimized with a 90+ Lighthouse performance score.",
    tags: ["React.js", "Bootstrap", "Responsive", "Lighthouse 90+"],
    color: "#00F5A0",
    accent: "#00D9FF",
    metrics: {
      lighthouse: "90+ Score",
      devices: "All Screens",
      features: "Booking Flow",
      perf: "Optimized",
    },
    links: { github: "#", live: "#" },
    featured: false,
  },
];

export const experience = [
  {
    year: "Jan 2025 – Present",
    role: "Full Stack / React Developer",
    company: "Cluematrix Technologies Pvt. Ltd.",
    location: "Nagpur, Maharashtra",
    description:
      "Developing scalable, full-stack web applications using React.js, TypeScript, Node.js, Express.js, and Tailwind CSS across 5+ enterprise modules. Collaborating in Agile/Scrum sprints with 4 backend developers and 2 UI/UX designers.",
    achievements: [
      "30% faster delivery by building reusable component libraries",
      "Designed & integrated 15+ RESTful APIs, reducing API call redundancy by 40% with TanStack Query",
      "Implemented JWT auth + RBAC for secure government platforms",
      "Reduced initial page load time by 35% via code splitting, lazy loading, and image optimization",
      "85% code coverage with Jest and React Testing Library",
      "Delivered Garmsarthi & Pathneo on schedule",
    ],
    color: "#7B5EFF",
  },
  {
    year: "Jun 2024 – Dec 2024",
    role: "React Developer Intern",
    company: "Eliora IT Services Pvt. Ltd.",
    location: "Nagpur, Maharashtra",
    description:
      "Developed responsive UIs with React.js, ES6+, and React Router for 3 production applications. Recognized as 'Most Improved Developer' in December 2024.",
    achievements: [
      "20+ reusable UI components (modals, forms, data tables) with consistent design patterns",
      "Reduced form submission errors by 50% via validation, error handling & Axios API integration",
      "Participated in weekly code reviews and Agile sprint ceremonies",
      "Recognized as 'Most Improved Developer' — December 2024",
    ],
    color: "#FF5E8A",
  },
  {
    year: "Aug 2022 – May 2023",
    role: "Web Development Intern (Remote)",
    company: "Skill Academy",
    location: "Navi Mumbai, Maharashtra",
    description:
      "Built responsive web pages for internal tools, resolved frontend issues, and gained hands-on experience across the full software development life cycle.",
    achievements: [
      "Built responsive pages with HTML5, CSS3, Bootstrap, and JavaScript",
      "Debugged and resolved 30+ frontend issues, reducing bug reports by 25%",
      "Gained hands-on Git version control and SDLC experience",
    ],
    color: "#00D9FF",
  },
];

export const education = [
  {
    degree: "Bachelor of Engineering — Computer Science & Engineering",
    institution: "RTM Nagpur University, Maharashtra",
    year: "Aug 2018 – Jun 2022",
    grade: "CGPA: 8.2 / 10",
    color: "#7B5EFF",
  },
  {
    degree: "Diploma in Computer Science Engineering",
    institution: "Government Polytechnic, Bramhapuri",
    year: "Jun 2016 – May 2019",
    grade: "78%",
    color: "#FF5E8A",
  },
];

export const certifications = [
  {
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta",
    date: "Mar 2024",
    color: "#0082FB",
  },
  {
    title: "Foundations of UX Design",
    issuer: "Google",
    date: "Nov 2023",
    color: "#4285F4",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "Aug 2023",
    color: "#0A0A23",
  },
  {
    title: "Front-End Development Libraries",
    issuer: "freeCodeCamp",
    date: "Oct 2023",
    color: "#0A0A23",
  },
  {
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    date: "Dec 2023",
    color: "#00D9FF",
  },
];

export const achievements = [
  {
    stat: "72 → 94",
    label: "Lighthouse Score",
    desc: "Improved via lazy loading, code splitting & image optimization",
    color: "#7B5EFF",
  },
  {
    stat: "−30%",
    label: "Bug Rate",
    desc: "Systematic unit testing and structured code reviews",
    color: "#00D9FF",
  },
  {
    stat: "85%",
    label: "Test Coverage",
    desc: "Jest + React Testing Library across critical modules",
    color: "#FF5E8A",
  },
  {
    stat: "15+",
    label: "APIs Integrated",
    desc: "RESTful APIs with 40% reduction in redundant calls",
    color: "#FFB547",
  },
];

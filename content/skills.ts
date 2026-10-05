/** Simple Icons slugs with a glyph in `components/skills/tech-icon.tsx`. */
export type TechIcon =
  | "javascript"
  | "typescript"
  | "nodedotjs"
  | "nestjs"
  | "express"
  | "react"
  | "nextdotjs"
  | "tailwindcss"
  | "shadcnui"
  | "postgresql"
  | "mysql"
  | "mongodb"
  | "python"
  | "numpy"
  | "pandas"
  | "scikitlearn"
  | "pytorch"
  | "huggingface"
  | "jupyter"
  | "googlecolab"
  | "kaggle"
  | "opencv"
  | "ultralytics"
  | "git"
  | "github"
  | "linux"
  | "docker"
  | "postman"
  | "vercel"
  | "claudecode"
  | "ollama";

/** Generic lucide glyphs for concept skills (`ConceptIcon` in tech-icon.tsx) — never brand logos. */
export type ConceptGlyph =
  | "server"
  | "boxes"
  | "exchange"
  | "braces"
  | "layers"
  | "app-window"
  | "pipeline"
  | "editor"
  | "query"
  | "database"
  | "schema"
  | "chart"
  | "scatter"
  | "graph"
  | "evaluate"
  | "gauge"
  | "eye"
  | "tags"
  | "detect"
  | "shapes"
  | "adjust"
  | "augment"
  | "patches"
  | "stack"
  | "fast"
  | "chip"
  | "scan-text"
  | "combine"
  | "question"
  | "route"
  | "blend"
  | "embedding"
  | "light"
  | "flask"
  | "microscope"
  | "test-tubes"
  | "timer"
  | "checklist"
  | "design"
  | "book"
  | "wrench"
  | "file-search"
  | "responsive";

export type Skill = {
  name: string;
  /** Only real technologies get a logo. */
  icon?: TechIcon;
  /** Optional generic glyph for a concept skill (no logo exists for concepts). */
  glyph?: ConceptGlyph;
  /** Stronger visual treatment. Prominence only — never a proficiency rating. */
  featured?: boolean;
};

/** primary = strongest · secondary = supporting · emerging = research direction (CLAUDE.md §9). */
export type SkillTier = "primary" | "secondary" | "emerging";

export type SkillCategoryId =
  | "ai-ml"
  | "computer-vision"
  | "multimodal"
  | "research"
  | "software-engineering"
  | "backend"
  | "data"
  | "frontend"
  | "tools";

export type SkillCategory = {
  id: SkillCategoryId;
  title: string;
  /** Neutral, visible verb so the tier never relies on color alone. */
  stance:
    "Developing" | "Focused on" | "Exploring" | "Researching" | "Building with" | "Working with";
  tier: SkillTier;
  description: string;
  skills: Skill[];
};

// Visual order on /skills (AI-first). Card numbers derive from this order.
// TODO(content): descriptions are draft copy — owner to review.
export const skillCategories: SkillCategory[] = [
  {
    id: "ai-ml",
    title: "AI / Machine Learning",
    stance: "Developing",
    tier: "primary",
    description: "Training and evaluating models in Python, from classical ML to deep learning.",
    skills: [
      { name: "Python", icon: "python", featured: true },
      { name: "NumPy", icon: "numpy" },
      { name: "Pandas", icon: "pandas" },
      { name: "Scikit-learn", icon: "scikitlearn" },
      { name: "Machine Learning", glyph: "scatter" },
      { name: "Deep Learning", featured: true, glyph: "graph" },
      { name: "PyTorch", icon: "pytorch", featured: true },
      { name: "Hugging Face", icon: "huggingface" },
      { name: "Jupyter", icon: "jupyter" },
      { name: "Google Colab", icon: "googlecolab" },
      { name: "Kaggle", icon: "kaggle" },
      { name: "Model Evaluation", glyph: "evaluate" },
      { name: "Model Optimization", glyph: "gauge" },
    ],
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    stance: "Focused on",
    tier: "primary",
    description:
      "My primary AI focus: models that classify, detect and understand images, with an eye on efficiency and edge deployment.",
    skills: [
      { name: "Computer Vision", featured: true, glyph: "eye" },
      { name: "Image Classification", glyph: "tags" },
      { name: "Object Detection", glyph: "detect" },
      { name: "Image Segmentation", glyph: "shapes" },
      { name: "Image Processing", glyph: "adjust" },
      { name: "Data Augmentation", glyph: "augment" },
      { name: "Vision Transformers", featured: true, glyph: "patches" },
      { name: "CNNs", glyph: "stack" },
      { name: "OpenCV", icon: "opencv" },
      { name: "YOLO (Ultralytics)", icon: "ultralytics" },
      { name: "Efficient Vision Models", glyph: "fast" },
      { name: "Edge AI", glyph: "chip" },
    ],
  },
  {
    id: "multimodal",
    title: "Multimodal AI",
    stance: "Exploring",
    tier: "emerging",
    description: "Where vision meets language: how models ground text in what they see.",
    skills: [
      { name: "Vision-Language Models", featured: true, glyph: "scan-text" },
      { name: "Multimodal AI", featured: true, glyph: "combine" },
      { name: "Visual Question Answering", glyph: "question" },
      { name: "Vision-Language Reasoning", glyph: "route" },
      { name: "Multimodal Learning", glyph: "blend" },
      { name: "Visual Representation Learning", glyph: "embedding" },
      { name: "Efficient VLMs", glyph: "light" },
    ],
  },
  {
    id: "research",
    title: "AI Research",
    stance: "Researching",
    tier: "emerging",
    description: "Reading, reproducing and testing ideas, with a focus on model efficiency.",
    skills: [
      { name: "AI Research", glyph: "flask" },
      { name: "Computer Vision Research", glyph: "microscope" },
      { name: "Deep Learning Research", glyph: "test-tubes" },
      { name: "Model Efficiency", glyph: "timer" },
      { name: "AI Evaluation", glyph: "checklist" },
      { name: "Experimental Design", glyph: "design" },
      { name: "Literature Review", glyph: "book" },
      { name: "Research Prototyping", glyph: "wrench" },
      { name: "Paper Analysis", glyph: "file-search" },
    ],
  },
  {
    id: "software-engineering",
    title: "Software Engineering",
    stance: "Building with",
    tier: "primary",
    description: "Building scalable production systems — the foundation everything else runs on.",
    skills: [
      { name: "TypeScript", icon: "typescript", featured: true },
      { name: "JavaScript", icon: "javascript" },
      { name: "Python", icon: "python", featured: true },
      { name: "Software Architecture", glyph: "layers" },
      { name: "Web Application Development", glyph: "app-window" },
    ],
  },
  // The four below sit under Software Engineering in the owner's priority order.
  {
    id: "backend",
    title: "Backend",
    stance: "Building with",
    tier: "primary",
    description: "My main engineering focus: APIs and backend services for production systems.",
    skills: [
      { name: "Node.js", icon: "nodedotjs", featured: true },
      { name: "NestJS", icon: "nestjs", featured: true },
      { name: "Express.js", icon: "express" },
      { name: "REST APIs", glyph: "exchange" },
      { name: "API Design", glyph: "braces" },
      { name: "Backend Development", glyph: "server" },
      { name: "Microservices", glyph: "boxes" },
    ],
  },
  {
    id: "data",
    title: "Database & Data",
    stance: "Working with",
    tier: "secondary",
    description: "Modeling, storing and visualizing data for production applications.",
    skills: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "SQL", glyph: "query" },
      { name: "Database Design", glyph: "database" },
      { name: "Data Modeling", glyph: "schema" },
      { name: "Tableau", glyph: "chart" }, // no Simple Icons logo
      { name: "Power BI", glyph: "chart" }, // no Simple Icons logo (Microsoft)
    ],
  },
  // Hidden by owner request — uncomment to restore (also the link below + placement in skills-ecosystem.tsx).
  /*
  {
    id: "frontend",
    title: "Frontend",
    stance: "Working with",
    tier: "secondary",
    description: "Interfaces for the systems I build, including this site.",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "shadcn/ui", icon: "shadcnui" },
      { name: "Responsive Web Design", glyph: "responsive" },
    ],
  },
  */
  {
    id: "tools",
    title: "Tools & Engineering",
    stance: "Working with",
    tier: "secondary",
    description: "The everyday toolchain behind shipping and experimenting.",
    // REST APIs lives under Backend only (it was listed in both).
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Linux", icon: "linux" },
      { name: "Docker", icon: "docker" },
      { name: "Postman", icon: "postman" },
      { name: "Vercel", icon: "vercel" },
      { name: "CI/CD", glyph: "pipeline" },
      { name: "Claude Code", icon: "claudecode" },
      { name: "Ollama", icon: "ollama" },
      { name: "VS Code", glyph: "editor" }, // generic glyph: Microsoft logos are not in Simple Icons
    ],
  },
];

/** Id of the research-direction node in the graph (not a category). */
export const DIRECTION_ID = "direction";

/** Related pairs: drawn as traces on /skills and used for hover emphasis. Order = source → target. */
export const skillLinks: [string, string][] = [
  ["ai-ml", "computer-vision"],
  ["ai-ml", "multimodal"],
  ["ai-ml", "research"],
  ["multimodal", "research"],
  ["computer-vision", "multimodal"],
  ["multimodal", DIRECTION_ID],
  ["research", DIRECTION_ID],
  ["computer-vision", "software-engineering"],
  [DIRECTION_ID, "software-engineering"],
  ["software-engineering", "backend"],
  ["software-engineering", "data"],
  // ["software-engineering", "frontend"], // Frontend hidden — see above
  ["software-engineering", "tools"],
  ["backend", "data"],
];

export type DirectionStep = { label: string; phase: "now" | "next" | "horizon" };

/** Where the research is heading — a direction, not a claim of expertise. */
export const researchDirection: DirectionStep[] = [
  { label: "Computer Vision", phase: "now" },
  { label: "Multimodal AI", phase: "now" },
  { label: "Vision-Language Models", phase: "now" },
  { label: "Embodied AI", phase: "next" },
  { label: "World Models", phase: "horizon" },
];

export const skillsCopy = {
  eyebrow: "Technical expertise",
  title: "Skills & Technologies",
  intro:
    "Building production software today while exploring intelligent systems, computer vision, and multimodal AI for tomorrow.",
};

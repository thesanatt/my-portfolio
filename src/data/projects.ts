export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  longDescription: string;
  features: string[];
  techDetails: { label: string; value: string }[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "scholartrace",
    title: "ScholarTrace",
    subtitle: "Developer Tools \u00B7 Academic Integrity",
    description:
      "A VS Code extension that listens to every file edit, debounces keystrokes, and snapshots code with timestamps to build a tamper-proof authorship timeline. Logs are pushed to an Express/MongoDB backend where professors can review student coding history.",
    tags: ["React", "TypeScript", "Express", "MongoDB"],
    longDescription:
      "ScholarTrace was built to solve a real problem in academic integrity \u2014 how do you prove that a student actually wrote their own code? The system works by installing a VS Code extension that silently monitors every file edit. It debounces keystrokes (waits 5 seconds after the student stops typing), then snapshots the full file content with a timestamp and filename. These snapshots build a detailed timeline of how the code was actually written, edit by edit. When the student is ready, they enter their email and push all logs to an Express backend connected to MongoDB. On the other side, professors can log in to a React dashboard and review any student\u2019s full coding timeline \u2014 seeing exactly when code was written, in what order, and how it evolved over time.",
    features: [
      "VS Code extension that tracks every file edit in real-time",
      "Debounced logging \u2014 snapshots only after 5 seconds of inactivity to reduce noise",
      "Tamper-proof timestamps on every code snapshot",
      "Student-to-server log upload linked by email identity",
      "Professor-facing React dashboard for reviewing coding timelines",
      "Express + MongoDB backend for log storage and retrieval",
      "HTML export option for offline log review",
    ],
    techDetails: [
      { label: "Extension", value: "VS Code Extension API, TypeScript" },
      { label: "Frontend", value: "React" },
      { label: "Backend", value: "Node.js, Express" },
      { label: "Database", value: "MongoDB, Mongoose" },
      { label: "Auth", value: "Email-based student identification" },
      { label: "Deployment", value: "VS Code Marketplace" },
    ],
    githubUrl: "https://github.com/thesanatt",
  },
  {
    slug: "ai-cost-prediction",
    title: "AI Task Cost Prediction",
    subtitle: "Machine Learning \u00B7 Optimization",
    description:
      "A Streamlit app that takes a plain-text project description, extracts resource needs through keyword scoring, runs predictions through a multi-output Random Forest model, and outputs staffing estimates with confidence intervals and total cost.",
    tags: ["Python", "scikit-learn", "Streamlit", "joblib"],
    longDescription:
      "This project started from a simple question: if you describe a software project in plain English, can a model predict how many developers, designers, AI specialists, and other roles you\u2019ll need, and what it\u2019ll cost? The system takes a text description, runs it through a keyword-based feature extractor that scores relevance to different resource types (developers, designers, AI agents, legal devs, AI specialists), then feeds those scores into a multi-output Random Forest model. The model predicts staffing counts for each role, calculates confidence intervals using individual decision tree predictions (10th-90th percentile), and multiplies everything by weekly cost rates to produce a total project estimate. The whole thing runs in a Streamlit interface where you type a description and get instant predictions.",
    features: [
      "Plain-text project description as input \u2014 no forms or structured data needed",
      "Keyword-based feature extraction with weighted scoring across 25+ tech/business terms",
      "Multi-output Random Forest model predicting 5 resource types simultaneously",
      "Confidence intervals from individual tree predictions (10th-90th percentile)",
      "Cost estimation based on configurable weekly role rates",
      "Special case handling (e.g., landing page detection bypasses the model)",
      "Interactive Streamlit UI with real-time predictions",
    ],
    techDetails: [
      { label: "ML Model", value: "Multi-output Random Forest (scikit-learn)" },
      { label: "Features", value: "Custom keyword scoring, 25+ weighted terms" },
      { label: "Frontend", value: "Streamlit" },
      { label: "Training", value: "19 labeled project descriptions" },
      { label: "Serialization", value: "joblib" },
      { label: "Language", value: "Python" },
    ],
    githubUrl: "https://github.com/thesanatt",
  },
];

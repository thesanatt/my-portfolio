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
        "How do you prove you actually wrote your own code? That was the question. ScholarTrace is a VS Code extension that runs in the background while you code. It waits until you stop typing for 5 seconds, then takes a full snapshot of your file with a timestamp. Over time, this builds a timeline of every edit you made, in order. When you are done, you enter your email and push the logs to a server. On the professor side, there is a React dashboard where they can pull up any student and see exactly how their code evolved. The whole point is that if someone accuses you of copying, you have receipts."    features: [
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
        "You type a project description in plain English, like 'build a mobile banking app with AI chatbot,' and the system tells you how many developers, designers, AI specialists, and other roles you will need, plus what it will cost. Under the hood, it runs your description through a keyword scorer that maps terms like 'chatbot' or 'compliance' to different resource types, then feeds those scores into a Random Forest model that predicts headcount for each role. It also gives you confidence intervals so you know how sure the model is. The whole thing runs in Streamlit so you get results instantly."    features: [
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

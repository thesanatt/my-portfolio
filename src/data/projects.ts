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
      "A VS Code extension and web dashboard that tracks how students write code. The extension silently snapshots every file edit, and professors can review full coding timelines through a class-based dashboard with real auth and access control.",
    tags: ["TypeScript", "Next.js", "Express", "MongoDB", "JWT"],
    longDescription:
      "ScholarTrace started from a simple question: how does a student prove they actually wrote their own code? The system has three parts. First, a VS Code extension that runs in the background while you code. It debounces your keystrokes and takes a full snapshot of your file every time you pause for 5 seconds. These snapshots get tagged with your email and a class code your professor gives you, then uploaded to the backend. Second, an Express API on Railway with real JWT auth, bcrypt password hashing, and class-based access control. Professors register, create classes that auto-generate 6-character join codes, and can only see students who uploaded to their own classes. Third, a Next.js dashboard on Vercel where professors log in, select a class, browse students, and step through their full coding timeline snapshot by snapshot with line numbers and syntax highlighting. The extension is live on the VS Code Marketplace and the whole system has a 30-test end-to-end test suite.",
    features: [
      "VS Code extension with a sidebar panel, onboarding flow, live tracking indicator, and snapshot counter",
      "Debounced edit tracking that snapshots files after 5 seconds of inactivity",
      "Class system with auto-generated 6-character join codes that students enter in the extension",
      "Extension validates class codes against the backend before saving",
      "Professor registration and login with bcrypt hashing and JWT tokens",
      "Class-based access control so professors only see their own students",
      "Dashboard with class selector, student search, snapshot timeline, and full code viewer with line numbers",
      "Delete class and remove student data with confirmation modals",
      "HTML export for offline log review",
      "30-test end-to-end test suite covering auth, classes, uploads, and deletion",
      "Proprietary license protecting the codebase",
    ],
    techDetails: [
      { label: "Extension", value: "TypeScript, VS Code Extension API, Webview sidebar" },
      { label: "Dashboard", value: "Next.js 16, React 19, TypeScript, Tailwind CSS 4" },
      { label: "Backend", value: "Node.js, Express 5, Mongoose, JWT, bcryptjs" },
      { label: "Database", value: "MongoDB Atlas (Professor, Class, LogEntry models)" },
      { label: "Hosting", value: "Vercel (dashboard), Railway (API), VS Code Marketplace" },
      { label: "Testing", value: "30-test E2E bash script" },
    ],
    githubUrl: "https://github.com/thesanatt/ScholarTrace",
    liveUrl: "https://scholar-trace.vercel.app",
  },
  {
    slug: "ai-cost-prediction",
    title: "AI Task Cost Prediction",
    subtitle: "Machine Learning \u00B7 Optimization",
    description:
      "A Streamlit app that takes a plain-text project description, extracts resource needs through keyword scoring, runs predictions through a multi-output Random Forest model, and outputs staffing estimates with confidence intervals and total cost.",
    tags: ["Python", "scikit-learn", "Streamlit", "joblib"],
    longDescription:
      "You type a project description in plain English, like 'build a mobile banking app with AI chatbot,' and the system tells you how many developers, designers, AI specialists, and other roles you will need, plus what it will cost. Under the hood, it runs your description through a keyword scorer that maps terms like 'chatbot' or 'compliance' to different resource types, then feeds those scores into a Random Forest model that predicts headcount for each role. It also gives you confidence intervals so you know how sure the model is. The whole thing runs in Streamlit so you get results instantly.",
    features: [
      "Plain-text project description as input, no forms or structured data needed",
      "Keyword-based feature extraction with weighted scoring across 25+ tech and business terms",
      "Multi-output Random Forest model predicting 5 resource types simultaneously",
      "Confidence intervals from individual tree predictions (10th-90th percentile)",
      "Cost estimation based on configurable weekly role rates",
      "Special case handling for simple projects like landing pages",
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
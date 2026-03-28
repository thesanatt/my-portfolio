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
    slug: "profinsight",
    title: "ProfInsight",
    subtitle: "Bayesian ML \u00B7 Education",
    description:
      "A professor analysis platform that scrapes RateMyProfessors data and runs it through three Bayesian ML models I built from scratch in pure Python. Covers 29 universities, 3,000+ professors, and 100K+ reviews. No sklearn, no LLM APIs.",
    tags: ["Python", "FastAPI", "React", "Bayesian ML", "Vite"],
    longDescription:
      "RateMyProfessors gives you a number. ProfInsight gives you confidence intervals on that number, detects whether the professor is getting better or worse over time, classifies review sentiment across five teaching dimensions, predicts your likely grade, optimizes your entire semester schedule, and matches professors to your learning style. All through original statistical modeling, not LLM summarization. I implemented three Bayesian ML models from scratch in pure Python with no external ML libraries. A Beta-Binomial posterior model for confidence-aware quality ratings that accounts for sample size. A Naive Bayes classifier that categorizes reviews into lectures, grading, workload, approachability, and exams. And a Gaussian Process Regression with an RBF kernel that detects rating trends over time with uncertainty bands. The scraper hits the RateMyProfessors GraphQL API with parallel fetching, retry logic, and rate limit handling. The backend caches aggressively and refreshes all data automatically every week through GitHub Actions. Currently serving 29 universities with over 100,000 reviews.",
    features: [
      "Three Bayesian ML models implemented from scratch in pure Python, no sklearn or scipy",
      "Beta-Binomial posteriors for confidence-aware ratings that account for sample size",
      "Naive Bayes sentiment classifier across five teaching dimensions (lectures, grading, workload, approachability, exams)",
      "Gaussian Process Regression with RBF kernel for rating trend detection over time",
      "Semester optimizer that finds the best professor combination based on your preferences",
      "Student fit quiz with Bayesian matching against all professors",
      "Side-by-side professor comparison with radar charts",
      "Red flag detection for declining ratings and poor reviews",
      "Parallel scraping with ThreadPoolExecutor, exponential backoff on rate limits",
      "Automated weekly data refresh via GitHub Actions",
      "29 universities, 3,000+ professors, 100,000+ reviews",
    ],
    techDetails: [
      { label: "ML Models", value: "Beta-Binomial, Naive Bayes, GP Regression (all from scratch)" },
      { label: "Backend", value: "FastAPI, LRU cache, IP rate limiting, security headers" },
      { label: "Frontend", value: "React 18, Vite, Tailwind CSS, Recharts" },
      { label: "Scraping", value: "RMP GraphQL API, ThreadPoolExecutor, retry with backoff" },
      { label: "CI/CD", value: "GitHub Actions (weekly scrape + auto-deploy)" },
      { label: "Hosting", value: "Vercel (frontend), Render (API)" },
      { label: "Language", value: "Pure Python (no ML libraries)" },
    ],
    githubUrl: "https://github.com/thesanatt/profinsight",
    liveUrl: "https://profinsight-three.vercel.app",
  },
  {
    slug: "scholartrace",
    title: "ScholarTrace",
    subtitle: "Developer Tools \u00B7 Academic Integrity",
    description:
      "A VS Code extension and web dashboard that tracks how students write code. The extension silently snapshots every file edit, and professors can review full coding timelines through a class-based dashboard with real auth and access control.",
    tags: ["TypeScript", "Next.js", "Express", "MongoDB", "JWT"],
    longDescription:
      "ScholarTrace started from a simple question: how does a student prove they actually wrote their own code? The system has three parts. First, a VS Code extension that runs in the background while you code. It debounces your keystrokes and takes a full snapshot of your file every time you pause for 5 seconds. These snapshots get tagged with your email and a class code your professor gives you, then uploaded to the backend. Second, an Express API on Railway with real JWT auth, bcrypt password hashing, and class-based access control. Professors register, create classes that auto-generate 6-character join codes, and can only see students who uploaded to their own classes. Third, a Next.js dashboard on Vercel where professors log in, select a class, browse students, and step through their full coding timeline snapshot by snapshot with full code viewer and line numbers. The extension is live on the VS Code Marketplace and the whole system has a 30-test end-to-end test suite.",
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
export const profile = {
  name: 'Ritam Mukherjee',
  role: 'Builder and Researcher',
  summary:
    'I build AI systems with a strong software engineering backbone.',
  // Paragraphs. An array entry may itself be an array of parts: a plain string, { text, href }
  // for an inline link, { text, strong: true } for bold, { text, strong: true, accent: true }
  // for bold in the About accent colour, or { emoji } for a decorative emoji that stays glued
  // to the word before it and is hidden from screen readers.
  about: [
    [
      'I build things, and I like ',
      { text: 'owning all of it', strong: true },
      ': designing the product, architecting the system, writing the backend and the interface, wiring in the models',
      { emoji: '🧠' },
      ', and getting it deployed',
      { emoji: '🚀' },
      '.'
    ],
    [
      "Most of my best work started as a side project I couldn't put down, and a day only counts for me if ",
      { text: 'something got made', strong: true },
      { emoji: '🛠️' },
      ' by the end of it.'
    ],
    [
      'What drives me right now is ',
      { text: 'NLP and agentic AI', strong: true, accent: true },
      { emoji: '🤖' },
      ": systems that reason, use tools, and coordinate with each other. I'm stubborn about ",
      { text: 'proving they work', strong: true },
      ". I keep models out of decisions they can't be trusted with, and I test against baselines instead of trusting a good demo."
    ],
    [
      'Currently going deeper',
      { emoji: '🤿' },
      ' on multi-agent systems in ',
      { text: 'LangGraph', strong: true, accent: true },
      ' and doing applied AI research in medical imaging at OSU.'
    ]
  ],
  aboutPhoto: {
    src: '/assets/my_pics/coffee-mug.jpg',
    alt: 'A hand holding a white coffee mug in front of a laptop showing code'
  },
  image: '/assets/my_pics/RM_floral_final.png',
  resume: '/assets/Resume/RM_Resume_2026.pdf',
  email: 'mukherjee.ritam27@gmail.com',
  social: {
    github: 'https://github.com/RitamCODE',
    linkedin: 'https://www.linkedin.com/in/ritammukherjee27/',
    twitter: 'https://x.com/RitamM27'
  }
};

export const techStack = [
  {
    label: 'AI & ML',
    items: [
      'PyTorch',
      'Transformers',
      'PEFT / LoRA',
      'Fine-tuning (Qwen, DeepSeek)',
      'Semantic segmentation (SegFormer)',
      'scikit-learn',
      'OpenCV'
    ]
  },
  {
    label: 'LLM Systems & Agents',
    items: [
      'LangGraph',
      'LangChain',
      'RAG pipelines',
      'Vector retrieval (FAISS, ChromaDB)',
      'LLM-as-judge evaluation',
      'Synthetic eval harnesses',
      'Evaluation design',
      'LangSmith',
      'Pydantic structured outputs'
    ]
  },
  {
    label: 'Languages',
    items: ['Python', 'TypeScript / JavaScript', 'C/C++', 'Java', 'C# / .NET', 'SQL']
  },
  {
    label: 'Backend & Web',
    items: ['FastAPI', 'Flask', 'Django', 'React', 'Vite', 'pytest']
  },
  {
    label: 'Cloud & Infrastructure',
    items: [
      'Docker',
      'Azure ML',
      'MLflow',
      'AWS',
      'Linux',
      'HPC / SLURM (Ohio Supercomputer Center)',
      'Git',
      'GitHub Actions'
    ]
  },
  {
    label: 'Data',
    items: ['SQLite', 'Oracle SQL', 'pandas', 'NumPy', 'Data preparation']
  }
];

export const education = [
  {
    id: 'ms',
    level: 'MS',
    levelFull: 'Master of Science',
    school: 'Ohio State',
    schoolFull: 'The Ohio State University',
    subject: 'Computer Science & Engineering',
    subjectFull: 'Computer Science and Engineering',
    duration: 'Aug 2024 - May 2026',
    coursework: ['Algorithms', 'Neural Networks', 'AI', 'Natural Language Processing']
  },
  {
    id: 'btech',
    level: 'B.Tech',
    levelFull: 'Bachelor of Technology',
    school: 'KIIT',
    schoolFull: 'Kalinga Institute of Industrial Technology',
    subject: 'Computer Science & Engineering',
    subjectFull: 'Computer Science and Engineering',
    duration: 'Jul 2020 - Jul 2024',
    coursework: ['DSA', 'Design and Analysis of Algorithms', 'Cloud Computing', 'DBMS']
  }
];

export const experienceItems = [
  {
    id: 'microsoft',
    category: 'industry',
    company: 'Microsoft',
    role: 'Software Engineer Intern',
    duration: 'May 2023 - Jul 2023',
    location: 'Bangalore, India',
    certificate: '/assets/Certifcates/Microsoft_Internship_Certificate.jpg',
    // Opens the "Explore my contribution" walkthrough under the entry. Keep the bullets
    // consistent with src/data/microsoftWalkthrough.js: the MLflow PR is an unmerged draft.
    walkthrough: 'microsoft',
    links: [{ label: 'My MLflow proposal (draft PR)', href: 'https://github.com/mlflow/mlflow/pull/8980' }],
    points: [
      "Diagnosed and fixed a serialization bug in MLflow that was blocking a whole class of LangChain applications (Retrieval QA chains) from being deployable, since their retriever component couldn't be reconstructed on load. Contributed the fix upstream to the open source mlflow project.",
      'Built the pipeline to convert LangChain Retrieval QA chains, backed by Azure Cognitive Search, into MLflow models and deploy them as live Azure ML online endpoints, enabling a no-code deployment path for LLM applications on the platform.',
      'Explored a callback-handler based approach to tracing and logging LangChain chain execution into Application Insights, laying groundwork for LLM observability on the platform.'
    ]
  },
  {
    id: 'deltacube',
    category: 'industry',
    company: 'TheDeltaCube.ai',
    role: 'Junior Data Scientist',
    duration: 'Feb 2024 - May 2024',
    location: 'Remote, India',
    certificate: '/assets/Certifcates/Ritam%20Internship%20Certificate_Deltacube.pdf',
    points: [
      'Built AI modules for document summarization, question answering, and translation workflows.',
      'Scaled document processing from 5-10 pages to 400-500 pages for large dataset operations.',
      'Implemented RAG and advanced chunking to reduce token overflow and improve LLM response accuracy.',
      'Refactored code into modular components with robust exception handling to reduce debugging overhead.'
    ]
  },
  {
    id: 'osu-teaching',
    category: 'academia',
    company: 'The Ohio State University',
    role: 'Teaching Assistant - Full Stack Application Development',
    duration: 'Aug 2025 - Present',
    location: 'Columbus, OH',
    points: [
      'Maintained the reference implementation and lab curriculum for a semester-long team build: ASP.NET Web API with EF Core, a React/TypeScript frontend, Auth0 JWT authorization, and GitHub Actions CI/CD to Azure.',
      'Modernized labs written against .NET 6 onto .NET 8, diagnosing broken dependency resolution, JWT scope-claim handling, and deprecated namespace references before students hit them.',
      'Authored the grading rubrics for the lab series and ran office hours and one-on-one debugging on CORS, EF Core migrations, React state and routing, and branch-protected PR workflows.'
    ]
  }
];

export const projectItems = [
  {
    title: 'AdaptMATH',
    summary:
      'K-5 adaptive math tutor built for the Nerdy AI Hackathon. Bayesian Knowledge Tracing drives mastery tracking and problem selection as a deterministic state machine; the LLM, orchestrated with LangGraph, only narrates after the fact and never touches grading. Includes a synthetic-student evaluation harness comparing adaptive pacing against a fixed baseline.',
    stack: ['LangGraph', 'FastAPI', 'React', 'Bayesian Knowledge Tracing', 'LangSmith'],
    links: [
      { label: 'View Code', href: 'https://github.com/RitamCODE/Adaptive-Math-Tutor' },
      { label: 'Watch Demo', href: 'https://youtu.be/lPKNvPYhSEY' }
    ],
    // Adds the "Inside the engineering" walkthrough under the card (see ProjectCard.jsx).
    walkthrough: 'adaptmath',
    featured: true
  },
  {
    title: 'Small Models for Scientific Question Answering',
    summary:
      'Compared two LoRA-adapted versions of Qwen2.5-0.5B on scientific question answering over specialized NLP papers from QASPER: one trained on question-answer pairs, the other on full paper text. I built the data preparation, training and inference pipelines, and a blind comparison in which a larger model judged randomized A/B answers against the references.',
    stack: ['Python', 'PyTorch', 'HuggingFace Transformers', 'LoRA'],
    links: [
      {
        label: 'View Code',
        href: 'https://github.com/RitamCODE/Comparing-Small-LLMs-for-Scientific-Question-Answering'
      }
    ],
    // Adds the "Inside the engineering" walkthrough under the card (see ProjectCard.jsx).
    walkthrough: 'scientificqa',
    featured: true
  },
  {
    title: 'Multimodal System for Bird Classification',
    summary:
      'Built a multimodal bird-species classifier that fuses visual and auditory features using ResNet18-based encoders and Mel-spectrogram audio representations.',
    stack: ['Torchvision', 'TorchAudio', 'NumPy', 'Pandas'],
    links: [{ label: 'View Code', href: 'https://github.com/RitamCODE' }],
    // Adds the "Inside the engineering" walkthrough under the card (see ProjectCard.jsx).
    walkthrough: 'birds',
    featured: true
  }
];

export const researchItems = [
  {
    title: 'Disease Detection from AO-OCT Retinal Scans',
    summary:
      'Developing computational methods to analyze high-resolution retinal scans, with focus on segmentation and quantification of microscopic structures for early disease monitoring.',
    stack: ['Python', 'PyTorch', 'AO-OCT', 'Medical Imaging'],
    links: [{ label: 'View Code', href: 'https://github.com/RitamCODE' }],
    featured: true
  }
];

export const courseItems = [
  {
    title: 'Winter School on Deep Learning',
    provider: 'ISI Kolkata',
    providerFull: 'Indian Statistical Institute, Kolkata',
    duration: 'Jan 2024 - Mar 2024',
    certificate: '/assets/Certifcates/CoP_Ritam%20Mukherjee_WSDL24REGSTUIND0105.pdf',
    overview:
      'Completed an advanced AI bootcamp with lectures from faculty and researchers from Princeton, CMU, MIT, and OpenAI.',
    topics:
      'Matrix Calculus, Linear Algebra, PyTorch, Gradient-Based Optimization, ANNs, CNNs, GNNs, Transformers, GANs, Diffusion, LLMs, Deep Reinforcement Learning, Topological Deep Learning, Prompt Engineering'
  }
];

export const patentItems = [
  {
    title: 'Wearable Belt with Accident Deployable Airbags (Internal Structure design)',
    certificate: '/assets/Certifcates/CERTIFICATE%20373846-001.pdf'
  },
  {
    title: 'Wearable Belt with Accident Deployable Airbags (Airbag Structure design)',
    certificate: '/assets/Certifcates/certificate%20373847-001.pdf'
  }
];

export const profile = {
  name: 'Ritam Mukherjee',
  role: 'Your friendly neighborhood AI Engineer🕸️',
  summary:
    'I build production-ready AI systems with a strong software engineering backbone. My work focuses on RAG pipelines, document intelligence, and scalable ML deployment on cloud platforms.',
  // Paragraphs. An array entry may itself be an array of parts, where { text, href }
  // renders as an inline link.
  about: [
    "I build things, and I like owning all of it: designing the product, architecting the system, writing the backend and the interface, wiring in the models, and getting it deployed. Most of my best work started as a side project I couldn't put down, and a day only counts for me if something got made by the end of it.",
    "What drives me right now is NLP and agentic AI: systems that reason, use tools, and coordinate with each other. I'm stubborn about proving they work. I keep models out of decisions they can't be trusted with, and I test against baselines instead of trusting a good demo.",
    "Currently going deeper on multi-agent systems in LangGraph and doing applied AI research in medical imaging at OSU."
  ],
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
    items: ['SQLite', 'Oracle SQL', 'pandas', 'NumPy']
  }
];

export const education = [
  {
    degree: 'Master of Science, Computer Science and Engineering',
    school: 'The Ohio State University',
    duration: 'Aug 2024 - May 2026',
    details: 'Coursework: Algorithms, Neural Networks, AI, Natural Language Processing'
  },
  {
    degree: 'Bachelor of Technology, Computer Science and Engineering',
    school: 'Kalinga Institute of Industrial Technology',
    duration: 'Jul 2020 - Jul 2024',
    details: 'GPA: 3.7/4 | Coursework: DSA, Design and Analysis of Algorithms, Cloud Computing, DBMS'
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
    points: [
      'Converted LangChain Retrieval QA chains into MLflow models for seamless Azure ML deployment.',
      'Ensured correct load and store behavior of retriever components in the MLflow model structure.',
      'Improved GenAI workflow reliability with tracing, logging, and memory management in Azure ML.',
      'Streamlined deployment of RAG-based applications through AzureML UI integration.'
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
    title: 'Comparing Small LLM QA Capabilities with Fine-Tuning vs Full Context',
    summary:
      'Fine-tuned Qwen 0.5B with LoRA on the QASPER dataset and compared answer quality with and without full-document context.',
    stack: ['Python', 'PyTorch', 'HuggingFace Transformers', 'LoRA'],
    links: [
      {
        label: 'View Code',
        href: 'https://github.com/RitamCODE/Comparing-Small-LLMs-for-Scientific-Question-Answering'
      }
    ],
    featured: true
  },
  {
    title: 'Multimodal System for Bird Classification',
    summary:
      'Built a multimodal bird-species classifier that fuses visual and auditory features using ResNet18-based encoders and Mel-spectrogram audio representations.',
    stack: ['Torchvision', 'TorchAudio', 'NumPy', 'Pandas'],
    links: [{ label: 'View Code', href: 'https://github.com/RitamCODE' }],
    featured: true
  },
  {
    title: 'Abelian Sandpile Simulation',
    summary:
      'Simulated the Abelian Sandpile model in Java using cellular automata with robust cascading-avalanche logic to study self-organized criticality.',
    stack: ['Java', 'Cellular Automata'],
    links: [{ label: 'View Code', href: 'https://github.com/RitamCODE' }],
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
    title: 'WSDL (Winter School on Deep Learning 2024)',
    provider: 'Indian Statistical Institute, Kolkata',
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

export const profile = {
  name: 'Ritam Mukherjee',
  role: 'Your friendly neighborhood developer🕸️',
  summary:
    'I build production-ready AI systems with a strong software engineering backbone. My work focuses on RAG pipelines, document intelligence, and scalable ML deployment on cloud platforms.',
  about:
    'I am an engineer who likes turning ML ideas into working software. I have built and deployed RAG-based GenAI workflows on Azure ML, packaged LangChain pipelines into MLflow models, and improved large-scale document processing for QA, summarization, and translation. I am currently pursuing my M.S. in Computer Science at The Ohio State University (May 2026) and researching retinal OCT analysis for early disease detection.',
  image: '/assets/my_pics/anime_image_ritam.png',
  resume: '/assets/Resume/RM_Resume_2026.pdf',
  email: 'mukherjee.ritam27@gmail.com',
  social: {
    github: 'https://github.com/RitamCODE',
    linkedin: 'https://www.linkedin.com/in/ritammukherjee27/',
    twitter: 'https://x.com/RitamM27'
  }
};

export const techStack = [
  'Python',
  'Java',
  'C/C++',
  'HTML/CSS',
  'JavaScript',
  'React',
  '.NET / C#',
  'Azure',
  'Azure ML',
  'LangChain',
  'PyTorch',
  'HuggingFace',
  'Flask',
  'OpenCV',
  'Oracle SQL',
  'SQLite',
  'AWS',
  'HPC (Ohio Supercomputer Center - OSC)',
  'Postman',
  'GitHub',
  'Linux',
];

export const education = [
  {
    degree: 'Master of Science, Computer Science and Engineering',
    school: 'The Ohio State University',
    duration: 'Expected May 2026',
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
    company: 'Microsoft',
    role: 'Software Engineer Intern',
    duration: 'May 2023 - Jul 2023',
    location: 'Bangalore, India',
    points: [
      'Converted LangChain Retrieval QA chains into MLflow models for seamless Azure ML deployment.',
      'Ensured correct load and store behavior of retriever components in the MLflow model structure.',
      'Improved GenAI workflow reliability with tracing, logging, and memory management in Azure ML.',
      'Streamlined deployment of RAG-based applications through AzureML UI integration.'
    ]
  },
  {
    id: 'deltacube',
    company: 'TheDeltaCube.ai',
    role: 'Junior Data Scientist',
    duration: 'Feb 2024 - May 2024',
    location: 'Remote, India',
    points: [
      'Built AI modules for document summarization, question answering, and translation workflows.',
      'Scaled document processing from 5-10 pages to 400-500 pages for large dataset operations.',
      'Implemented RAG and advanced chunking to reduce token overflow and improve LLM response accuracy.',
      'Refactored code into modular components with robust exception handling to reduce debugging overhead.'
    ]
  }
];

export const projectItems = [
  {
    title: 'Disease Detection from AO-OCT Retinal Scans',
    summary:
      'Developing computational methods to analyze high-resolution retinal scans, with focus on segmentation and quantification of microscopic structures for early disease monitoring.',
    stack: ['Python', 'PyTorch', 'AO-OCT', 'Medical Imaging'],
    repo: 'https://github.com/RitamCODE',
    featured: true
  },
  {
    title: 'Comparing Small LLM QA Capabilities with Fine-Tuning vs Full Context',
    summary:
      'Fine-tuned Qwen 0.5B with LoRA on the QASPER dataset and compared answer quality with and without full-document context.',
    stack: ['Python', 'PyTorch', 'HuggingFace Transformers', 'LoRA'],
    repo: 'https://github.com/RitamCODE/Comparing-Small-LLMs-for-Scientific-Question-Answering',
    featured: true
  },
  {
    title: 'Multimodal System for Bird Classification',
    summary:
      'Built a multimodal bird-species classifier that fuses visual and auditory features using ResNet18-based encoders and Mel-spectrogram audio representations.',
    stack: ['Torchvision', 'TorchAudio', 'NumPy', 'Pandas'],
    repo: 'https://github.com/RitamCODE',
    featured: true
  },
  {
    title: 'Abelian Sandpile Simulation',
    summary:
      'Simulated the Abelian Sandpile model in Java using cellular automata with robust cascading-avalanche logic to study self-organized criticality.',
    stack: ['Java', 'Cellular Automata'],
    repo: 'https://github.com/RitamCODE',
    featured: true
  }
];

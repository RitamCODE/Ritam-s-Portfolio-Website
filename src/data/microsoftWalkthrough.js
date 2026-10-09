// Copy for the Microsoft internship "Explore my contribution" walkthrough. It is a
// self-contained explanation: the diagrams are conceptual, the terminal output is schematic,
// and every interaction runs locally without a model or a network call.
//
// Status boundaries the copy keeps: the MLflow pull request is an unmerged draft; the
// retriever save/load proposal, the environment-variable credential change and the callback
// handler are my own work; ChromaDB-to-AzureSearch testing was done by the team; the callback
// handler was preliminary; Application Insights, MLIndex and conversation-memory persistence
// were future directions. No measurements or deployment results are claimed.

export const MLFLOW_PR = 'https://github.com/mlflow/mlflow/pull/8980';
export const MLFLOW_COMMIT =
  'https://github.com/mlflow/mlflow/commit/66abba63eb782446cf5b28aa139d475f13181213';

export const walkthroughMeta = {
  label: 'Microsoft internship contribution walkthrough',
  heading: 'Inside the engineering'
};

export const walkthroughSlides = [
  { key: 'purpose', chapter: 'Purpose' },
  { key: 'retrieval', chapter: 'Retrieval flow' },
  { key: 'saveload', chapter: 'My implementation' },
  { key: 'credentials', chapter: 'Credentials' },
  { key: 'callback', chapter: 'Callback prototype' },
  { key: 'outcomes', chapter: 'Outcomes and scope' }
];

export const purposeSlide = {
  kicker: '01 / The purpose',
  title: 'Making document Q&A easier to deploy',
  lead: 'AzureML developers needed a way to package a document-based assistant without losing its ability to find relevant text. I worked on preserving that lookup when saving and loading the model.',
  diagramLabel:
    'A working document assistant needs its document lookup preserved during packaging so it can be reloaded for deployment. My contribution addressed that packaging step.',
  nodes: [
    {
      id: 'assistant',
      icon: 'fa-comments',
      title: 'Working assistant',
      text: 'Answers using your documents'
    },
    {
      id: 'preserve',
      icon: 'fa-box',
      title: 'Preserve the lookup',
      text: 'My save/load contribution',
      accent: true
    },
    {
      id: 'deploy',
      icon: 'fa-cloud',
      title: 'Reload for deployment',
      text: 'The AzureML workflow goal'
    }
  ],
  benefit: 'Intended benefit: less custom deployment setup for developers building document assistants.',
  notes: {
    summary: 'Project notes: purpose and scope',
    text: 'The work focused on MLflow packaging for AzureML online endpoints and on preserving document lookup when reloading a RetrievalQA chain. The deployment benefit was a goal; validated endpoint results and usage metrics are not included here.'
  }
};

export const retrievalSlide = {
  kicker: '02 / Retrieval flow',
  title: 'The answer depends on a working retriever',
  lead: 'RetrievalQA first finds relevant documents, then passes that context to the LLM. The retriever is a separate component that the loaded chain still needs.',
  choicesLabel: 'Trace the conceptual request',
  diagramLabel:
    'A query enters a retriever, relevant documents become LLM context, and the LLM produces an answer.',
  initialStage: 'lookup',
  stages: [
    {
      id: 'lookup',
      label: 'Find documents',
      active: ['retriever'],
      detail: 'A saved LLM configuration cannot perform document lookup on its own.'
    },
    {
      id: 'answer',
      label: 'Generate answer',
      active: ['context', 'llm'],
      detail:
        'The document-combination chain prepares context for the LLM to generate an answer.'
    }
  ],
  nodes: [
    {
      id: 'retriever',
      icon: 'fa-magnifying-glass',
      title: 'Retriever',
      text: 'Query finds relevant text'
    },
    {
      id: 'context',
      icon: 'fa-file-lines',
      title: 'Document context',
      text: 'Combine the retrieved text'
    },
    {
      id: 'llm',
      icon: 'fa-message',
      title: 'LLM chain',
      text: 'Use context to answer'
    }
  ],
  backend: {
    label: 'Team feasibility testing:',
    from: 'ChromaDB',
    to: 'AzureSearch'
  },
  demonstrated: [
    {
      name: 'LangChain RetrievalQA',
      applied: 'Worked with retrieval and document-based answer generation.'
    },
    {
      name: 'Integration debugging',
      applied: 'Identified the retriever as a required load-time dependency.'
    }
  ],
  notes: {
    summary: 'Project notes: retrieval workflow',
    text: 'Our team tested feasibility with ChromaDB before moving to AzureSearch; that testing was shared team work. The diagram separates document lookup, context assembly and answer generation. It illustrates the workflow without running a model.'
  }
};

export const saveLoadSlide = {
  kicker: '03 / My implementation',
  title: 'A retriever save/load proposal',
  lead: 'My MLflow proposal saved the retriever separately as retriever.pkl and supplied it when loading the RetrievalQA chain.',
  choicesLabel: 'Inspect the save and load proposal',
  diagramLabel:
    'The proposed model artifact contains model.yaml and a separately pickled retriever. Loading supplies the retriever to reconstruct the chain.',
  initialStage: 'save',
  bundleLabel: 'Model artifact',
  stages: [
    {
      id: 'gap',
      label: 'Original gap',
      retrieverName: 'Retriever missing',
      retrieverDetail: 'Loading cannot restore the lookup',
      missing: true,
      rebuildTitle: 'Chain saved, lookup missing',
      rebuildDetail: 'The loading gap this addressed',
      outputLabel: 'The gap',
      output: 'Chain configuration alone did not restore the retriever.',
      isCode: false
    },
    {
      id: 'save',
      label: 'Save',
      retrieverName: 'retriever.pkl',
      retrieverDetail: 'Pickled retriever object',
      rebuildTitle: 'Preserve both components',
      rebuildDetail: 'The chain and its document lookup',
      outputLabel: 'Simplified from my draft code',
      output: 'cloudpickle.dump(model.retriever, file)',
      isCode: true
    },
    {
      id: 'load',
      label: 'Load',
      retrieverName: 'retriever.pkl',
      retrieverDetail: 'Pickled retriever object',
      rebuildTitle: 'Reconstruct RetrievalQA',
      rebuildDetail: 'Supply the restored retriever',
      outputLabel: 'Simplified from my draft code',
      output: 'ret = cloudpickle.load(file)\nload_chain(path, retriever=ret)',
      isCode: true
    }
  ],
  chainFile: { name: 'model.yaml', detail: 'Saved chain configuration' },
  status: 'PR #8980: implemented proposal, still an unmerged draft.',
  demonstrated: [
    {
      name: 'Python serialization',
      applied: 'Persisted the retriever object with cloudpickle.'
    },
    {
      name: 'MLflow integration',
      applied: 'Passed the restored retriever into chain loading.'
    }
  ],
  notes: {
    summary: 'Project notes: my public MLflow draft',
    text: 'A later commit in the draft replaced an earlier approach (an rdocs parameter) with pickling the retriever object directly. The draft derives the artifact directory by stripping a Windows-style model.yaml suffix, so path handling is not portable and the proposal was not hardened. This page does not include runtime validation results.',
    links: [
      { label: 'Read the save/load commit', href: MLFLOW_COMMIT },
      { label: 'PR status (draft)', href: MLFLOW_PR }
    ]
  }
};

export const credentialSlide = {
  kicker: '04 / Credential handling',
  title: 'Supply credentials when the model runs',
  lead: 'Credentials supplied through JSON could be saved with the model. I changed the approach to use environment variables for Azure Cognitive Search and OpenAI credentials.',
  choicesLabel: 'Compare credential configuration',
  diagramLabel:
    'Model configuration and retriever artifacts are distinct from credentials supplied through the runtime environment.',
  initialStage: 'env',
  stages: [
    {
      id: 'json',
      label: 'JSON configuration',
      modelCredentials: 'JSON credentials could be saved here',
      runtimeCredentials: 'Credentials passed through JSON',
      detail: 'The original concern: credentials in JSON could travel with the saved model.'
    },
    {
      id: 'env',
      label: 'Environment variables',
      modelCredentials: 'Credentials supplied separately',
      runtimeCredentials: 'Supplied through environment variables',
      detail: 'The change addressed credentials being included in saved JSON configuration.'
    }
  ],
  saved: {
    title: 'Saved model',
    items: ['Chain configuration', 'Retriever artifact']
  },
  runtime: {
    title: 'Runtime environment',
    items: ['Azure Cognitive Search credentials', 'OpenAI credentials']
  },
  demonstrated: [
    {
      name: 'Configuration management',
      applied: 'Moved service credentials to environment variables.'
    },
    {
      name: 'Credential handling',
      applied: 'Addressed credentials being saved with model configuration.'
    }
  ],
  notes: {
    summary: 'Project notes: credential handling',
    text: 'I implemented the change from JSON-supplied credentials to environment variables after identifying that credentials could be included in saved model configuration. The diagram illustrates that configuration boundary; it is not a credential audit.'
  }
};

export const callbackSlide = {
  kicker: '05 / Callback prototype',
  title: 'Inspect the steps behind an answer',
  lead: 'I implemented a preliminary callback handler that printed the query, retrieved documents, and LLM output. This explored how to observe RetrievalQA execution.',
  choicesLabel: 'Inspect the callback data',
  consoleLabel: 'Schematic terminal output, no model call',
  initialStage: 'query',
  stages: [
    {
      id: 'query',
      icon: 'fa-comment',
      label: 'Query',
      output: 'query: [user question]',
      caption: 'Observe the question entering the retrieval workflow.'
    },
    {
      id: 'documents',
      icon: 'fa-file-lines',
      label: 'Documents',
      output: 'retrieved_documents: [matching text]',
      caption: 'Inspect the context retrieved before answer generation.'
    },
    {
      id: 'output',
      icon: 'fa-align-left',
      label: 'LLM output',
      output: 'llm_output: [generated answer]',
      caption: 'Inspect the response produced by the language model.'
    }
  ],
  planned: 'Application Insights integration remained planned.',
  demonstratedLabel: 'Skills demonstrated in a prototype',
  demonstrated: [
    {
      name: 'LangChain callbacks',
      applied: 'Captured query, document, and output data during execution.'
    },
    {
      name: 'Observability prototyping',
      applied: 'Explored callback-based inspection before monitoring integration.'
    }
  ],
  notes: {
    summary: 'Project notes: callback prototype',
    text: 'I implemented the preliminary handler to print query, retrieved-document and output data. The sample implementation was incomplete, and full Application Insights tracing and logging remained future work.'
  }
};

export const outcomesSlide = {
  kicker: '06 / Outcomes and scope',
  title: 'Implemented work and next steps',
  lead: 'The work established a retriever-persistence approach and exposed integration constraints. The evidence supports the implementation and exploration below.',
  results: [
    {
      icon: 'fa-code',
      title: 'My implementations',
      text: 'Retriever save/load proposal, environment-variable credential handling, and a preliminary callback handler.',
      label: 'Public MLflow draft code and my internship work'
    },
    {
      icon: 'fa-flask',
      title: 'Feasibility and constraints',
      text: 'Team testing moved from ChromaDB to AzureSearch. The team also hit a Studio UI blocker; how it was resolved is not documented here.',
      label: 'Feasibility testing, no quantified benchmark'
    },
    {
      icon: 'fa-binoculars',
      title: 'Future work',
      text: 'MLIndex integration, Application Insights monitoring, and conversation-memory persistence.',
      label: 'Proposed extensions, not built'
    }
  ],
  demonstrated: [
    {
      name: 'Open-source contribution',
      applied: 'Submitted my implementation as an MLflow draft PR.'
    }
  ],
  notes: {
    summary: 'Project notes: public PR and scope',
    text: 'My save/load proposal remains an unmerged draft. Credential handling and the callback prototype are described from my internship work. Production adoption, validated endpoint results and performance metrics are not established here.',
    links: [{ label: 'MLflow PR #8980 (draft)', href: MLFLOW_PR }]
  }
};

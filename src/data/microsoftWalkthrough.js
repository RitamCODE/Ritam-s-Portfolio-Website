// Copy for the Microsoft internship "Explore my contribution" walkthrough. It is a
// self-contained explanation: the diagrams are conceptual, the terminal output is schematic,
// and every interaction runs locally without a model or a network call.
//
// Status boundaries the copy keeps: the fix for the RetrievalQA retriever serialization bug was
// submitted upstream as MLflow PR #8980, which is still an open, unmerged draft (checked on
// GitHub); the retriever save/load fix, the RetrievalQA-to-Azure ML endpoint pipeline, the
// environment-variable credential change and the callback exploration are my own work;
// ChromaDB-to-AzureSearch testing was done by the team; the callback handler explored an
// Application Insights tracing approach as groundwork, not a finished integration; MLIndex and
// conversation-memory persistence were future directions. No measurements are claimed.

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
  lead: 'AzureML developers needed a way to deploy a document-based assistant without losing its ability to find relevant text. I fixed the MLflow bug that blocked this and built the pipeline that turns these chains into live online endpoints.',
  diagramLabel:
    'A working document assistant needs its document lookup preserved during packaging so it can be reloaded for deployment. My contribution fixed that packaging step and built the path to an online endpoint.',
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
      text: 'My save/load fix',
      accent: true
    },
    {
      id: 'deploy',
      icon: 'fa-cloud',
      title: 'Deploy as an endpoint',
      text: 'My pipeline to Azure ML'
    }
  ],
  benefit: 'Benefit: a no-code deployment path for LLM applications on the platform.',
  notes: {
    summary: 'Project notes: purpose and scope',
    text: 'The work covered two parts: fixing how MLflow saves and reloads a RetrievalQA chain backed by Azure Cognitive Search, and the pipeline that converts such a chain into an MLflow model and deploys it as an Azure ML online endpoint. Usage metrics and benchmarks are not included here.'
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
  title: 'Fixing retriever serialization',
  lead: 'RetrievalQA chains could not be deployed because the retriever could not be reconstructed on load. My fix saves the retriever separately as retriever.pkl and supplies it when loading the chain.',
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
  status: 'Submitted upstream as MLflow PR #8980, still an open draft.',
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
    summary: 'Project notes: my public MLflow fix',
    text: 'I contributed the fix upstream to the open source MLflow project as a pull request. A later commit replaced an earlier approach (an rdocs parameter) with pickling the retriever object directly. The code derives the artifact directory by stripping a Windows-style model.yaml suffix, so path handling is not portable and the change was not hardened. The pull request has not been merged.',
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
  lead: 'I explored a callback-handler approach to tracing and logging chain execution toward Application Insights. The prototype printed the query, retrieved documents, and LLM output, laying groundwork for LLM observability.',
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
  planned: 'The Application Insights integration itself was left as the next step.',
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
    text: 'I explored this callback-based approach by printing query, retrieved-document and output data. The sample implementation was incomplete, and the full Application Insights tracing and logging remained future work.'
  }
};

export const outcomesSlide = {
  kicker: '06 / Outcomes and scope',
  title: 'Implemented work and next steps',
  lead: 'The work unblocked a class of LangChain applications and gave them a no-code route to Azure ML endpoints. The evidence supports the implementation and exploration below.',
  results: [
    {
      icon: 'fa-code',
      title: 'My implementations',
      text: 'The retriever serialization fix, the RetrievalQA-to-Azure ML endpoint pipeline, environment-variable credential handling, and a callback-handler exploration for Application Insights.',
      label: 'Public MLflow draft PR and my internship work'
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
      applied: 'Contributed my fix upstream as an MLflow pull request.'
    }
  ],
  notes: {
    summary: 'Project notes: public PR and scope',
    text: 'My fix was submitted upstream and the pull request is still an open, unmerged draft. The endpoint pipeline, credential handling and callback exploration are described from my internship work. Production adoption and performance metrics are not established here.',
    links: [{ label: 'MLflow PR #8980 (draft)', href: MLFLOW_PR }]
  }
};

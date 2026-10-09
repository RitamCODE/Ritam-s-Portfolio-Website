// Copy and data for the Scientific QA "Inside the engineering" walkthrough. Facts are taken
// from a review of the repository at the commit below (October 8, 2026); the interactions
// on the page are local explanations of that code and its saved outputs, not model calls.
const REPO = 'https://github.com/RitamCODE/Comparing-Small-LLMs-for-Scientific-Question-Answering';
const COMMIT = '9be36dde03bbd733622c813d0edafea5f77543d5';
const blob = (path) => `${REPO}/blob/${COMMIT}/${path}`;
const tree = (path) => `${REPO}/tree/${COMMIT}/${path}`;

export const walkthroughMeta = {
  label: 'Scientific QA engineering walkthrough',
  heading: 'Scientific QA walkthrough',
  note: 'Based on repository commit 9be36dd. Interactions run locally in your browser and do not call a model.'
};

export const walkthroughSlides = [
  { key: 'purpose', chapter: 'The purpose' },
  { key: 'data', chapter: 'Data preparation' },
  { key: 'lora', chapter: 'LoRA adaptation' },
  { key: 'evaluation', chapter: 'Blind evaluation' },
  { key: 'findings', chapter: 'Findings and limits' }
];

export const purposeSlide = {
  kicker: '01 / The purpose',
  title: 'How much context is enough for a small language model?',
  intro:
    'Comparing two LoRA-fine-tuned versions of Qwen2.5-0.5B on scientific question answering using QASPER.',
  motivation:
    'Scientific questions can depend on details scattered across a paper, making useful answers challenging for a small model.',
  diagramLabel:
    'Two versions start from the same Qwen2.5-0.5B base model. One is adapted with LoRA using question-answer pairs, the other using full paper text from QASPER’s specialized NLP papers. Their answers are compared for correctness, relevance, and completeness.',
  origin: { title: 'Qwen2.5-0.5B', caption: 'Same base model · two training approaches' },
  branches: [
    {
      icon: 'fa-comments',
      label: 'QA adaptation',
      title: 'Learn from QA pairs',
      text: 'Question-answer examples from QASPER.'
    },
    {
      icon: 'fa-book-open',
      label: 'Paper-text adaptation',
      title: 'Learn from full papers',
      text: 'Specialized NLP paper text from QASPER.'
    }
  ],
  method: 'LoRA fine-tuning',
  outcome: { title: 'Compare answer quality', criteria: ['Correctness', 'Relevance', 'Completeness'] },
  goal: 'Goal: better scientific answers out of the box.',
  source: { label: 'Project evidence', href: REPO }
};

export const dataSlide = {
  kicker: '02 / Data preparation',
  title: 'Turn annotated papers into usable training examples.',
  lead: 'I cleaned QASPER, chose a usable answer for each question, and converted its nested JSON records into JSONL examples for training and evaluation.',
  stagesLabel: 'Inspect data preparation stages',
  stages: [
    { id: 'select', label: '1. Select answers' },
    { id: 'build', label: '2. Build example' },
    { id: 'save', label: '3. Save JSONL' }
  ],
  initialStage: 'select',
  select: {
    title: 'Resolve nested answer annotations',
    structureLabel: 'Simplified structure',
    structure: [
      'paper',
      '  abstract',
      '  question[i]',
      '  answers[i] > answer[0]',
      '    unanswerable',
      '    free_form_answer',
      '    extractive_spans',
      '    highlighted_evidence'
    ].join('\n'),
    rules: [
      { icon: 'fa-filter', text: 'Skip questions marked unanswerable or left without usable text.' },
      { icon: 'fa-quote-left', text: 'Prefer the free-form answer; fall back to an extractive span.' },
      { icon: 'fa-highlighter', text: 'Attach highlighted evidence as an explanation when it exists.' }
    ],
    caveat:
      'Read from the preparation notebook, a partial record. The exact final filtering rules are not claimed.'
  },
  build: {
    title: 'One question becomes one input and one target',
    caption: 'Excerpt from the saved training data.',
    inputLabel: 'Input',
    inputText:
      'Recognizing affective events that trigger positive or negative sentiment has a wide range of natural language processing applications … In this paper, we propose to propagate affective polarity using discourse relations. Our method is simple and only requires a very small seed lexicon and a large raw corpus. …',
    question: 'What is the seed lexicon?',
    outputLabel: 'Target output',
    outputText:
      'a vocabulary of positive and negative predicates that helps determine the polarity score of an event.',
    explanation:
      'Explanation: The seed lexicon consists of positive and negative predicates. If the predicate of an extracted event is in the seed lexicon and does not involve complex phenomena like negation, we assign the corresponding polarity score …'
  },
  save: {
    title: 'One example per line',
    json: [
      '{',
      '  "input": "Recognizing affective events … \\nQuestion: What is the seed lexicon?",',
      '  "output": "a vocabulary of positive and negative predicates … Explanation: …"',
      '}'
    ].join('\n'),
    caption:
      'Shortened from line 1 of train_instruction.jsonl. Tokenization later wraps each pair in a user and assistant template, up to 1,024 tokens.'
  },
  counts: [
    { value: '1,925', label: 'train' },
    { value: '817', label: 'validation' },
    { value: '1,150', label: 'test' }
  ],
  countsNote: 'Processed example counts, not accuracy.',
  caveat: 'Counts describe saved files, not training or validation results.',
  source: { label: 'Prepared data', href: tree('qa_finetune/processed') },
  demonstrated: [
    { name: 'Python', applied: 'Reshaped nested QASPER records into flat examples' },
    { name: 'Data preparation', applied: 'Cleaned annotations and produced JSONL' }
  ]
};

export const loraSlide = {
  kicker: '03 / LoRA adaptation',
  title: 'Adapt the same small model in two different ways.',
  lead: 'LoRA keeps the base model frozen and trains a small low-rank adapter on top of it. I used it twice, with different training signals.',
  diagramLabel:
    'Frozen Qwen2.5-0.5B base weights plus a trainable LoRA adapter produce the adapted model.',
  base: { title: 'Base weights', detail: 'Qwen2.5-0.5B', state: 'Frozen' },
  adapter: { title: 'LoRA adapter', state: 'Trainable' },
  result: { title: 'Adapted model', detail: 'Same base family' },
  pathsLabel: 'Compare training approaches',
  initialPath: 'qa',
  paths: {
    qa: {
      label: 'QA pairs',
      signalName: 'Question-answer examples',
      signalText:
        'Each example holds a paper abstract, a question, and the reference answer with its evidence.',
      adapterDetail: 'Rank 8 · alpha 16 · Q, K, V, O projections',
      adapterSize: '≈1.08M adapter parameters',
      note: 'Settings read from the QA training script and the saved adapter.'
    },
    paper: {
      label: 'Paper text',
      signalName: 'Paper text, no QA targets',
      signalText:
        'The adapter learns from the title, abstract, and body of papers as plain language modeling.',
      adapterDetail: 'LoRA confirmed',
      adapterSize: 'Exact adapter and sequence-length settings not stated',
      note: 'The committed script is an incomplete record of the final run, so its settings are not asserted.'
    }
  },
  signalLabel: 'Training signal',
  caveat: 'Rank, alpha and size apply to the QA branch only.',
  source: { label: 'LoRA implementation', href: blob('qa_finetune/train_qwen_lora.py') },
  demonstrated: [
    { name: 'PyTorch + Transformers', applied: 'Trained a small causal language model' },
    { name: 'PEFT / LoRA', applied: 'Adapted frozen weights with a small adapter' }
  ]
};

export const evaluationSlide = {
  kicker: '04 / Blind answer evaluation',
  title: 'Compare answers without exposing model identity to the judge.',
  lead: 'I matched predictions by paper and question, shuffled which model appeared as A or B, and had a larger model judge them against the reference answer.',
  chain: [
    { name: 'Match', detail: 'Paper + question' },
    { name: 'Randomize', detail: 'A / B order, labels kept outside the prompt' },
    { name: 'Judge', detail: 'Against the reference answer', engine: true }
  ],
  exampleLabel: 'Saved example',
  question: 'How big is the ANTISCAM dataset?',
  reference: 'Reference: “3,044 sentences in 100 dialogs. …”',
  answers: [
    {
      id: 'A',
      text: '“The size of the dataset is 220 dialogs, which is 100 dialogs in total minus 50 dialogs that are discarded because the dialog is too long or too short. …”',
      model: 'Paper-text model'
    },
    {
      id: 'B',
      text: '“Explanation: The ANTISCAM dataset contains 1000 utterances from 100 users. The utterances are divided into 10 categories, each containing 100 utterances. …”',
      model: 'QA model'
    }
  ],
  judgment: {
    label: 'Saved judgment',
    preferred: 'Preferred A, rated 2/5 against 1/5 for B.',
    quote: '“While Answer A has inaccuracies, it partially aligns with the ground truth.”',
    lesson: 'The preferred answer still contains factual errors: the judge rated its correctness 1/5.'
  },
  revealLabel: 'Reveal model mapping',
  hiddenStatus: 'The judge saw only Answer A and Answer B.',
  revealedStatus: 'A was the paper-text model and B was the QA model. The judge never saw this mapping.',
  caveat: 'DeepSeek-R1-Distill-Llama-70B via OpenRouter · automated judgment, not human evaluation',
  source: { label: 'Saved judgment', href: blob('Evaluation/merged_output.json') },
  demonstrated: [
    { name: 'LLM-as-judge evaluation', applied: 'Ran reference-based A/B judging' },
    { name: 'Python', applied: 'Matched predictions and randomized presentation order' }
  ]
};

export const findingsSlide = {
  kicker: '05 / Findings and limits',
  title: 'Understand what the comparison demonstrates.',
  lead: 'The pipeline is implemented end to end. The comparison it produced has limits worth stating plainly.',
  chain: [
    { name: 'Prepare', detail: 'QASPER to JSONL' },
    { name: 'Adapt', detail: 'Two LoRA adapters' },
    { name: 'Answer', detail: 'Greedy, 128 new tokens' },
    { name: 'Judge', detail: 'Blind A / B', engine: true }
  ],
  confoundLabel: 'Two things changed together between configurations',
  configs: [
    {
      title: 'QA configuration',
      rows: [
        ['Trained on', 'QA pairs'],
        ['Context at inference', 'Abstract + question']
      ]
    },
    {
      title: 'Paper-text configuration',
      rows: [
        ['Trained on', 'Paper text'],
        ['Context at inference', 'Paper text, trimmed to 11,000 tokens, + question']
      ]
    }
  ],
  limits: [
    'A preference for one configuration cannot be attributed to training alone.',
    'A judge’s preference is not factual correctness, and no LoRA accuracy gain is claimed.'
  ],
  counts: '147 saved judgments covering 146 distinct paper/question pairs. These count saved artifacts, not a human-reviewed sample.',
  next: {
    label: 'Proposed next step, not yet done',
    text: 'Compare the two training approaches at matched context, then vary context with the model held fixed.'
  },
  caveat: 'Counts describe saved files only.',
  source: {
    label: 'Evaluation setup',
    href: blob('Evaluation/prepare_llm_eval_inputs2.ipynb')
  },
  demonstrated: [
    {
      name: 'Evaluation design',
      applied: 'Identified confounds and separated preference from factual correctness'
    }
  ]
};

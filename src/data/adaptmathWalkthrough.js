// Copy and data for the AdaptMATH "Inside the engineering" walkthrough. Facts are taken
// from a review of the repository at the commit below (October 8, 2026); the
// interactions on the page are local explanations of that code, not calls to the app.
const REPO = 'https://github.com/RitamCODE/Adaptive-Math-Tutor';
const COMMIT = '54932239f821eab41a2ea4da574fd28d4979f878';
const blob = (path) => `${REPO}/blob/${COMMIT}/${path}`;

export const walkthroughMeta = {
  label: 'AdaptMATH engineering walkthrough',
  heading: 'AdaptMATH walkthrough',
  note: 'Based on repository commit 5493223. Interactions run locally in your browser and do not call the tutor.'
};

export const walkthroughSlides = [
  { key: 'purpose', chapter: 'The purpose' },
  { key: 'architecture', chapter: 'System architecture' },
  { key: 'turns', chapter: 'Turn orchestration' },
  { key: 'bkt', chapter: 'Bayesian Knowledge Tracing' },
  { key: 'curriculum', chapter: 'Curriculum and difficulty' },
  { key: 'diagnosis', chapter: 'Misconception diagnosis' },
  { key: 'evaluation', chapter: 'Evaluation' }
];

export const purposeSlide = {
  kicker: '01 / The purpose',
  title: 'Math practice that adapts to the learner.',
  intro:
    'AdaptMATH is an adaptive math tutor prototype for K–5 addition and subtraction. It recognizes common mistakes, tracks understanding, and chooses the next practice step.',
  challenge: 'A fixed sequence can miss why a learner is stuck.',
  hub: { title: 'AdaptMATH', caption: 'Adapts the next step' },
  paths: [
    {
      from: {
        icon: 'fa-circle-question',
        title: 'Getting stuck',
        text: 'A recurring mistake with borrowing'
      },
      to: {
        icon: 'fa-life-ring',
        title: 'Targeted support',
        text: 'A specific hint or prerequisite practice'
      }
    },
    {
      from: {
        icon: 'fa-circle-check',
        title: 'Showing understanding',
        text: 'Evidence builds across answers'
      },
      to: {
        icon: 'fa-arrow-trend-up',
        title: 'The next challenge',
        text: 'Unlock the next skill when mastery is sustained'
      }
    }
  ],
  diagramLabel:
    'AdaptMATH responds to a recurring mistake with targeted support, and to sustained understanding by unlocking the next skill.',
  purpose: 'Help each learner work on what they need next.',
  status: 'Hackathon prototype'
};

export const architectureSlide = {
  kicker: '02 / System architecture',
  title: 'A complete learning loop behind one answer.',
  lead: 'A React client, typed FastAPI endpoints, and a deterministic LangGraph engine.',
  laneLabel: 'Submit-to-verdict path',
  chain: [
    { name: 'React', detail: 'Answer + timing' },
    { name: 'FastAPI', detail: 'Typed contract' },
    { name: 'LangGraph', detail: 'Grade · track · route', engine: true }
  ],
  verdict: 'Verdict returns before AI narration',
  cards: [
    {
      icon: 'fa-wand-magic-sparkles',
      title: 'AI alongside the engine',
      lines: [
        ['OpenAI:', 'problem stories + mastery narration'],
        [null, 'Three mastery-card lines share one structured response.'],
        ['LangSmith:', 'LLM tracing when configured']
      ]
    },
    {
      icon: 'fa-database',
      title: 'State, events, recovery',
      lines: [
        ['Memory:', 'active session state'],
        ['SQLite:', 'submission event log'],
        ['Browser snapshots:', 'progress recovery'],
        [null, 'Single-worker prototype storage, not durable sessions.']
      ]
    }
  ],
  caveat: 'AI errors fall back to plain copy.',
  source: { label: 'API implementation', href: blob('backend/api.py#L501-L657') }
};

export const turnSlide = {
  kicker: '03 / Turn orchestration',
  title: 'Every answer takes an explicit route.',
  lead: 'A 12-node state graph handles retries, progression, prerequisite fallback, and session endings.',
  badge: 'Turn-routing graph · not the curriculum graph',
  scenarioLabel: 'Example answer scenarios',
  scenarios: [
    {
      id: 'correct',
      label: 'Correct',
      path: ['grade', 'bkt', 'engagement', 'new'],
      caption:
        'Correct answer, mastery still unconfirmed: update the estimate, then serve a new problem on the same skill.'
    },
    {
      id: 'wrong',
      label: 'First miss',
      path: ['grade', 'remediation', 'bkt', 'engagement', 'retry'],
      caption:
        'First signal-bearing miss: build targeted remediation, update mastery, and retry the same problem.'
    },
    {
      id: 'third',
      label: 'Third miss',
      path: ['grade', 'remediation', 'bkt', 'engagement', 'demote'],
      caption:
        'Third miss on a skill with a prerequisite: build remediation, update mastery, and fall back to that prerequisite.'
    },
    {
      id: 'rapid',
      label: 'Rapid guess',
      path: ['grade', 'hold'],
      caption:
        'An answer in under 2 seconds takes the hold path. Mastery and attempt count stay unchanged.'
    }
  ],
  nodeLabels: {
    grade: ['Grade +', 'diagnose'],
    hold: ['Hold', 'non-signal'],
    remediation: ['Build', 'remediation'],
    bkt: ['Update', 'mastery'],
    engagement: ['Engagement', '+ route'],
    advance: ['Advance', 'skill'],
    new: ['New', 'problem'],
    retry: ['Retry', 'problem'],
    demote: ['Demote', 'skill'],
    resurface: ['Resurface', 'skill'],
    end: ['End', 'session']
  },
  outcomes: ['advance', 'new', 'retry', 'demote', 'resurface', 'end'],
  edges: [
    ['grade', 'hold'],
    ['grade', 'remediation'],
    ['grade', 'bkt'],
    ['remediation', 'bkt'],
    ['bkt', 'engagement'],
    ['engagement', 'advance'],
    ['engagement', 'new'],
    ['engagement', 'retry'],
    ['engagement', 'demote'],
    ['engagement', 'resurface'],
    ['engagement', 'end']
  ],
  graphLabel: 'Submit-answer branches of the turn graph. Bootstrap and terminal return edges are omitted.',
  caveat: 'Highlighted paths verified against the compiled graph.',
  source: { label: 'Graph wiring', href: blob('backend/graph.py#L349-L454') }
};

export const bktSlide = {
  kicker: '04 / Bayesian Knowledge Tracing',
  title: 'Track evidence of understanding.',
  lead: 'Each skill has its own probability of mastery, updated with slip, guess, and learning probabilities.',
  exampleTitle: 'Addition with carrying',
  exampleSubtitle: 'Interactive example',
  meterLabel: 'Estimated skill mastery',
  thresholdLabel: '80% gate',
  gateRule:
    'Progression requires 3 successive signal-bearing answers that each leave mastery at or above 80%.',
  startMessage: 'A new skill starts at 30%. Try one correct answer.',
  skipMessage: 'Blank or rapid submission: no mastery update, no attempt consumed.',
  actions: [
    { id: 'correct', label: 'Correct answer' },
    { id: 'wrong', label: 'Wrong answer' },
    { id: 'skip', label: 'Blank / rapid' }
  ],
  restartLabel: 'Restart example',
  parameters: 'Model defaults: initial mastery 30% · slip 10% · guess 5% · learning 15%',
  caveat: 'The estimate and the sustained-evidence gate are separate.',
  source: { label: 'BKT update', href: blob('backend/models/bkt.py#L14-L68') }
};

const LADDER_FAST = '1 → 2 digits: two consecutive correct answers, trivial then non-trivial. Later tiers require three.';
const LADDER_STEADY = '3 consecutive correct answers at the current width advance the tier.';

export const curriculumSlide = {
  kicker: '05 / Curriculum and difficulty',
  title: 'Separate what’s next from how hard it is.',
  lead: 'The skill graph gates prerequisites. A separate digit-width ladder controls difficulty.',
  badge: 'Curriculum prerequisites · not the turn-routing graph',
  chainLabel: 'Select a skill, in prerequisite order',
  skills: [
    {
      name: 'Addition without carrying',
      symbol: '+',
      prereq: 'Starts unlocked; no prerequisite.',
      widths: [1, 2, 3],
      rule: LADDER_FAST
    },
    {
      name: 'Addition with carrying',
      symbol: '+',
      prereq: 'Requires sustained mastery of addition without carrying.',
      widths: [2, 3],
      rule: LADDER_STEADY
    },
    {
      name: 'Subtraction without borrowing',
      symbol: '−',
      prereq: 'Requires sustained mastery of addition with carrying.',
      widths: [1, 2, 3],
      rule: LADDER_FAST
    },
    {
      name: 'Subtraction with borrowing',
      symbol: '−',
      prereq: 'Requires sustained mastery of subtraction without borrowing.',
      widths: [2, 3],
      rule: LADDER_STEADY
    }
  ],
  initialSkill: 1,
  separation:
    'A first correct answer can raise the BKT estimate above 90%; the separate ladder keeps that jump from skipping difficulty tiers.',
  caveat: '4 sub-skills · 2 parent groups',
  source: { label: 'Prerequisite DAG', href: blob('backend/skills/skill_graph.py') }
};

export const diagnosisSlide = {
  kicker: '06 / Misconception diagnosis',
  title: 'Find the mistake behind the number.',
  lead: 'Ordered, pure rule detectors map a wrong answer to a specific hint and remediation payload.',
  equation: '42 − 17',
  equationCaption: 'Subtraction with borrowing',
  promptLabel: 'Learner submits:',
  choicesLabel: 'Example answers for 42 minus 17',
  // Explicit order: object keys that look like integers would sort numerically.
  answers: ['35', '15', '52'],
  initialAnswer: '35',
  diagnoses: {
    35: {
      name: 'Smaller digit subtracted from larger',
      hint: 'When a digit is smaller, borrow instead of just subtracting backward.',
      effect: 'Updates mastery · keeps the same problem'
    },
    15: {
      name: 'Borrowed ten was not accounted for',
      hint: 'You borrowed, but the tens digit still needs to shrink.',
      effect: 'Updates mastery · keeps the same problem'
    },
    52: {
      name: 'Correct digits, reversed order',
      hint: 'Right digits, wrong order: check which one comes first.',
      effect:
        'Exception: skips the mastery update and the sustained run, but still consumes an attempt. The difficulty streak can still reset.'
    }
  },
  ladderLabel: 'Wrong-answer retry ladder',
  ladder: [
    { title: '1st miss', text: 'Targeted hint' },
    { title: '2nd miss', text: 'Visual help by mastery band' },
    { title: '3rd miss', text: 'Reveal answer + prerequisite fallback*' }
  ],
  note: 'Hint and visual copy live in a JSON catalog; detector logic stays in Python. Matches are known error patterns, not proof of how the learner thought.',
  caveat: '*Subject to prerequisites and session-stop rules.',
  source: { label: 'Diagnosis rules', href: blob('backend/nodes/diagnosis.py') }
};

export const evaluationSlide = {
  kicker: '07 / Evaluation',
  title: 'Evaluated against a fixed baseline.',
  lead: 'Synthetic learners run through the actual compiled graph. Their hidden knowledge state is scored separately from BKT.',
  meta: ['200 synthetic learners per profile and condition', '16-problem budget'],
  tableLabel: 'Percentage mastering all four skills, adaptive pacing versus fixed baseline',
  groups: ['Engine-confirmed', 'Hidden knowledge'],
  // [engine adaptive, engine fixed, hidden adaptive, hidden fixed]
  rows: [
    { profile: 'Struggling', values: ['4.0%', '1.5%', '6.5%', '6.0%'] },
    { profile: 'Average', values: ['21.5%', '12.5%', '29.5%', '27.5%'] },
    { profile: 'Fluent', values: ['43.0%', '37.0%', '56.0%', '64.0%'] },
    { profile: 'Mixed', values: ['23.5%', '14.0%', '27.5%', '31.0%'] }
  ],
  findings:
    'Higher engine-confirmed completion for average and mixed profiles. No clear hidden-knowledge gain in this run; real-student learning is unvalidated.',
  bound:
    'This tests the engine on simulated learners. It does not show that real students learn more.',
  review: 'Oct 8, 2026 review: 186 backend tests passed · production build passed',
  caveat: 'Reproduced from seed 0 · Oct 8, 2026',
  source: { label: 'Full evaluation', href: blob('KNOWN_GAPS.md') }
};

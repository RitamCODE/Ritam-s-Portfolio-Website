// Copy and data for the bird classification "Inside the engineering" walkthrough. The
// dimensions below describe the documented architecture, not measured results, and the
// interactions on the page are local explanations of that design, not model runs.

export const walkthroughMeta = {
  label: 'Bird classification engineering walkthrough',
  heading: 'Bird classification walkthrough',
  note: 'Dimensions describe the documented architecture, not measured results. Audio visuals are schematics, and interactions run locally in your browser without a model.'
};

export const walkthroughSlides = [
  { key: 'purpose', chapter: 'The purpose' },
  { key: 'audio', chapter: 'Audio representation' },
  { key: 'encoder', chapter: 'Encoder adaptation' },
  { key: 'fusion', chapter: 'Feature fusion' },
  { key: 'limits', chapter: 'Learning and limits' }
];

export const purposeSlide = {
  kicker: '01 / The purpose',
  title: 'Recognizing birds by appearance and sound',
  lead: 'A first-semester course prototype that combined photographs and recorded calls to explore species classification when a single source of information can be ambiguous.',
  diagramLabel:
    'Visual appearance and recorded calls provide two types of evidence for a shared species prediction.',
  cues: [
    {
      icon: 'fa-image',
      title: 'What it looks like',
      text: 'Color, shape and feather patterns'
    },
    {
      icon: 'fa-wave-square',
      title: 'What it sounds like',
      text: 'Patterns in recorded calls'
    }
  ],
  outcome: {
    icon: 'fa-dove',
    title: 'Use both cues',
    text: 'Explore complementary evidence',
    prediction: 'One species prediction'
  },
  motivation:
    'Motivation: support species identification for ecological research and biodiversity monitoring. This is an exploratory prototype, not a deployed system.',
  ownership: 'My work: image and audio preprocessing, both encoders and the fusion.',
  caveat: 'Exploratory course prototype',
  demonstrated: [
    { name: 'Computer vision', applied: 'Encoded bird photographs with ResNet18' },
    { name: 'Audio processing', applied: 'Converted calls into mel spectrograms' }
  ]
};

export const audioSlide = {
  kicker: '02 / Audio representation',
  title: 'Making sound usable by an image network',
  lead: 'I converted bird audio into mel spectrograms: maps of signal strength across time and frequency bands that a CNN can process like an image.',
  stagesLabel: 'Audio representation stages',
  initialStage: 'waveform',
  stages: [
    {
      id: 'waveform',
      label: 'Waveform',
      heading: 'Audio sampled at a consistent rate',
      size: '16 kHz sampling',
      axisLeft: 'Amplitude',
      axisRight: 'Time',
      detail:
        'Resampling standardizes the rate at which the waveform is represented before audio features are computed.',
      plotLabel: 'Schematic waveform, not a real recording'
    },
    {
      id: 'mel',
      label: 'Mel spectrogram',
      heading: 'Sound represented in two dimensions',
      size: '128 mel bands',
      axisLeft: 'Mel frequency bands',
      axisRight: 'Time',
      detail:
        'Each cell is the signal strength in one frequency band at one moment. A CNN can process these local time-frequency patterns.',
      plotLabel: 'Schematic mel spectrogram, not measured audio'
    },
    {
      id: 'input',
      label: 'Model input',
      heading: 'A consistent input for the encoder',
      size: '1 × 128 × 128',
      axisLeft: 'Single-channel tensor',
      axisRight: 'Frequency × time',
      detail:
        'The spectrogram is padded or truncated to 128 time frames so every call has the same shape. The exact duration those frames cover is not stated here.',
      plotLabel: 'Schematic single-channel model input, not measured audio'
    }
  ],
  schematicNote: 'Schematic representations, not a recording or model output.',
  caveat: 'Documented preprocessing with torchaudio',
  demonstrated: [
    { name: 'TorchAudio', applied: 'Resampled audio and computed mel features' },
    { name: 'Data preprocessing', applied: 'Prepared fixed-size inputs for the audio encoder' }
  ]
};

export const encoderSlide = {
  kicker: '03 / Encoder adaptation',
  title: 'Adapting ResNet18 to a different input',
  lead: 'I used separate ResNet18 encoders for photographs and spectrograms, adapting the audio model’s first convolution to accept one channel instead of three.',
  diagramLabel:
    'A single-channel 128 by 128 mel spectrogram enters an adapted ResNet18 and produces a 128-dimensional feature vector.',
  chain: [
    { name: 'Mel input', value: '1 × 128 × 128', detail: 'One channel, frequency × time' },
    {
      name: 'Audio ResNet18',
      detail: 'Adapted first convolution, CNN feature extraction',
      engine: true
    },
    { name: 'Audio features', value: '128', detail: 'Learned representation, ready for fusion' }
  ],
  channelsLabel: 'Input channels',
  channels: [
    { name: 'Photograph (RGB)', count: 3 },
    { name: 'Mel spectrogram', count: 1, highlight: true }
  ],
  note: 'A spectrogram gives a 2D CNN local time-frequency patterns to process. The output is a feature vector, before the final species decision.',
  caveat: 'Training schedule not stated',
  demonstrated: [
    { name: 'Torchvision / ResNet18', applied: 'Used separate CNN backbones for the two inputs' },
    { name: 'Model adaptation', applied: 'Changed the audio model to accept one channel' }
  ]
};

export const fusionSlide = {
  kicker: '04 / Feature fusion',
  title: 'Joining two branches before classification',
  lead: 'I built both branches and joined their feature vectors before classification. The classifier receives one combined representation rather than two separate predictions.',
  traceLabel: 'Trace a path through the architecture',
  initialTrace: 'all',
  traces: [
    {
      id: 'all',
      label: 'Both branches',
      detail: 'Feature-level fusion joins the two representations before the species decision.'
    },
    {
      id: 'audio',
      label: 'Trace the audio path',
      detail:
        'Audio path: a mel spectrogram enters the adapted encoder, and its features join the image features before the classifier.'
    }
  ],
  branches: [
    {
      id: 'image',
      icon: 'fa-image',
      title: 'Image branch',
      subtitle: 'Appearance features',
      steps: ['RGB photograph', 'Image ResNet18', '128 image features']
    },
    {
      id: 'audio',
      icon: 'fa-wave-square',
      title: 'Audio branch',
      subtitle: 'Call features',
      steps: ['Mel spectrogram', 'Audio ResNet18', '128 audio features']
    }
  ],
  chain: [
    { name: 'Concatenate', detail: '128 + 128 = 256 features', engine: true },
    { name: 'Shared classifier', detail: 'Dense, ReLU, dropout' },
    { name: 'Species scores', detail: 'One score per class' }
  ],
  caveat: 'Feature-level fusion',
  demonstrated: [
    { name: 'Multimodal learning', applied: 'Combined visual and audio representations' },
    { name: 'Model integration', applied: 'Connected both encoders to one classification head' }
  ]
};

export const limitsSlide = {
  kicker: '05 / Learning and limits',
  title: 'What the project established',
  lead: 'A first-semester exploration under a short deadline. I built the image and audio pipelines, adapted the encoders and integrated the feature fusion.',
  items: [
    {
      icon: 'fa-layer-group',
      title: 'A multimodal classification prototype',
      text: 'Separate image and audio encoders connected through feature concatenation.',
      label: 'Preprocessing, both branches and the classifier'
    },
    {
      icon: 'fa-circle-question',
      title: 'Performance remains unverified',
      text: 'The project does not establish that fusion outperformed either branch on its own.',
      label: 'No accuracy or robustness claim'
    },
    {
      icon: 'fa-code-compare',
      title: 'A clear next experiment',
      text: 'Confirm how photographs and recordings are paired and how training is set up, then compare image-only, audio-only and fusion models on a consistent held-out set.',
      label: 'Proposed validation, not completed work'
    }
  ],
  caveat: 'Evaluation incomplete',
  demonstrated: [
    { name: 'ML prototyping', applied: 'Built preprocessing, encoders and fusion' },
    { name: 'Technical communication', applied: 'Explained the pipeline in a report and poster' }
  ]
};

// Copy and data for the AO-OCT research "Inside the engineering" walkthrough. Every diagram is
// a conceptual schematic: no patient images, figures or measured curves appear anywhere in the
// deck. ISOSNet is Zhou et al.'s model; "we" is the joint research, "I" is Ritam's engineering.

export const walkthroughMeta = {
  label: 'AO-OCT research walkthrough',
  heading: 'AO-OCT walkthrough',
  note: 'Diagrams are conceptual schematics. No patient images or measured curves are shown.'
};

export const walkthroughSlides = [
  { key: 'purpose', chapter: 'The purpose' },
  { key: 'signal', chapter: 'The signal' },
  { key: 'pipeline', chapter: 'My engineering' },
  { key: 'findings', chapter: 'The findings' },
  { key: 'limits', chapter: 'Learning and limits' }
];

export const purposeSlide = {
  kicker: '01 / The purpose',
  title: 'Can a model’s changing behavior reveal abnormal tissue?',
  lead: 'We explored whether a model trained on healthy retinal anatomy could provide a local signal when that anatomy changes.',
  diagramLabel:
    'Healthy anatomy, which ISOSNet was trained on, leads to an AMD B-scan, an unseen disease setting, and then to spatial changes read from the probability curves.',
  flow: [
    { icon: 'fa-eye', title: 'Healthy anatomy', text: 'ISOSNet’s training data', glyph: 'layers' },
    { icon: 'fa-bars-staggered', title: 'AMD B-scan', text: 'An unseen disease setting', glyph: 'disrupted' },
    { icon: 'fa-chart-line', title: 'Spatial changes', text: 'Read the probability curves', glyph: 'spark', highlight: true }
  ],
  definitions:
    'ISOSNet, a retinal segmentation model by Zhou et al., is the healthy-trained baseline. A B-scan is a cross-sectional retinal image. Drusen are deposits that can deform retinal layers in AMD.',
  contribution: {
    label: 'My contribution',
    text: 'Exporting logits, analyzing confidence across strips, and aligning the image with its curves.'
  },
  caveat: 'Joint research · Built on Zhou et al.’s ISOSNet · Concept diagram',
  demonstrated: [
    { name: 'Research analysis', applied: 'Explored a spatial signal under domain shift' },
    { name: 'Python + PyTorch', applied: 'Extended inference outputs for analysis' }
  ]
};

export const signalSlide = {
  kicker: '02 / The signal',
  title: 'The shape of the curve is the clue',
  lead: 'We looked for local departures from a flat baseline. An upward spike and a downward dip can both matter.',
  patternsLabel: 'Illustrative confidence patterns',
  initialPattern: 'flat',
  plotTitle: 'Per-class probability across the scan',
  plotBadge: 'Schematic, not measured data',
  axisY: 'Probability',
  axisX: 'Horizontal position',
  // Points on a 600 x 170 schematic canvas (y grows downward; 88 is the flat baseline).
  patterns: [
    {
      id: 'flat',
      label: 'Flat baseline',
      plotLabel: 'Schematic curve: a flat baseline across the scan',
      caption: 'Flat curves provide the reference pattern.',
      points: [
        [0, 88],
        [600, 88]
      ]
    },
    {
      id: 'spike',
      label: 'Upward spike',
      plotLabel: 'Schematic curve: a local upward spike above the flat baseline',
      caption: 'A local upward departure can be a signal, even though probability increases.',
      points: [
        [0, 88],
        [180, 88],
        [206, 86],
        [232, 66],
        [256, 46],
        [279, 71],
        [306, 84],
        [330, 88],
        [600, 88]
      ]
    },
    {
      id: 'dip',
      label: 'Downward dip',
      plotLabel: 'Schematic curve: a local downward dip below the flat baseline',
      caption: 'A local downward departure can also be a signal. There is no disease threshold.',
      points: [
        [0, 88],
        [180, 88],
        [206, 90],
        [232, 107],
        [256, 121],
        [279, 101],
        [306, 92],
        [330, 88],
        [600, 88]
      ]
    }
  ],
  region: { x: 168, width: 176 },
  note: 'Model confidence is not clinical certainty. We interpret spatial shape, not a disease threshold.',
  caveat: 'Conceptual illustration · Does not reproduce patient data or measured curves',
  demonstrated: [
    { name: 'NumPy', applied: 'Computed per-class probability summaries' },
    { name: 'Interpretation', applied: 'Separated model response from clinical meaning' }
  ]
};

export const pipelineSlide = {
  kicker: '03 / My engineering',
  title: 'From hidden probabilities to a readable spatial signal',
  lead: 'One normal inference pass supplies the logits. My analysis pipeline preserves their information and makes it readable across the scan.',
  stepsLabel: 'Explore the analysis steps',
  steps: [
    {
      id: 'export',
      label: 'Export logits',
      kicker: 'Preserve the output',
      title: 'Keep what argmax discards',
      text: 'The usual prediction keeps only the winning class per pixel. I extended inference to also save the raw 4-class segmentation logits from that same pass.'
    },
    {
      id: 'softmax',
      label: 'Softmax',
      kicker: 'Normalize per pixel',
      title: 'Convert logits to probabilities',
      text: 'Softmax, applied offline, gives a probability for each of the 4 classes at every pixel. It needs no extra inference passes.'
    },
    {
      id: 'strips',
      label: '4-pixel strips',
      kicker: 'Resolve space',
      title: 'Average within vertical strips',
      text: 'For each non-overlapping 4-pixel vertical strip, I average each class probability over the full image height. The three foreground classes are reported separately.'
    },
    {
      id: 'smooth',
      label: 'Smooth',
      kicker: 'Read the pattern',
      title: 'Smooth across neighboring strips',
      text: 'A 3-point moving average reduces short-scale variation, so the spatial pattern is easier to inspect.'
    },
    {
      id: 'align',
      label: 'Align',
      kicker: 'Preserve correspondence',
      title: 'Same position, two views',
      text: 'The retinal image is cropped for display with its aspect ratio preserved, and its horizontal axis is aligned with the curves’ axis, so one position reads the same in both.'
    }
  ],
  note: 'The crop is for display. Strip averages use the full image height, so background still influences the foreground curves.',
  caveat: 'My pipeline was written with AI assistance · ISOSNet architecture unchanged',
  demonstrated: [
    { name: 'Python + NumPy', applied: 'Built batch analysis across 47 AMD B-scans' },
    { name: 'Matplotlib', applied: 'Preserved aspect ratio and aligned both x-axes' }
  ]
};

export const findingsSlide = {
  kicker: '04 / The findings',
  title: 'Global degradation. Local clues.',
  lead: 'The healthy-trained model struggled on AMD scans. Our strip analysis explored where its behavior changed.',
  global: {
    label: 'Global: model degradation',
    chartTitle: 'Segmentation mean F1',
    chartScale: 'Higher is better · Scale 0 to 1',
    chartLabel:
      'Segmentation mean F1 on a scale from 0 to 1: healthy reference 0.9443; AMD test without fine-tuning 0.6597.',
    bars: [
      { label: 'Healthy reference', value: 0.9443 },
      { label: 'AMD test · No fine-tuning', value: 0.6597, amd: true }
    ],
    stats: [
      { value: '47 B-scans · 3 AMD subjects', text: 'Scope of the confidence analysis' },
      { value: 'About 37× segmentation loss', text: '0.1198 healthy reference → 4.406 AMD' }
    ]
  },
  local: {
    label: 'Local: qualitative finding',
    text: 'Confidence curves became irregular near visible structural abnormalities and stayed flatter in intact-looking regions.'
  },
  note: 'These metrics describe model degradation. They do not measure disease detection or validate localization accuracy.',
  caveat: 'Aggregate results · Local correspondence assessed visually',
  demonstrated: [
    { name: 'Data analysis', applied: 'Examined spatial behavior across the test set' },
    { name: 'Evidence assessment', applied: 'Separated global metrics from qualitative findings' }
  ]
};

export const limitsSlide = {
  kicker: '05 / Learning and limits',
  title: 'A useful research signal, with validation still ahead',
  lead: 'We demonstrated a way to inspect model behavior spatially. The evidence supports further study of the signal.',
  lessons: [
    {
      icon: 'fa-location-crosshairs',
      title: 'Where matters',
      text: 'Spatial analysis helps inspect changes that global metrics cannot locate.'
    },
    {
      icon: 'fa-wave-square',
      title: 'Shape matters',
      text: 'Confidence can rise or fall near disruption. Absolute values are not diagnostic.'
    },
    {
      icon: 'fa-recycle',
      title: 'Reuse the output',
      text: 'No disease labels in the confidence analysis, no fine-tuning, and no extra inference passes.'
    }
  ],
  limits: {
    label: 'Current limits',
    items: [
      'Three AMD subjects',
      'One checkpoint',
      'No annotated pathology validation',
      'No quantitative irregularity score'
    ]
  },
  next: {
    label: 'Future work',
    text: 'Define a quantitative irregularity score, validate it against expert annotations, and test across other models and diseases.'
  },
  exploratory: 'A follow-up on Kermany2018 clinical OCT is exploratory. No outcome is claimed.',
  caveat: 'Research demonstration · Not a validated diagnostic tool',
  demonstrated: [
    { name: 'Research judgment', applied: 'Made cohort and validation limits explicit' },
    { name: 'Scientific communication', applied: 'Separated observations from future work' }
  ]
};

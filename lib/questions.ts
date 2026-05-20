export type QuestionType = 'yes-no-positive' | 'yes-no-reverse' | 'multiple-choice' | 'multi-select'
export type Category = 'identity' | 'energy' | 'desire' | 'boundaries' | 'selftrust' | 'research'

export interface MCOption {
  value: string
  text: string
  points: number
}

export interface Question {
  id: number
  category: Category
  type: QuestionType
  text: string
  mcOptions?: MCOption[]
  multiOptions?: string[]
}

export const QUESTIONS: Question[] = [
  // CATEGORY 01 — IDENTITY
  {
    id: 1,
    category: 'identity',
    type: 'yes-no-positive',
    text: 'Do you have a clear sense of who you are beneath the roles you play — separate from being a mother, partner, or professional?',
  },
  {
    id: 2,
    category: 'identity',
    type: 'yes-no-reverse',
    text: "Have you ever caught yourself thinking, 'I don't know what I actually want anymore'?",
  },
  {
    id: 3,
    category: 'identity',
    type: 'yes-no-reverse',
    text: 'Do you spend more time thinking about what others need than what you need?',
  },
  {
    id: 4,
    category: 'identity',
    type: 'yes-no-reverse',
    text: "Has it been so long since you felt fully yourself that you've forgotten what that even looks like?",
  },
  {
    id: 5,
    category: 'identity',
    type: 'yes-no-positive',
    text: 'Do you feel connected to a sense of yourself that exists beyond your responsibilities and obligations?',
  },
  {
    id: 6,
    category: 'identity',
    type: 'multiple-choice',
    text: 'Which best describes your relationship with your own identity right now?',
    mcOptions: [
      { value: 'A', text: "I have completely lost myself — I don't recognise the woman I've become.", points: 1 },
      { value: 'B', text: "I know something is off but I couldn't describe what's missing.", points: 2 },
      { value: 'C', text: 'I have glimpses of who I really am but she feels far away.', points: 3 },
      { value: 'D', text: 'I have a clear sense of who I am — I just need to live from that place more consistently.', points: 4 },
    ],
  },
  {
    id: 7,
    category: 'identity',
    type: 'multiple-choice',
    text: 'Which best describes your life right now?',
    mcOptions: [
      { value: 'A', text: 'I am holding it all together but feel completely disconnected from myself.', points: 1 },
      { value: 'B', text: 'I am in a transition and I know something needs to change.', points: 2 },
      { value: 'C', text: 'I have started reconnecting with myself but it still feels fragile.', points: 3 },
      { value: 'D', text: 'I feel grounded in who I am and I want to deepen that.', points: 4 },
    ],
  },

  // CATEGORY 02 — ENERGY
  {
    id: 8,
    category: 'energy',
    type: 'yes-no-reverse',
    text: "Do you regularly feel exhausted in a way that sleep doesn't fix?",
  },
  {
    id: 9,
    category: 'energy',
    type: 'yes-no-reverse',
    text: "Do you give your best energy to everyone else and operate on what's left?",
  },
  {
    id: 10,
    category: 'energy',
    type: 'yes-no-positive',
    text: 'Do you regularly experience moments where you feel genuinely alive and energised — not just functioning?',
  },
  {
    id: 11,
    category: 'energy',
    type: 'yes-no-positive',
    text: 'Does the way you feel on the inside generally match how you appear on the outside?',
  },
  {
    id: 12,
    category: 'energy',
    type: 'yes-no-positive',
    text: 'When you imagine a version of yourself who is fully energised and lit up — does that feel genuinely possible rather than out of reach?',
  },
  {
    id: 13,
    category: 'energy',
    type: 'multiple-choice',
    text: 'How would you describe your energy levels on a typical day?',
    mcOptions: [
      { value: 'A', text: "Running on empty — I'm exhausted before the day has even begun.", points: 1 },
      { value: 'B', text: "Functioning but flat — I get through it, but there's no spark.", points: 2 },
      { value: 'C', text: 'Variable — I have moments of aliveness but they do not last.', points: 3 },
      { value: 'D', text: 'Mostly grounded and present — I know how to replenish myself.', points: 4 },
    ],
  },
  {
    id: 14,
    category: 'energy',
    type: 'multiple-choice',
    text: 'Where does most of your energy go each day?',
    mcOptions: [
      { value: 'A', text: 'Almost entirely into managing others — their needs, their emotions, their expectations.', points: 1 },
      { value: 'B', text: 'Split between obligations and occasional things that feel like mine.', points: 2 },
      { value: 'C', text: 'Mostly into things that matter to me, but I still over-give in certain areas.', points: 3 },
      { value: 'D', text: "Into what genuinely lights me up — I've learned to protect my energy.", points: 4 },
    ],
  },

  // CATEGORY 03 — DESIRE
  {
    id: 15,
    category: 'desire',
    type: 'yes-no-reverse',
    text: 'Do you struggle to answer the question: what do YOU want?',
  },
  {
    id: 16,
    category: 'desire',
    type: 'yes-no-reverse',
    text: 'Have you put your own dreams, passions, or goals on hold for so long that they feel almost irrelevant now?',
  },
  {
    id: 17,
    category: 'desire',
    type: 'yes-no-positive',
    text: 'Do you feel comfortable wanting things purely for yourself — without guilt or justification?',
  },
  {
    id: 18,
    category: 'desire',
    type: 'yes-no-positive',
    text: 'Do you have a clear sense of the life you actually want — not the one that is easiest or most expected?',
  },
  {
    id: 19,
    category: 'desire',
    type: 'yes-no-positive',
    text: 'Do you regularly make decisions based on what you genuinely want rather than what will inconvenience others least?',
  },
  {
    id: 20,
    category: 'desire',
    type: 'multiple-choice',
    text: 'How connected are you to your own desires right now?',
    mcOptions: [
      { value: 'A', text: "Completely disconnected — I wouldn't know where to begin.", points: 1 },
      { value: 'B', text: "I have a vague sense of wanting more but it's blurry and hard to name.", points: 2 },
      { value: 'C', text: "I know what I want but I haven't given myself permission to go after it.", points: 3 },
      { value: 'D', text: 'I am clear on what I want and I am actively pursuing it.', points: 4 },
    ],
  },
  {
    id: 21,
    category: 'desire',
    type: 'multiple-choice',
    text: 'When it comes to your own needs and wants, which is most true?',
    mcOptions: [
      { value: 'A', text: 'I consistently put them last — sometimes I forget I have any.', points: 1 },
      { value: 'B', text: 'I acknowledge them but rarely act on them.', points: 2 },
      { value: 'C', text: 'I am getting better at honouring them, though the guilt still shows up.', points: 3 },
      { value: 'D', text: 'I treat my own desires as non-negotiable — they are part of how I lead my life.', points: 4 },
    ],
  },

  // CATEGORY 04 — BOUNDARIES
  {
    id: 22,
    category: 'boundaries',
    type: 'yes-no-reverse',
    text: 'Do you regularly say yes when you mean no?',
  },
  {
    id: 23,
    category: 'boundaries',
    type: 'yes-no-reverse',
    text: "Do you feel responsible for other people's emotions and shape your behaviour around managing them?",
  },
  {
    id: 24,
    category: 'boundaries',
    type: 'yes-no-positive',
    text: 'Can you disappoint someone when necessary without it overriding your own needs?',
  },
  {
    id: 25,
    category: 'boundaries',
    type: 'yes-no-positive',
    text: 'Do your closest relationships feel reciprocal — where you give and receive in reasonable balance?',
  },
  {
    id: 26,
    category: 'boundaries',
    type: 'yes-no-positive',
    text: 'Do you feel free to grow, change, and speak your truth even when it creates discomfort for those around you?',
  },
  {
    id: 27,
    category: 'boundaries',
    type: 'multiple-choice',
    text: 'How would you describe your ability to set and hold boundaries right now?',
    mcOptions: [
      { value: 'A', text: 'I have almost no boundaries — I accommodate everyone and am resentful because of it.', points: 1 },
      { value: 'B', text: 'I know I need them but struggle to enforce them without guilt.', points: 2 },
      { value: 'C', text: 'I have some solid boundaries but there are still key relationships where I fold.', points: 3 },
      { value: 'D', text: 'I hold my boundaries with clarity and without apology.', points: 4 },
    ],
  },
  {
    id: 28,
    category: 'boundaries',
    type: 'multiple-choice',
    text: "When someone pushes back on a boundary you've set, what usually happens?",
    mcOptions: [
      { value: 'A', text: 'I back down almost immediately — the discomfort is too much.', points: 1 },
      { value: 'B', text: 'I hold it for a moment but usually concede to keep the peace.', points: 2 },
      { value: 'C', text: 'I hold most of the time but certain people still have the ability to move me.', points: 3 },
      { value: 'D', text: 'I hold. Their reaction is their work, not mine.', points: 4 },
    ],
  },

  // CATEGORY 05 — SELF-TRUST
  {
    id: 29,
    category: 'selftrust',
    type: 'yes-no-reverse',
    text: "Do you frequently second-guess decisions you've already made?",
  },
  {
    id: 30,
    category: 'selftrust',
    type: 'yes-no-reverse',
    text: 'Do you tend to seek reassurance or validation from others before you feel confident in a choice?',
  },
  {
    id: 31,
    category: 'selftrust',
    type: 'yes-no-positive',
    text: 'Do you generally back yourself to follow through on commitments you make to yourself?',
  },
  {
    id: 32,
    category: 'selftrust',
    type: 'yes-no-positive',
    text: 'When you know what you need to do, do you generally trust yourself enough to do it?',
  },
  {
    id: 33,
    category: 'selftrust',
    type: 'yes-no-reverse',
    text: "When things go wrong, do you default to blaming yourself — even when it isn't your fault?",
  },
  {
    id: 34,
    category: 'selftrust',
    type: 'multiple-choice',
    text: 'How would you describe your relationship with your own intuition?',
    mcOptions: [
      { value: 'A', text: "I don't trust it at all — I override it constantly and second-guess everything.", points: 1 },
      { value: 'B', text: "I hear it but I don't act on it consistently.", points: 2 },
      { value: 'C', text: 'I trust it most of the time but doubt creeps in when the stakes are high.', points: 3 },
      { value: 'D', text: 'My intuition is my compass. I trust it and I act on it.', points: 4 },
    ],
  },
  {
    id: 35,
    category: 'selftrust',
    type: 'multiple-choice',
    text: 'When you make a significant decision, which is most true?',
    mcOptions: [
      { value: 'A', text: 'I spiral in doubt, change my mind repeatedly, and rarely feel certain.', points: 1 },
      { value: 'B', text: 'I make the decision but spend time afterwards questioning whether it was right.', points: 2 },
      { value: 'C', text: 'I decide clearly but still look for confirmation that I got it right.', points: 3 },
      { value: 'D', text: 'I decide, I commit, and I trust myself to handle whatever follows.', points: 4 },
    ],
  },

  // RESEARCH QUESTIONS (unscored)
  {
    id: 36,
    category: 'research',
    type: 'multi-select',
    text: 'Which of these sounds most like you at the moment?',
    multiOptions: [
      "I don't know who I am anymore",
      'My life just lacks meaning and purpose',
      'I feel I have disappeared in life',
      'I have lost my spark and I do not know how to get it back',
      "I don't feel my life is my own",
      "I'm pretty happy with my life and who I am",
    ],
  },
  {
    id: 37,
    category: 'research',
    type: 'multi-select',
    text: 'Have you tried to make changes before?',
    multiOptions: [
      'Yes — I have done courses or programs but nothing has really stuck',
      'Yes — I have worked with a coach or therapist before',
      'I have read a lot and done a lot of self reflection but not taken formal steps',
      'This is the first time I have actively done something about it',
    ],
  },
]

export const profile = {
  name: 'Viljar Võidula',
  title: 'Senior Technical Product Manager · Platforms, APIs & AI',
  greeting: 'Hello, I am a software development enthusiast based in Estonia.',
  summary:
    'Technical product manager who came up through engineering — solutions architect, staff engineer and team lead, then interim CTO and founder. Strongest at rule-driven decisioning, matching quality and API contract design in regulated identity workflows.',
  email: 'viljar@5xer.com',
  linkedin: 'https://www.linkedin.com/in/viljar-voidula',
  github: 'https://github.com/ViljarVoidula',
  location: 'Tallinn / Paide, Estonia',
  url: 'https://www.viltz.ee/'
};

export const contract = {
  bookingUrl: 'https://calendar.app.google/STKRNYDh7Mz8YtNWA',
  enquiryUrl: `mailto:${profile.email}?subject=${encodeURIComponent('Contract enquiry')}&body=${encodeURIComponent(
    'Hi Viljar,\n\nProject:\nTimeline:\nBudget range:\nHow you found me:\n'
  )}`,
  pitch:
    'I take on contract and fractional work where product and engineering meet — usually when a team needs someone who can write the spec, design the system and stay through delivery.',
  offers: [
    { title: 'Product discovery & specs', body: 'Turn a fuzzy problem into a written spec: schema, rules, failure cases and what “done” means.' },
    { title: 'Decisioning & matching systems', body: 'Routing, assignment and matching engines — measured with precision, recall and false-positive cost.' },
    { title: 'API & integration design', body: 'REST/GraphQL contracts, webhooks and versioning that partner teams can build against without you.' },
    {
      title: 'AI transformation & adoption',
      body: 'Find where LLM workflows actually pay off, build them with human review where mistakes are costly, and get the team using them.'
    },
    { title: 'Interim CTO & due diligence', body: 'Technical leadership through a growth phase, or the technical side of a funding round.' }
  ],
  terms: [
    { label: 'Engagement', value: 'Fractional or fixed project' },
    { label: 'Where', value: 'Remote from Estonia · on-site by arrangement' },
    { label: 'Availability', value: 'Open to new projects' },
    { label: 'Rates', value: '€1,000/day · €125/hour', note: 'Half-day minimum · excl. VAT' }
  ]
};

export type Metric = {
  metric: string;
  count: { to: number; decimals?: number; prefix?: string; suffix?: string };
  title: string;
  body: string;
};

// Results with a number get a large figure; the rest are listed as text below.
export const metrics: Metric[] = [
  {
    metric: '70×',
    count: { to: 70, suffix: '×' },
    title: 'Decisioning at scale',
    body: 'Veriff’s task-assignment engine, routing verification sessions to reviewers under SLA — scaled from 10,000 to 700,000+ sessions at sub-second latency.'
  },
  {
    metric: '+8%',
    count: { to: 8, prefix: '+', suffix: '%' },
    title: 'Matching beat Algolia',
    body: 'Owned matching and relevance for an AI search product that won a customer A/B test against Algolia and lifted conversion by about 8%.'
  },
  {
    metric: '€2.5M',
    count: { to: 2.5, decimals: 1, prefix: '€', suffix: 'M' },
    title: 'Funding round',
    body: 'As interim CTO, led customer, partner and investor conversations, including technical due diligence for a €2.5M round.'
  },
  {
    metric: '99.999%',
    count: { to: 99.999, decimals: 3, suffix: '%' },
    title: 'Availability',
    body: 'Held five-nines availability for major retail customers while reducing AWS spend.'
  }
];

export const otherImpact: { title: string; body: string }[] = [
  {
    title: 'Measurement for detection quality.',
    body: 'Designed an Airbyte, Amazon RDS and BigQuery platform processing millions of events per hour, used to validate algorithm behaviour in SQL.'
  },
  {
    title: 'LLM automation with guardrails.',
    body: 'Workflows that turn unstructured signals into reviewable, high-precision output, with human review to contain costly false positives.'
  }
];

export type Role = {
  title: string;
  company: string;
  where: string;
  dates: string;
  logo: string;
  bullets: string[];
};

export const roles: Role[] = [
  {
    title: 'Founder & Product Owner',
    company: 'Fivexer',
    where: 'formerly Forgemaster AI · Remote',
    dates: 'Oct 2024 – present',
    logo: '/images/logos/fivexer.png',
    bullets: [
      'Led the pivot from Forgemaster AI to Fivexer when discovery showed the bigger problem: who does the work.',
      'Own an engine that plans rotas and routes tasks to people or AI agents, with an auditable reason per decision.',
      'Define REST APIs, JSON schemas and webhook contracts, and review the code.',
      'Run demos and pricing talks with prospects, feeding findings into the roadmap.'
    ]
  },
  {
    title: 'Technical Contractor — Product & Platform',
    company: 'Veriff',
    where: 'Tallinn',
    dates: 'Oct 2025 – Sep 2026',
    logo: '/images/logos/veriff.png',
    bullets: [
      'Owned modernisation of the reviewer task-distribution system, from discovery to rollout.',
      'Specified and reviewed REST/GraphQL contracts and event flows around the decisioning engine.',
      'Improved operational data so throughput, queues and edge cases are measured.',
      'Turned recurring compliance-operations pain into scoped, prioritised increments.'
    ]
  },
  {
    title: 'Interim CTO',
    company: 'Miros',
    where: 'Tallinn',
    dates: 'Jan – Aug 2024',
    logo: '/images/logos/miros.png',
    bullets: [
      'Owned technical and product priorities through a growth phase, aligning build with sales.',
      'Launched an AI search platform that beat Algolia in a customer A/B test and lifted conversion by about 8%.',
      'Led technical due diligence for a €2.5M funding round.',
      'Held 99.999% availability for major retail customers while cutting AWS spend.'
    ]
  },
  {
    title: 'Staff Engineer — Search & Platform',
    company: 'Miros',
    where: 'Estonia',
    dates: 'Mar 2023 – Aug 2024',
    logo: '/images/logos/miros.png',
    bullets: [
      'Owned search relevance: tokenisation, fuzzy and multilingual matching, ranking.',
      'Built the measurement platform (millions of events per hour) and its validation SQL.',
      'Shipped a public GraphQL API for independent customer and team integrations.',
      'Led the AWS and Kubernetes migration and introduced OpenTelemetry observability.'
    ]
  },
  {
    title: 'Software Engineering Team Lead',
    company: 'Veriff',
    where: 'Tallinn',
    dates: 'Jan 2022 – Jan 2023',
    logo: '/images/logos/veriff.png',
    bullets: [
      'Built the rule-driven task-assignment engine routing verification sessions to reviewers under SLA; helped scale it from 10,000 to 700,000+ sessions.',
      'Designed a unified GraphQL gateway so neighbouring teams shipped independently.',
      'Led and coached the team; made written proposals and design review the norm.'
    ]
  }
];

// Roles before 2022, shown as one-line entries.
export const earlierRoles: { title: string; meta: string; summary: string }[] = [
  {
    title: 'Solutions Architect',
    meta: 'Telia Eesti · 2019 – 2021',
    summary: 'Provisioning platform for custom MPLS services; IoT architecture for Tartu SmartEnCity.'
  },
  {
    title: 'Founder',
    meta: 'Testreel · 2014 – 2021',
    summary: 'Ran hiring, delivery, sales and partnerships through a successful exit in 2021.'
  },
  {
    title: 'Network monitoring → software testing',
    meta: 'Elion / Telia · 2011 – 2014',
    summary: 'QA on the Samsung Smart TV app that won the IFA 2012 Innovation award.'
  }
];

export const skills: { name: string; list: string }[] = [
  { name: 'Product management', list: 'Technical discovery, specification writing, roadmap & prioritisation, stakeholder management, pricing & packaging' },
  { name: 'API & integration design', list: 'REST, GraphQL, JSON Schemas, webhooks, contract & versioning strategy, partner integrations' },
  { name: 'Matching & detection', list: 'Fuzzy & multilingual matching, tokenisation, relevance ranking, precision/recall trade-offs, Vespa, Qdrant' },
  { name: 'Rules & decisioning', list: 'Decisioning & routing engines, SLA-driven prioritisation, queue design, human-in-the-loop review' },
  { name: 'Data & analysis', list: 'SQL, PostgreSQL, BigQuery, Airbyte, A/B testing, product metrics' },
  { name: 'AI & automation', list: 'LLM workflows, OpenAI, Anthropic, Mistral, vector databases, unstructured data extraction' },
  { name: 'Engineering fluency', list: 'Node.js, TypeScript, microservices, AWS, Kubernetes, CI/CD, code & schema review' },
  { name: 'Regulated & client-facing', list: 'KYC / KYB identity verification, telecommunications, technical due diligence, client enablement' }
];

export const principles: { title: string; body: string }[] = [
  { title: 'Freedom to think', body: 'Room to question the problem and find a better answer — not a backlog to grind through.' },
  { title: 'Objectives, then results', body: 'A few key objectives everyone understands, followed through to measurable results — OKRs over sprint rituals.' },
  { title: 'Closest to the user', body: 'I work directly with customers and front-line teams; their problems set the priorities.' }
];

export type Project = {
  title: string;
  years: string;
  stack: string;
  image: string;
  text: string;
  link?: { url: string; text: string };
};

export const projects: Project[] = [
  {
    title: 'Westbygg',
    years: '2021 – now',
    stack: 'Next.js, Feathers.js',
    image: '/images/work/Westbygg.png',
    text: 'Website for a central-Estonian maker of handmade log cabins, built with traditional manual methods.'
  },
  {
    title: 'Gamestreams',
    years: '2016 – 2019',
    stack: 'React, LG webOS',
    image: '/images/work/Gamestreams.png',
    text: 'E-sports streams for LG TVs. Over 10k downloads a month and top-3 rated in every region, until Twitch shipped its own app.'
  },
  {
    title: 'Telia MinuTV',
    years: '2014 – 2016',
    stack: 'QA · Nightwatch, Appium',
    image: '/images/work/MinuTV.png',
    text: 'Telia Estonia’s first OTT app for web and mobile; I led QA and test automation. Around 50k subscribers.',
    link: { url: 'https://www.am.ee/en/node/2244', text: 'Press: MinuTV for iPhone (in Estonian)' }
  },
  {
    title: 'Telia Connected TV',
    years: '2012 – 2015',
    stack: 'QA · Samsung Smart TV',
    image: '/images/work/ConnectedTV.jpg',
    text: 'The Samsung Smart TV app that won the IFA 2012 Innovation award, TV category.',
    link: {
      url: 'https://forte.delfi.ee/artikkel/65370010/elion-ja-samsung-toid-maailmas-esimesena-turule-digiboksivaba-tv-teenuse-smart-tv-des',
      text: 'Press: world-first set-top-box-free TV (in Estonian)'
    }
  },
  {
    title: 'Simote',
    years: '2013 – 2014',
    stack: 'Requirements · acceptance testing',
    image: '/images/work/Simote.png',
    text: 'IR-blaster platform that recorded user behaviour and replayed it across TV and set-top box hardware.'
  }
];

export const education = [
  { name: 'Computer Technology / Computer Systems Technology', where: 'Kehtna School of Economics and Technology, 2006 – 2010' },
  { name: 'Finance & Financial Management Services', where: 'Estonian Entrepreneurship University of Applied Sciences, since 2015' }
];

export const photos = [
  { src: '/images/hobbies/cessna.jpeg', alt: 'Viljar beside a light aircraft on the apron before a flight', caption: 'Pre-flight, PPL(A)' },
  { src: '/images/hobbies/jet.png', alt: 'Viljar in a jet cockpit wearing a helmet and oxygen mask, high above farmland', caption: 'In the back seat of a jet' },
  { src: '/images/hobbies/snowboard.png', alt: 'Viljar resting in the snow with a snowboard', caption: '18 years on a snowboard' }
];

export const books = [
  {
    title: 'The Emperor’s Handbook',
    author: 'Marcus Aurelius',
    cover: '/images/books/emperors-handbook.jpg',
    url: 'https://www.amazon.com/Emperors-Handbook-New-Translation-Meditations/dp/0743233832'
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    cover: '/images/books/pragmatic-programmer.jpg',
    url: 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition'
  },
  {
    title: 'The Innovator’s Dilemma',
    author: 'Clayton M. Christensen',
    cover: '/images/books/innovators-dilemma.jpg',
    url: 'https://en.wikipedia.org/wiki/The_Innovator%27s_Dilemma'
  },
  {
    title: 'The Mythical Man-Month',
    author: 'Frederick P. Brooks Jr.',
    cover: '/images/books/mythical-man-month.jpg',
    url: 'https://www.amazon.com/Mythical-Man-Month-Software-Engineering-Anniversary/dp/0201835959'
  },
  { title: 'Brave New World', author: 'Aldous Huxley', cover: '/images/books/brave-new-world.jpg', url: 'https://en.wikipedia.org/wiki/Brave_New_World' }
];

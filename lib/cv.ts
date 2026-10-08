export const profile = {
  name: 'Viljar Võidula',
  title: 'Engineering Leadership · Product Delivery · Platforms & AI',
  greeting: 'Hello, I am a software development enthusiast based in Estonia.',
  summary:
    'Engineering leader with experience as a team lead, staff engineer, interim CTO and founder in product companies. I develop engineers through coaching, feedback and real ownership, and stay responsible from problem definition through delivery and operations — scalable systems and AI products with measurable customer impact.',
  email: 'viljar@5xer.com',
  linkedin: 'https://www.linkedin.com/in/viljar-voidula',
  github: 'https://github.com/ViljarVoidula',
  location: 'Tallinn / Paide, Estonia',
  url: 'https://viltz.ee/'
};

export const contract = {
  bookingUrl: 'https://calendar.app.google/STKRNYDh7Mz8YtNWA',
  enquiryUrl: `mailto:${profile.email}?subject=${encodeURIComponent('Contract enquiry')}&body=${encodeURIComponent(
    'Hi Viljar,\n\nProject:\nTimeline:\nBudget range:\nHow you found me:\n'
  )}`,
  pitch:
    'I take on contract and fractional work where engineering, product and the business meet — usually when a team needs someone to set direction, design the system and stay through delivery and operations.',
  offers: [
    { title: 'Interim CTO & engineering leadership', body: 'Set priorities and ownership through a growth phase, and coach the team that carries it forward.' },
    { title: 'Architecture & platform', body: 'Distributed systems, GraphQL APIs, Kubernetes and AWS — designed to scale, observable and cost-aware.' },
    { title: 'Assignment & decisioning systems', body: 'Task-distribution, routing and matching engines that hold up at volume, with low latency and auditable decisions.' },
    {
      title: 'AI products & adoption',
      body: 'Find where LLM workflows actually pay off, build them with human review where mistakes are costly, and get the team using them.'
    },
    { title: 'Technical due diligence', body: 'The technical side of a funding round or acquisition — from either side of the table.' }
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
    title: 'Scale',
    body: 'Built Veriff’s task-assignment engine and helped scale it from 10,000 to 700,000+ sessions with sub-second distribution latency.'
  },
  {
    metric: '+8%',
    count: { to: 8, prefix: '+', suffix: '%' },
    title: 'Product results',
    body: 'Helped launch Miros’ AI search product, which beat Algolia in a customer A/B test and lifted conversion by approximately 8%.'
  },
  {
    metric: '99.999%',
    count: { to: 99.999, decimals: 3, suffix: '%' },
    title: 'Reliability and cost',
    body: 'Maintained five-nines availability for major retail customers while reducing AWS spend.'
  },
  {
    metric: '€2.5M',
    count: { to: 2.5, decimals: 1, prefix: '€', suffix: 'M' },
    title: 'Funding round',
    body: 'As interim CTO, led investor technical due diligence for a successful €2.5M round.'
  }
];

export const otherImpact: { title: string; body: string }[] = [
  {
    title: 'People and organisational leadership.',
    body: 'Led and coached engineers at Veriff; set company-wide engineering priorities as interim CTO at Miros.'
  },
  {
    title: 'Data platform.',
    body: 'Designed an Airbyte, Amazon RDS and BigQuery platform processing millions of events per hour.'
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
    title: 'Technical Contractor / Consultant',
    company: 'Veriff',
    where: 'Tallinn',
    dates: 'Oct 2025 – present',
    logo: '/images/logos/veriff.png',
    bullets: [
      'Own modernisation of the reviewer task-distribution system, from discovery to rollout, improving reliability, maintainability and operational flow.',
      'Work with engineering and product to turn recurring operational problems into scoped, prioritised improvements.',
      'Build and review Node.js microservices and GraphQL integrations; improve operational data for prioritisation and production diagnosis.'
    ]
  },
  {
    title: 'Founder & Technical Co-Founder',
    company: 'Fivexer',
    where: 'formerly Forgemaster AI · Remote',
    dates: 'Oct 2024 – present',
    logo: '/images/logos/fivexer.png',
    bullets: [
      'Led the pivot from a knowledge platform for code, documentation and AI assistants to an assignment engine for hybrid human and AI teams, based on customer discovery.',
      'Own product direction, architecture, full-stack delivery, LLM integrations, Kubernetes infrastructure and operations.',
      'Turn customer feedback into a prioritised roadmap; build rota planning, skills-based routing and auditable assignment decisions.'
    ]
  },
  {
    title: 'Interim CTO',
    company: 'Miros',
    where: 'Tallinn',
    dates: 'Jan – Aug 2024',
    logo: '/images/logos/miros.png',
    bullets: [
      'Set engineering priorities and ownership during a growth phase, aligning technical and product decisions with company goals.',
      'Launched the AI e-commerce search platform that delivered approximately 8% higher conversion in a customer A/B test against Algolia.',
      'Balanced availability, performance and cloud costs; maintained 99.999% availability for major retail customers while reducing AWS spend.',
      'Led investor technical due diligence for a successful €2.5M funding round.'
    ]
  },
  {
    title: 'Staff Engineer',
    company: 'Miros',
    where: 'Estonia',
    dates: 'Mar 2023 – Aug 2024',
    logo: '/images/logos/miros.png',
    bullets: [
      'Led the AWS migration and platform architecture for an AI product search engine running on Kubernetes.',
      'Refactored the backend behind a public GraphQL API, enabling product teams to deliver independently.',
      'Introduced OpenTelemetry observability, production metrics and shared on-call to improve operability.',
      'Designed an Airbyte, Amazon RDS and BigQuery data platform processing millions of events per hour.'
    ]
  },
  {
    title: 'Software Engineering Team Lead',
    company: 'Veriff',
    where: 'Tallinn',
    dates: 'Jan 2022 – Jan 2023',
    logo: '/images/logos/veriff.png',
    bullets: [
      'Led and developed engineers through 1:1s, direct feedback, mentoring, design reviews and delegated ownership.',
      'Built the task-assignment engine and helped scale distribution from 10,000 to 700,000+ sessions with sub-second latency.',
      'Designed a unified GraphQL gateway that decoupled neighbouring teams’ delivery; drove adoption of domain-driven design across engineering.'
    ]
  }
];

// Roles before 2022, shown as one-line entries.
export const earlierRoles: { title: string; meta: string; summary: string }[] = [
  {
    title: 'Solutions Architect',
    meta: 'Telia Eesti · 2019 – 2021',
    summary: 'Led IoT architecture for Tartu SmartEnCity; designed, developed and maintained a service delivery orchestration platform for MPLS services, covering IPAM integration, configuration parsing and provisioning.'
  },
  {
    title: 'Founder',
    meta: 'Testreel · 2014 – 2021',
    summary: 'Built and led the company across hiring, delivery, sales, customer relationships and partnerships; delivered multimedia products and exited successfully in 2021.'
  },
  {
    title: 'Network administrator → QA engineer',
    meta: 'Elion / Telia · 2011 – 2014',
    summary:
      'Tested Samsung and LG TV firmware and Telia’s TV application, and was Telia’s technical contact for both partners. The Samsung Smart TV app won the IFA 2012 Innovation award.'
  }
];

export const skills: { name: string; list: string }[] = [
  { name: 'People', list: 'Team leadership, hiring, coaching, career development, performance management, direct feedback' },
  { name: 'Delivery', list: 'Roadmap execution, prioritisation, cross-functional alignment, code and design reviews, CI/CD, GitHub Actions, GitLab CI, A/B testing' },
  { name: 'Backend & data', list: 'Node.js, TypeScript, distributed systems, microservices, API design, GraphQL, PostgreSQL, Redis, MongoDB, BigQuery, Airbyte' },
  { name: 'Cloud & operations', list: 'AWS, Kubernetes, Docker, Terraform, Pulumi, on-call, incident response, cost optimisation' },
  { name: 'Observability', list: 'OpenTelemetry, distributed tracing, Prometheus, Grafana, SigNoz, production metrics and alerting' },
  { name: 'AI', list: 'LLM applications and workflows, AI assistant integrations, MLOps, OpenAI, Anthropic, vector search' }
];

export const principles: { title: string; body: string }[] = [
  { title: 'Clear context and ownership', body: 'Connect work to customer outcomes and delegate meaningful decisions.' },
  { title: 'Practical execution', body: 'Make trade-offs visible, plan realistic increments and surface risks early.' },
  { title: 'Continuous improvement', body: 'Use feedback, design reviews and incident follow-up to improve systems.' }
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

export const talks = [
  {
    title: 'Don’t Panic!',
    event: 'Claude Code Meetup Tallinn',
    date: 'Early 2026',
    summary: 'An intro to AI coding agents for teams stuck with GitHub Copilot: what changes, where to start and what to watch out for.',
    url: 'https://youtu.be/eLcrLkdgcDE',
    thumbnail: '/images/talks/dont-panic.jpg'
  }
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
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    cover: '/images/books/brave-new-world.jpg',
    url: 'https://en.wikipedia.org/wiki/Brave_New_World'
  },
  {
    title: 'Steppenwolf',
    author: 'Hermann Hesse',
    cover: '/images/books/steppenwolf.jpg',
    url: 'https://en.wikipedia.org/wiki/Steppenwolf_(novel)'
  },
  {
    title: 'The Foundation series',
    author: 'Isaac Asimov',
    cover: '/images/books/foundation.jpg',
    url: 'https://en.wikipedia.org/wiki/Foundation_series'
  },
  {
    title: 'Thus Spoke Zarathustra',
    author: 'Friedrich Nietzsche',
    cover: '/images/books/thus-spoke-zarathustra.jpg',
    url: 'https://en.wikipedia.org/wiki/Thus_Spoke_Zarathustra'
  },
  {
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    cover: '/images/books/design-of-everyday-things.jpg',
    url: 'https://en.wikipedia.org/wiki/The_Design_of_Everyday_Things'
  },
  {
    title: 'The Wealth of Nations',
    author: 'Adam Smith',
    cover: '/images/books/wealth-of-nations.jpg',
    url: 'https://en.wikipedia.org/wiki/The_Wealth_of_Nations'
  },
  {
    title: '1984',
    author: 'George Orwell',
    cover: '/images/books/1984.jpg',
    url: 'https://en.wikipedia.org/wiki/Nineteen_Eighty-Four'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    cover: '/images/books/animal-farm.jpg',
    url: 'https://en.wikipedia.org/wiki/Animal_Farm'
  }
];

import { books, contract, earlierRoles, education, metrics, otherImpact, principles, profile, projects, roles, skills, talks } from './cv';

// Plain-text renderings of the CV for language models (served as /llms.txt and /llms-full.txt).

const absolute = (path: string) => new URL(path, profile.url).href;

const header = () => [
  `# ${profile.name}`,
  '',
  `> ${profile.title}, based in ${profile.location}. Available for contract and fractional work. ${profile.summary}`,
  '',
  `Name spelling: ${profile.name} (ASCII: Viljar Voidula). Website: ${profile.url}`
];

const contact = () => [
  '## Contact',
  '',
  `- Email: ${profile.email}`,
  `- Book a call: ${contract.bookingUrl}`,
  `- LinkedIn: ${profile.linkedin}`,
  `- GitHub: ${profile.github}`
];

const workWithMe = () => [
  '## Work with me',
  '',
  contract.pitch,
  '',
  ...contract.offers.map(offer => `- **${offer.title}:** ${offer.body}`),
  '',
  ...contract.terms.map(term => `- ${term.label}: ${term.value}${term.note ? ` (${term.note})` : ''}`)
];

export const llmsTxt = () =>
  [
    ...header(),
    '',
    ...workWithMe(),
    '',
    '## Selected impact',
    '',
    ...metrics.map(m => `- **${m.metric} — ${m.title}:** ${m.body}`),
    '',
    '## Pages',
    '',
    `- [CV (full text)](${absolute('/llms-full.txt')}): experience, skills, projects, talks and education in Markdown`,
    `- [CV homepage](${profile.url}): the same content as a web page`,
    ...talks.map(talk => `- [${talk.title} — ${talk.event}](${talk.url}): ${talk.summary}`),
    '',
    ...contact(),
    ''
  ].join('\n');

export const llmsFullTxt = () =>
  [
    ...header(),
    '',
    ...contact(),
    '',
    ...workWithMe(),
    '',
    '## Selected impact',
    '',
    ...metrics.map(m => `- **${m.metric} — ${m.title}:** ${m.body}`),
    ...otherImpact.map(item => `- **${item.title.replace(/\.$/, '')}:** ${item.body}`),
    '',
    '## Experience',
    '',
    ...roles.flatMap(role => [`### ${role.title} — ${role.company}`, '', `${role.dates} · ${role.where}`, '', ...role.bullets.map(b => `- ${b}`), '']),
    '### Earlier',
    '',
    ...earlierRoles.map(role => `- **${role.title}** (${role.meta}): ${role.summary}`),
    '',
    '## Skills',
    '',
    ...skills.map(group => `- **${group.name}:** ${group.list}`),
    '',
    '## How I work',
    '',
    ...principles.map(item => `- **${item.title}:** ${item.body}`),
    '',
    '## Earlier projects',
    '',
    ...projects.map(p => `- **${p.title}** (${p.years}; ${p.stack}): ${p.text}${p.link ? ` [${p.link.text}](${p.link.url})` : ''}`),
    '',
    '## Speaking',
    '',
    ...talks.map(talk => `- [${talk.title}](${talk.url}) — ${talk.event}, ${talk.date}. ${talk.summary}`),
    '',
    '## Education',
    '',
    ...education.map(item => `- ${item.name} — ${item.where}`),
    '',
    '## Personal',
    '',
    '- Languages: Estonian (native), English (proficient), German (low proficiency)',
    '- Licensed private pilot, PPL(A). Snowboarding for 18 years. Helped build the handmade log house that is home.',
    `- Books: ${books.map(book => `${book.title} (${book.author})`).join('; ')}`,
    ''
  ].join('\n');

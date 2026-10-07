import { contract, education, profile, skills, talks } from './cv';

const id = (fragment: string) => `${profile.url}#${fragment}`;

// schema.org graph for the CV page: the site, the profile page and the person it describes.
// Google reads ProfilePage + Person for knowledge panels; AI search engines use the same facts to answer "who is…".
export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': id('website'),
      url: profile.url,
      name: profile.name,
      inLanguage: 'en',
      publisher: { '@id': id('person') }
    },
    {
      '@type': 'ProfilePage',
      '@id': id('profile'),
      url: profile.url,
      name: `${profile.name} — CV`,
      isPartOf: { '@id': id('website') },
      mainEntity: { '@id': id('person') },
      dateModified: process.env.BUILD_DATE,
      inLanguage: 'en',
      primaryImageOfPage: { '@id': id('portrait') }
    },
    {
      '@type': 'Person',
      '@id': id('person'),
      name: profile.name,
      alternateName: 'Viljar Voidula',
      givenName: 'Viljar',
      familyName: 'Võidula',
      jobTitle: 'Senior Technical Product Manager',
      description: profile.summary,
      url: profile.url,
      email: `mailto:${profile.email}`,
      image: {
        '@type': 'ImageObject',
        '@id': id('portrait'),
        url: `${profile.url}images/viljar.jpg`,
        width: 800,
        height: 800,
        caption: `Portrait of ${profile.name}`
      },
      address: { '@type': 'PostalAddress', addressLocality: 'Tallinn', addressCountry: 'EE' },
      nationality: { '@type': 'Country', name: 'Estonia' },
      knowsLanguage: ['et', 'en', 'de'],
      worksFor: { '@type': 'Organization', name: 'Fivexer', url: 'https://5xer.com' },
      alumniOf: education.map(item => ({ '@type': 'EducationalOrganization', name: item.where.replace(/,.*$/, '') })),
      hasCredential: { '@type': 'EducationalOccupationalCredential', name: 'Private Pilot Licence, PPL(A)', credentialCategory: 'license' },
      knowsAbout: skills.flatMap(group => group.list.split(', ')),
      makesOffer: contract.offers.map(offer => ({
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        areaServed: 'Worldwide',
        itemOffered: { '@type': 'Service', name: offer.title, description: offer.body, provider: { '@id': id('person') } },
        priceSpecification: { '@type': 'UnitPriceSpecification', price: 1000, priceCurrency: 'EUR', unitText: 'day', valueAddedTaxIncluded: false }
      })),
      subjectOf: talks.map(talk => ({ '@type': 'CreativeWork', name: `${talk.title} — ${talk.event}`, url: talk.url, abstract: talk.summary })),
      sameAs: [profile.linkedin, profile.github]
    }
  ]
};

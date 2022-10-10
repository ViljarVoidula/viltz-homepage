import { useRouter } from 'next/router';

import { Container, Badge, Link, List, ListItem, SimpleGrid, UnorderedList, Heading, Center, Image } from '@chakra-ui/react';

import Layout from '../../components/layouts/article';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Title, WorkImage, Meta } from '../../components/work';
import Paragraph from '../../components/paragraph';
import { projects } from '../../lib/work-details';
import { NextSeo } from 'next-seo';
export default function Project() {
  const { query, isReady } = useRouter();
  if (!isReady || !query.work) return null;

  return (
    <Layout title={projects[query.work].title}>
      <NextSeo
        title={projects[query.work].title}
        description={projects[query.work].description}
        images={projects[query.work].sampleImages.map(image => ({
          url: `https://testreel-1.ams3.digitaloceanspaces.com/viltz.ee${image}`,
          alt: `${projects[query.work].technologies.join(' ')}`
        }))}
        robotsProps={{
          nosnippet: true,
          notranslate: true,
          noimageindex: true,
          noarchive: true,
          maxSnippet: -1,
          maxImagePreview: 'none',
          maxVideoPreview: -1
        }}
        canonical={`www.viltz.ee/work/${projects[query.work].title.trim().toLowerCase()}`}
      />
      <Container>
        <Title>
          {projects[query.work].title} <Badge align="center" mt={2}>{`${projects[query.work].startYear} - ${projects[query?.work]?.endYear ?? 'present'}`}</Badge>
        </Title>
        <Paragraph>{projects[query.work].description}</Paragraph>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Platform</Meta>
            <span>{projects[query.work].platforms.join(', ')}</span>
          </ListItem>
          <ListItem>
            <Meta>Tech</Meta>
            <span>{projects[query.work].technologies.join(', ')}</span>
          </ListItem>
        </List>
        {projects[query.work].sampleImages.map(image => {
          return <WorkImage src={`https://testreel-1.ams3.digitaloceanspaces.com/viltz.ee${image}`} alt={projects[query.work].title} key={`${image}`} />;
        })}
        {projects[query.work]?.links?.length ? (
          <>
            <Heading as="h4" fontSize={16} my={6}>
              <Center>Media coverage</Center>
            </Heading>
            <UnorderedList my={4}>
              {projects[query.work]?.links.map((link, i) => (
                <ListItem key={i}>
                  <Link key={link.url} href={`${link.url}`}>
                    {link.text}
                  </Link>
                </ListItem>
              ))}
            </UnorderedList>
          </>
        ) : null}
      </Container>
    </Layout>
  );
}

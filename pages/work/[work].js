import { useRouter } from 'next/router';

import { Container, Badge, Link, List, ListItem, SimpleGrid, UnorderedList, Heading, Center, Image } from '@chakra-ui/react';

import Layout from '../../components/layouts/article';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Title, WorkImage, Meta } from '../../components/work';
import Paragraph from '../../components/paragraph';
import { projects } from '../../lib/work-details';
export default function Project() {
  const { query, isReady } = useRouter();
  if (!isReady || !query.work) return null;

  return (
    <Layout title="Inkdrop">
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
        {projects[query.work].sampleImages.map(image => (
          <WorkImage src={`${process.env.OCULARURL}/resize/?url=http://${process.env.HOSTNAME}${image}&fit=inside&width=800&height=600`} alt={projects[query.work].title} key={`${image}`} />
        ))}
        {projects[query.work]?.links?.length ? (
          <>
            <Heading as="h4" fontSize={16} my={6}>
              <Center>Media coverage</Center>
            </Heading>
            <UnorderedList my={4}>
              {projects[query.work]?.links.map((link, i) =>(<ListItem key={i}><Link key={link.url} href={`${link.url}`}>{link.text}</Link></ListItem>))}
            </UnorderedList>
          </>
        ) : null}
      </Container>
    </Layout>
  );
}

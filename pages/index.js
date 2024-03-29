import { Box, Container, Heading, useColorModeValue, Link, Button, Image, Icon } from '@chakra-ui/react';
import { VscGithubInverted } from 'react-icons/vsc';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Section from '../components/section';
import Paragraph from '../components/paragraph';
import NextLink from 'next/link';
import { BioYear, BioSection } from '../components/bio';
import Layout from '../components/layouts/article';
import { DefaultSeo } from 'next-seo';

const Page = () => {
  return (
    <Layout>
      <Container>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'en_US',
            url: 'https://www.viltz.ee/',
            site_name: 'Viljar Võidula public CV'
          }}
        />
        <Box>
          <Image src={`/images/logo_1200${useColorModeValue('', '_inverted')}.png`} loading="lazy" alt="logo" mt={6} fallbackSrc={'/images/tail-spin.svg'} />
        </Box>
        <Box borderRadius="lg" bg={useColorModeValue('whiteAlpha.500')} p={3} mb={6} align="center">
          {'Hello, I am a software development enthusiast based in Estonia'}
        </Box>
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Viljar Võidula
            </Heading>
            <p>Digital artisan - Architect/Developer/QA </p>{' '}
          </Box>

          <Box flexShrink={0} mt={{ base: 4, md: 0 }} ml={{ md: 6 }} align="center">
            <Image
              // layout='fill'
              // objectFit="cover"
              width={100}
              height={100}
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              maxWidth="100px"
              display="inline-block"
              borderRadius="full"
              src="/images/viljar.jpg"
              fallbackSrc={'/images/tail-spin.svg'}
              alt="Profile image"
            />
          </Box>
        </Box>
        <Section delay={0.12}>
          <Heading as="h3" variant="section-title">
            Who am I?{' '}
          </Heading>
          <Paragraph>
            {`I have worked in various positions in the IT field for the past 10 years. My passion is building digital products and services from the design/planning stage all the way to the actual implementation. I'm most experienced with using the Javascript and Node.js ecosystem to build real-time APIs. What separates me from my competition is the fact that I have a deep understanding of the software development processes and best practices involved.`}
            {/* <NextLink href="/work"><Link>Portfolio</Link></NextLink> */}
          </Paragraph>
          <Box align="center" my={4}>
            <NextLink href="/work">
              <Button id={'portfolio'} rightIcon={<ChevronRightIcon />} colorScheme="teal">
                Portfolio
              </Button>
            </NextLink>
          </Box>
        </Section>
        <Section delay={0.24}>
          <Heading as="h3" variant="section-title">
            Where I come from?{' '}
          </Heading>
          <BioSection>
            <BioYear>1990</BioYear>Born in Paide, Estonia
          </BioSection>
          <BioSection>
            <BioYear>2010</BioYear>Graduated Kehtna School of Technology and Economics
          </BioSection>
          <BioSection>
            <BioYear>2011</BioYear>Started telecom industry career as Network monitoring Administrator in Elion Ettevõtted AS
          </BioSection>
          <BioSection>
            <BioYear>2012</BioYear>Changed positions and moved to TV department of Telia Estonia as a Software testing expert
          </BioSection>
          <BioSection>
            <BioYear>2012</BioYear>
            QA of world first IPTV <b>award winning</b> application on Samsung smartTV platform &nbsp;
            <Link href="https://www.strategyanalytics.com/zh/strategy-analytics/blogs/networks/residential-broadband/tv-broadband/2012/09/13/samsung-s-elion-tv-app-may-spell-doom-for-set-top-box-vendors-and-offer-hope-to-service-providers">
              Samsung’s Elion TV App May Spell Doom For Set-top Box Vendors, And Offer Hope to Service Providers
            </Link>
          </BioSection>
          <BioSection>
            <BioYear>2014</BioYear>Founded <b>Testreel</b> - a software testing and development service company
          </BioSection>
          <BioSection>
            <BioYear>2014</BioYear>Initial steps developing e2e test automation platform coding using <Link href="https://nodejs.org/en/">NodeJS</Link> &#38;{' '}
            <Link href="https://reactjs.org/"> React</Link>
          </BioSection>
          <BioSection>
            <BioYear>2017</BioYear>Published Gamestreams application on LG WebOS
          </BioSection>
          <BioSection>
            <BioYear>2019</BioYear>Worked as Solution Architect in Telia Estonia developing network configuration orchestration platform
          </BioSection>
          <BioSection>
            <BioYear>2022 to present</BioYear>Software development team lead in <Link href="https://www.veriff.com/">Veriff</Link>
          </BioSection>
        </Section>
        <Section delay={0.36}>
          <Heading as="h3" variant="section-title">
            {' '}
            My preferred stack{' '}
          </Heading>
          <Paragraph>React, NodeJS, Rust, SQLx, Docker, FeathersJS, Godot, K8, Jenkins, Nginx, Ubuntu, MongoDB, Redis, Nats.io, GraphQL</Paragraph>
          <Box align={'center'} my={4}>
            <Link href="https://github.com/ViljarVoidula">
              <Icon as={VscGithubInverted} w={10} h={10}></Icon>
              <p>Github</p>
            </Link>
          </Box>
        </Section>
        <Section delay={0.48}>
          <Heading as="h3" variant="section-title">
            Books I ♥
          </Heading>
          <Paragraph>
            <Link href="https://www.amazon.com/Emperors-Handbook-New-Translation-Meditations/dp/0743233832"> {`The Emperor's Handbook`}</Link>,
            <Link href="https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition"> {`The Pragmatic Programmer`}</Link>,
            <Link href="https://en.wikipedia.org/wiki/The_Innovator%27s_Dilemma"> {`The Innovator's Dilemma`}</Link>,
            <Link href="https://www.amazon.com/Mythical-Man-Month-Software-Engineering-Anniversary/dp/0201835959">
              {` Mythical Man-Month, The: Essays on Software Engineering`}
            </Link>
            ,<Link href="https://en.wikipedia.org/wiki/Brave_New_World"> {`Brave New World`}</Link>
          </Paragraph>
        </Section>
      </Container>
    </Layout>
  );
};

export default Page;

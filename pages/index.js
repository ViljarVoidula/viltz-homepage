import { Box, Container, Heading, Image, useColorModeValue, Link, Button } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Section from '../components/section';
import Paragraph from '../components/paragraph';
import NextLink from 'next/link';
import { BioYear, BioSection } from '../components/bio';
import Layout from '../components/layouts/article';
const Page = () => {
  return (
    <Layout>
      <Container>
        <Box>
            <Image src={'/images/logo_1200.png'}/>
        </Box>
        <Box borderRadius="lg" bg={useColorModeValue('whiteAlpha.500')} p={3} mb={6} align="center">
          {'Hello I am a software development enthusiast based in Estonia'}
        </Box>
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              Viljar Võidula
            </Heading>
            <p>Digital craftsman ( Architect/Developer/QA )</p>
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
              alt="Profile image"
            />
          </Box>
        </Box>
        <Section delay={0.12}>
          <Heading as="h3" variant="section-title">
            Who am I?{' '}
          </Heading>
          <Paragraph>
            {`I'm experienced engineer and development manager based in Tallinn Estonia. I have worked in various positions in the IT field past 10 years.
         I have passion for building digital products and services from planning to implementation of the product later. I'm most experienced within Javascript and Node.js ecosystem while building realtime API's. 
         What makes me is unique from my competition is the fact that I have very wide grap of technical aspects from infrastrcture to low level software development specifics.`}
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
            <BioYear>2011</BioYear>Started working as Network monitoring Administrator in Elion Ettevõtted AS
          </BioSection>
          <BioSection>
            <BioYear>2012</BioYear>Started working as Software testing expert in TV department of Telia Estonia
          </BioSection>
          <BioSection>
            <BioYear>2012</BioYear>
            {`QA of world first IPTV application on Samsung smartTV's`}{' '}
            <Link href="https://www.strategyanalytics.com/zh/strategy-analytics/blogs/networks/residential-broadband/tv-broadband/2012/09/13/samsung-s-elion-tv-app-may-spell-doom-for-set-top-box-vendors-and-offer-hope-to-service-providers">
              Samsung’s Elion TV App May Spell Doom For Set-top Box Vendors, And Offer Hope to Service Providers
            </Link>
          </BioSection>
          <BioSection>
            <BioYear>2014</BioYear>Founded <b>Testreel</b> - a software testing and development service company
          </BioSection>
          <BioSection>
            <BioYear>2014</BioYear>Started coding using Javascript and NPM
          </BioSection>
          <BioSection>
            <BioYear>2017</BioYear>Published Gamestreams application on LG WebOS
          </BioSection>
          <BioSection>
            <BioYear>2019</BioYear>Worked as Solution Architect in Telia Estonia
          </BioSection>
          <BioSection>
            <BioYear>2021 to present</BioYear>Working as freelancer and consultant
          </BioSection>
        </Section>
        <Section delay={0.36}>
          <Heading as="h3" variant="section-title">
            {' '}
            What kind of technical skills I have?{' '}
          </Heading>
          <Paragraph>Javascript, NodeJS, Rust, Docker, FeathersJS, Godot, K8, Jenkins, Nginx, Ubuntu, MongoDB, Redis, Nats.io, GraphQL</Paragraph>
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
            </Link>, 
            <Link href="https://en.wikipedia.org/wiki/Brave_New_World"> {`Brave New World`}</Link>
          </Paragraph>
        </Section>
      </Container>
    </Layout>
  );
};

export default Page;

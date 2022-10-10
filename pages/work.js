import { Container, Heading, Box, SimpleGrid, Divider } from '@chakra-ui/react';
import { WorkGridItem } from '../components/grid-item';
import Section from '../components/section';
import { NextSeo } from 'next-seo';

const Work = () => {
  return (
    <>
      <NextSeo
        title="Viljar Võidula - public portfolio"
        description="Collection of projects that were published, over the years I&#39;ve worked on many closed enterprise projects of which details I cannot disclose publicly."
        canonical="https://www.viltz.ee/work"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://www.viltz.ee/work',
          site_name: 'Viljar Võidula - public portfolio'
        }}
      />
      <Container>
        <Heading as="h3" fontSize={20} mb="4">
          Development
        </Heading>
        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section>
            <WorkGridItem id="gamestreams" title="Gamestreams" thumbnail={`/images/work/Gamestreams.png`}>
              Twitch client for LG WebOS
            </WorkGridItem>
          </Section>
          <Section>
            <WorkGridItem id="westbygg" title="Westbygg" thumbnail={'/images/work/Westbygg.png'}>
              Webpage of log cabin producer based in Estonia
            </WorkGridItem>
          </Section>
        </SimpleGrid>
        <Heading as="h3" fontSize={20} mb="4">
          Quality Assurance
        </Heading>
        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section>
            <WorkGridItem id="teliatv" title="Telia Connected TV" thumbnail={'/images/work/ConnectedTV.jpg'}>{`TV app for Samsung SmartTV's`}</WorkGridItem>
          </Section>
          <Section>
            <WorkGridItem id="minutv" title="Telia MinuTV" thumbnail={'/images/work/MinuTV.png'}>
              Telia Estonia Mobile OTT solution
            </WorkGridItem>
          </Section>
          <Section>
            <WorkGridItem id="simote" title="Simote" thumbnail={'/images/work/Simote.png'}>{`Simote IR blaster TV testing automation platform`}</WorkGridItem>
          </Section>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Work;

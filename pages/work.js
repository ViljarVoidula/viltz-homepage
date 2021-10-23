import { Container, Heading, Box, SimpleGrid, Divider } from '@chakra-ui/react';
import { WorkGridItem } from '../components/grid-item';
import Section from '../components/section';

import ConnectedTVImage from '../public/images/work/ConnectedTV.jpg';
import MinuTVImage from '../public/images/work/MinuTV.png';
import GameStreams from '../public/images/work/Gamestreams.png';
import WestbyggImage from '../public/images/work/Westbygg.png';
import Simote from '../public/images/work/Simote.png';
const Work = () => {
  return (
    <Container>
      <Heading as="h3" fontSize={20} mb="4">
        Development
      </Heading>
      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <WorkGridItem id="gamestreams" title="Gamestreams" thumbnail={GameStreams}>
            Twitch client for LG WebOS
          </WorkGridItem>
        </Section>
        <Section>
          <WorkGridItem id="westbygg" title="Westbygg" thumbnail={WestbyggImage}>
            Webpage of log cabin producer based in Estonia
          </WorkGridItem>
        </Section>
      </SimpleGrid>
      <Heading as="h3" fontSize={20} mb="4">
        Quality Assurance
      </Heading>
      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <WorkGridItem id="teliatv" title="Telia Connected TV" thumbnail={ConnectedTVImage}>{`TV app for Samsung SmartTV's`}</WorkGridItem>
        </Section>
        <Section>
          <WorkGridItem id="minutv" title="Telia MinuTV" thumbnail={MinuTVImage}>
            Telia Estonia Mobile OTT solution
          </WorkGridItem>
        </Section>
        <Section>
          <WorkGridItem id="simote" title="Simote" thumbnail={Simote}>{`Simote IR blaster TV testing automation platform`}</WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>
  );
};

export default Work;

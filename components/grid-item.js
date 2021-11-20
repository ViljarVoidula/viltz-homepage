import NextLink from 'next/link';
import { Box, Text, LinkBox, LinkOverlay, Image } from '@chakra-ui/react';
import { Global } from '@emotion/react';

export const GridItem = ({ children, href, title, thumbnail }) => {
  console.log(thumbnail)
  return (
    <Box w="100%" align="center">
      <LinkBox cursor="pointer">
        <Image src={`http://localhost:3030/resize?url=http://localhost:3000${thumbnail}`} alt={title} className="grid-item-thumbnail" placeholder="blur" loading="lazy" />
        <LinkOverlay href={href} target="_blank">
          <Text mt={2}>{title}</Text>
        </LinkOverlay>
        <Text fontSize={14}>{children}</Text>
      </LinkBox>
    </Box>
  );
};

export const WorkGridItem = ({ children, id, title, thumbnail }) => {
  console.log(thumbnail)
  return (
    <Box w="100%" textAlign="center">
      <NextLink href={`/work/${id}`}>
        <LinkBox cursor="pointer">
          <Image src={`http://localhost:3030/resize?url=http://localhost:3000${thumbnail}`} alt={title} className="grid-item-thumbnail" placeholder="blur" />
          <LinkOverlay href={`/work/${id}`}>
            <Text mt={2} fontSize={20}>
              {title}
            </Text>
          </LinkOverlay>
          <Text fontSize={14}>{children}</Text>
        </LinkBox>
      </NextLink>
    </Box>
  );
};

export const GridItemStyle = () => (
  <Global
    styles={`
        .grid-item-thumbnail {
          border-radius: 12px;
        }
      `}
  />
);

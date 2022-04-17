import NextLink from 'next/link';
import { Box, Text, LinkBox, LinkOverlay, Img, Skeleton, Image } from '@chakra-ui/react';
import { Global } from '@emotion/react';
export const GridItem = ({ children, href, title, thumbnail }) => {
  return (
    <Box w="100%" align="center">
      <LinkBox cursor="pointer">
        <Img src={`${process.env.OCULAR_URL}/resize?url=https://viltz.ee${thumbnail}`} alt={title} className="grid-item-thumbnail" loading="lazy" />
        <LinkOverlay href={href} target="_blank">
          <Text mt={2}>{title}</Text>
        </LinkOverlay>
        <Text fontSize={14}>{children}</Text>
      </LinkBox>
    </Box>
  );
};

export const WorkGridItem = ({ children, id, title, thumbnail }) => {
  return (
    <Box w="100%" textAlign="center">
      <NextLink href={`/work/${id}`}>
        <LinkBox cursor="pointer">
          <Image
            src={`${process.env.OCULAR_URL}/resize?url=https://viltz.ee${thumbnail}`}
            alt={title}
            className="grid-item-thumbnail"
            loading="lazy"
            fallback={<Skeleton width="480" height="320" isLoaded></Skeleton>}
            fallbackSrc={'/images/tail-spin.svg'}
          />
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

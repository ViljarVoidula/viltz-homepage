import NextLink from 'next/link';
import { Box, Text, LinkBox, LinkOverlay, Img, Skeleton, Image } from '@chakra-ui/react';
import { Global } from '@emotion/react';
export const GridItem = ({ children, href, title, thumbnail }) => {
  console.log('Thumb: ', thumbnail);
  return (
    <Box w="100%" align="center">
      <LinkBox cursor="pointer">
        <Img src={`https://testreel-1.ams3.cdn.digitaloceanspaces.com/viltz.ee/${thumbnail}`} alt={title} className="grid-item-thumbnail" loading="lazy" />
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
            src={`https://testreel-1.ams3.cdn.digitaloceanspaces.com/viltz.ee/${thumbnail}`}
            alt={title}
            className="grid-item-thumbnail"
            mt={5}
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

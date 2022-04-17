import NextLink from 'next/link';
import { Heading, Box, Link, Badge, Skeleton, Img, Image } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

export const Title = ({ children }) => (
  <Box>
    <NextLink href="/work">
      <Link>Work</Link>
    </NextLink>
    <span>
      {' '}
      <ChevronRightIcon />{' '}
    </span>
    <Heading display="inline-block" as="h3" fontSize={20} mb={4}>
      {children}
    </Heading>
  </Box>
);

export const WorkImage = ({ src, alt }) => (
  <Image
    borderRadius="lg"
    w="full"
    src={src}
    alt={alt}
    mb={4}
    loading="eager"
    // fallback={<Skeleton width="720" height="400" isLoaded></Skeleton>}
    fallbackSrc={'/images/tail-spin.svg'}
  />
);

export const Meta = ({ children }) => (
  <Badge colorScheme="green" mr={2}>
    {children}
  </Badge>
);

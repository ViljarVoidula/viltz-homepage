import NextLink from 'next/link';
import { Heading, Box, Link, Badge, Skeleton, Img } from '@chakra-ui/react';
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
  <Img borderradius="lg" w="full" src={src} alt={alt} mb={4} loading="lazy" fallback={<Skeleton width="720" height="400" isLoaded></Skeleton>} />
);

export const Meta = ({ children }) => (
  <Badge colorScheme="green" mr={2}>
    {children}
  </Badge>
);

import NextLink from 'next/link'
import { Heading, Box, Link, Badge } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Image from 'next/image'
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
)

export const WorkImage = ({ src, alt }) => (
  <Image borderradius="lg" w="full" src={src} alt={alt} mb={4} width="720" loading="lazy" height="400" />
)

export const Meta = ({ children }) => (
  <Badge colorScheme="green" mr={2}>
    {children}
  </Badge>
)
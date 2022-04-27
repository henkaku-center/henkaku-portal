import React from 'react'
import Image from 'next/image'
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleToggle = () => (isOpen ? onClose() : onOpen())

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      padding={6}
    >
      <Flex align='center' mr={5}>
        <Image
          className='block h-8 w-8'
          src='/henkaku.png'
          alt='Henkaku Logo'
          height={60}
          width={60}
        />
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems='center'
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Text>Home</Text>
        <Text>Quests</Text>
        <Text>Members</Text>
      </Stack>
    </Flex>
  )
}

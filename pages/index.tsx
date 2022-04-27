import { signIn, signOut, useSession } from 'next-auth/client'
import { chakra } from '@chakra-ui/react'
import { Center, VStack, Heading, Text, Box } from '@chakra-ui/react'
import Guilds from '../components/Guilds'

export default function Page() {
  const [session, loading] = useSession()

  return (
    <>
      {!session && (
        <VStack h={500} justify='center'>
          <Heading as='h1' size='4xl'>
            HENKAKU
          </Heading>
          <Text fontSize='5xl' color='rgba(120,120,120,0.8)'>
            Discord Community Portal
          </Text>

          <Box
            as='button'
            px={6}
            h={8}
            shadow='md'
            color='black'
            fontWeight='bold'
            borderRadius='full'
            bgGradient='linear(to-r, #6ee7b7, #60a5fa)'
            _hover={{
              bgGradient: 'linear(to-r,#a78bfa, #f59e0b)',
            }}
            onClick={signIn}
          >
            login
          </Box>
        </VStack>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={signOut}>Sign out</button>
          <Guilds></Guilds>
        </>
      )}
    </>
  )
}

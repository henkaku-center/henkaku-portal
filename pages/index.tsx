import { signIn, signOut, useSession } from 'next-auth/client'
import { VStack, Heading, Text, Button } from '@chakra-ui/react'
import Guild from '../components/guild'

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

          <Button
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
            onClick={() => signIn()}
          >
            login
          </Button>
        </VStack>
      )}
      {session && (
        <>
          <Guild></Guild>
          Signed in as {session.user.email} <br />
          <Button
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
            onClick={() => signOut()}
          >
            logout
          </Button>
        </>
      )}
    </>
  )
}

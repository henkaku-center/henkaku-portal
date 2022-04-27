import { signIn, signOut, useSession } from 'next-auth/client'
import Layout from './layout'

export default () => {
  const [session, loading] = useSession()

  return (
    <Layout>
      <div className='center'>{session.user.name}</div>
    </Layout>
  )
}

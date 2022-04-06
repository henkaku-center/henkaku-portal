import AppLayout from '@lib/components/Layouts/AppLayout'
import ProjectBanner from '@lib/components/ProjectBanner'
import { useSession, signIn } from 'next-auth/react'
import { useQuery } from 'react-query'
import superagent from 'superagent'

const Page = () => {
    const { status, data: session } = useSession({
        required: true,
    })

    const withSessionQuery = useQuery(
        ['with-session-example', session],
        async () => {
            console.log(session)
            const data = await superagent.get('/api/with-session-example')

            return data.body.content
        },
        {
            // The query will not execute until the session exists
            enabled: !!session,
        }
    )

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-neutral-600 text-center py-48">
                <h1>Loading or not authenticated...</h1>
            </div>
            )
    }

    console.log(withSessionQuery)

    if (!session) {
        return (
            <>
                <AppLayout title="Home">
                    <div className="my-6 p-2">
                        <h1>Access Denied</h1>
                        <h1>
                            <button type="button" onClick={() => signIn()}>
                                <a>Login</a>&nbsp;
                            </button>
                            to see a secret message
                        </h1>
                    </div>
                </AppLayout>
            </>
        )
    }

    return (
        <>
            <AppLayout title={session.user.name ?? session.user.email}>
                <div></div>
                <div className="text-center">
                    {withSessionQuery?.data && <p>{withSessionQuery.data}</p>}
                </div>
                <ProjectBanner />
            </AppLayout>
        </>
    )
}

export default Page

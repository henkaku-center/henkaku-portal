import AppLayout from '@lib/components/Layouts/AppLayout'
import { signIn } from "next-auth/react"
import { useSession } from 'next-auth/react'
import Loader from '@lib/components/Loader'
import Router from 'next/router'

const Page = () => {
    const { status, data: session } = useSession({
        required: false,
    })

    if (status === 'loading') {
        return <Loader />
    }

    if(session){
        Router.push('/home')
        return null
    }

    return (
        <>
            <div className="flex h-screen">
                <div className="m-auto text-center">
                    <div className="space-y-2">
                        <h1 className="text-8xl font-extrabold">HENKAKU</h1>
                        <h2 className="text-4xl font-light tracking-widest text-neutral-400">Discord Community Portal</h2>
                    </div>

                    <div className="my-6 p-2">
                        <button type="button" className="loginbtn" onClick={() => signIn()}>login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page


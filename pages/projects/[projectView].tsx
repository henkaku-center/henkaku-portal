import Link from "next/link";
import AppLayout from "@lib/components/Layouts/AppLayout";

export default function project(pageProps){
    return (
        <AppLayout title="">
            <div>
                {pageProps}
            </div>
        </AppLayout>
    )
}

export async function getStaticPaths() {

    const p = {params: null}

    return { paths: p, fallback: false }
}


export async function getStaticProps( context ) {

    const { params } = context;
    const pageProps = ""

    return { 
        props: pageProps
    };
}
import Link from "next/link";
import AppLayout from "@lib/components/Layouts/AppLayout";

export default function project(){
    return (
        <AppLayout title="">
            <div>
                {/* {pageProps} */}
                <h1>Project component</h1>
            </div>
        </AppLayout>
    )
}

// export async function getStaticPaths() {

//     const p = {params: null}

//     return { paths: p, fallback: false }
// }


// export async function getStaticProps( context ) {

//     const { params } = context;
//     const pageProps = ""

//     return { 
//         props: pageProps
//     };
// }
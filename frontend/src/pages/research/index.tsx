import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { parseCookies } from 'nookies'


const ResearchPage: NextPage = () => {
    return (<>
        <Head>
            <title>Lovyca | Research</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='container h-screen w-screen mx-10 md:mx-auto flex items-center justify-start'>
            <div className='flex flex-col gap-3'>
                <p className="font-sans"> Para começar seus servicos  </p>

                <span className='font-sans text-5xl w-10/12'>Encontre os seus serviços no catálogo Lovyca</span>
                <div className='relative mt-3 mb-3 items-center'>
                    <svg className="w-6 h-6 text-slate-500 absolute  right-16 md:right-24 top-2 hover:text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                    <input type="text" className="w-11/12 block text-sm text-gray-800 border-4 rounded-sm p-2 focus:outline-none focus:border-blue-400" placeholder='nome do serviço' />

                </div>

                <Link href="/servicos/novo">
                    <p className='text-indigo-800 underline hover:text-purple-600 '> Estou adicionando um serviço que não é ofertado na Lovyca</p>
                </Link>
            </div>

        </div>

    </>)
}

export default ResearchPage

export const getServerSideProps: GetServerSideProps = async (context: any) => {

    const { ['lovyca.uid']: uid } = parseCookies(context)

    if (!uid) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }


}
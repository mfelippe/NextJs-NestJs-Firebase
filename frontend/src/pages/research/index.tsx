import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { parseCookies } from 'nookies'
import { InputSearch } from '../../components/InputPesquisa';


const ResearchPage: NextPage = ({ servicos }: any) => {

    return (<>
        <Head>
            <title>Lovyca | Research</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='container h-screen w-screen mx-10 md:mx-auto flex items-center justify-start'>
            <div className='flex flex-col gap-3'>
                <p className="font-sans"> Para começar seus servicos  </p>

                <span className='font-sans text-5xl w-10/12'>Encontre os seus serviços no catálogo Lovyca</span>
                <InputSearch list={servicos} />

                <Link href="/servicos/novo">
                    <p className='text-indigo-800 underline hover:text-purple-600 '> Estou adicionando um serviço que não é ofertado na Lovyca</p>
                </Link>
            </div>

        </div>

    </>)
}

export default ResearchPage

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { ['lovyca.uid']: uid } = parseCookies(context)

    if (!uid) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    try {
        const response = await fetch(`http://localhost:3001/lovyca-services/${uid}`)
        const data = await response.json()
        console.log(data)
        return {
            props: {
                servicos: data
            }
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
                servicos: null
            }
        }
    }


}

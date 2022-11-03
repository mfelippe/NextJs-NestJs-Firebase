import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { parseCookies } from 'nookies'

export default function Curadoria({ servicos }: any) {
    const showServices = !!servicos

    return (<>

        <div className="bg-gray-200 h-50 shadow-md">
            <div className="container mx-10 md:mx-auto w-screen ">
                <div className='pt-2'>
                    <Link href="/research">
                        <svg className="w-6 h-6 hover:text-gray-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </Link>
                </div>
                <div className='flex flex-col mt-5 md:ml-10'>
                    <h1 className='font-sans text-2xl font-semibold'>Buscar serviços</h1>
                    <p className='text-sm mt-2'>Encontre um serviço adicionado</p>
                    <div className='relative  mb-3 items-center'>
                        <svg className="w-6 h-6 text-slate-500 absolute  right-16 md:right-32 top-2 hover:text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>

                        <input type="text" className="w-11/12 block text-sm text-gray-800 border-4 rounded-sm p-2 focus:outline-none focus:border-blue-400" placeholder='nome do serviço' />

                    </div>
                </div>
            </div>

        </div>
        <div className='container h-full w-screen mx-10 md:mx-auto'>
            <div className='mt-2'>
                <table className='w-full divide-y-2 divide-gray-100'>
                    <thead className='border-solid border-t-2 border-gray-100 '>
                        <tr>
                            <th className='header-table'>Nome do serviço</th>
                            <th className='header-table'>Categoria</th>
                            <th className='header-table'>Data</th>
                            <th className='header-table'>Status</th>
                            <th className='header-table'>Preço</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y-2 divide-gray-100'>
                        {showServices && (<>
                            {servicos.map((serv: any) => (

                                <tr key={serv.name} className='table-line'>

                                    <td className='info'>
                                        <Link href={`/servicos/${serv.id}`}>
                                            {serv.name}
                                        </Link>
                                    </td>
                                    <td>
                                        {serv.category}
                                    </td>
                                    <td>
                                        dd/yy/aaaa
                                    </td>
                                    <td>
                                        ATIVO
                                    </td>
                                    <td>
                                        {serv.price.toLocaleString("pt-br", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </td>
                                </tr>


                            ))}

                        </>)}
                    </tbody>

                </table>
            </div>

        </div>

    </>)
}


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
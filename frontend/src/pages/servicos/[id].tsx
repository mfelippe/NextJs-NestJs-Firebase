import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Router, { useRouter } from 'next/router'
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from "react-toastify";
import { setTimeout } from "timers";
import { AuthContext } from "../../contexts/AuthContext";
import { useApi } from "../../services/api";
import { MOEDA, moneyMask, NUMBER_MONEY } from "../../services/mascaras";
import { Servicos } from "../../types/Servicos";
import { parseCookies } from 'nookies'

const Servicos: NextPage = ({ servico, uid }: any) => {
    const { query } = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<Servicos>({
        defaultValues: {
            name: servico?.name ?? '',
            category: servico?.category ?? 'CIVIL',
            description: servico?.description ?? '',
            price: MOEDA(servico?.price) ?? '',
            warranty: servico?.warranty ?? 30,
        }
    })
    const [typeRender, SetTypeRender] = useState(!!servico)
    const [disable, setDisable] = useState(false)
    const { atualizarServico, cadastrarServico } = useApi()

    const onSubmit: SubmitHandler<Servicos> = async (data) => {
        data.price = Number(NUMBER_MONEY(String(data.price)))
        data.uid = uid as string
        if (typeRender) {
            const { id } = query
            const service = await atualizarServico(id as string, data)
            if (service) {
                toast.success('Serviço atualizado com sucesso!')
                setTimeout(() => {
                    Router.push("/servicos")
                }, 1000)
            } else {
                toast.error('Ocorreu um erro !')
                return
            }
        } else {
            const service = await cadastrarServico(data)
            if (service) {
                toast.success('Serviço cadastrado com sucesso!')
                setTimeout(() => {
                    Router.push("/servicos")
                }, 1000)
            } else {
                toast.error('Ocorreu um erro !')
                return
            }
        }

    };


    return (<>
        <div className="bg-gray-200 h-24 shadow-md">
            <div className="container mx-10 w-screen md:mx-auto'">
                <div className='pt-5 flex flex-row gap-3 items-center'>
                    <Link href="/research">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:text-gray-500 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </Link>
                    <p className="text-2xl"> John Doe</p>
                </div>
                <div className='w-full flex justify-end'>
                    <h1 className='bg-yellow-500 py-1 w-72 text-center border-r-8 text-sm'>Vamos começar a sugir um serviço.</h1>

                </div>
            </div>

        </div>
        <div className='container h-full w-screen mx-10 md:mx-auto'>
            <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-4">
                    <div className='col-span-2'>
                        <label className="block text-sm font-medium text-gray-700">Nome do serviço</label>
                        <input type="text" className="input-service"  {...register('name', {
                            required: true
                        })} />
                    </div>
                    <div className='col-span-1'>
                        <label className="block text-sm font-medium text-gray-700">Preço do Serviço</label>
                        <input type="text" className="input-service"  {...register('price', {
                            required: true,
                            onChange: (e) => {
                                const { value } = e.target
                                e.target.value = moneyMask(value);
                            }
                        })} />
                    </div>
                    <div className='col-span-2'>
                        <label className="block text-sm font-medium text-gray-700">Categoria</label>
                        <select className="input-service" {...register('category', {
                            required: true
                        })}>
                            <option value="CIVIL">CIVIL</option>
                            <option value="HIDRÁULICA">HIDRÁULICA</option>
                            <option value="ELÉTRICA">ELÉTRICA</option>
                        </select>
                    </div>
                    <div className='col-span-1'>
                        <label className="block text-sm font-medium text-gray-700">Garantia</label>
                        <select className="input-service" {...register('warranty', {
                            required: true
                        })} >
                            <option value={30}>30 dias </option>
                            <option value={60}>60 dias</option>
                            <option value={90}>90 dias </option>
                        </select>
                    </div>

                    <div className='col-span-3'>
                        <label className="block text-sm font-medium text-gray-700">Descrição do serviço</label>
                        <textarea className="bg-gray-200 w-full rounded-md px-3 py-2 text-base font-semibold focus:outline-none border-2 focus:border-blue-400" {...register('description', {
                            required: true
                        })} />
                    </div>


                </div>
                <div className="w-full flex justify-end mt-10">

                    <button className="bg-green-500 text-white text-lg font-bold font-sans px-10 py-2 rounded-lg cursor-pointer hover:bg-orange-400  disabled:bg-slate-400" type="submit" disabled={disable}> {typeRender ? 'Atualizar Serviço' : 'Cadastrar Serviço'} </button>


                </div>

            </form>

        </div>




    </>)
}

export default Servicos

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

    try {
        const response = await fetch(`http://localhost:3001/lovyca-services/id/${context.params.id}`)
        const data = await response.json()
        return {
            props: {
                servico: data,
            }
        }
    } catch (error) {
        return {
            props: {
                uid: uid,
                servico: null
            }
        }
    }
}
import React, { useState } from "react"
import Link from "next/link"
import { Servicos } from "../types/Servicos"

export const InputSearch = (props: any) => {

    const [showResult, setShowResult] = useState(false)
    const [pesquisa, setPesquisa] = useState<string | null>('')
    const [resultado, setResultado] = useState<Servicos[] | null>()

    const handleSearch = (value: string) => {
        setShowResult(false)
        setPesquisa(value)
        setResultado([])
        let res: Servicos[] = []

        if (props.list.length < 1) {
            return
        }
        else if (!pesquisa) {
            setShowResult(false)
            return
        } else if (pesquisa.length < 1) {
            setShowResult(false)
            return
        }

        props.list.filter((item: Servicos) => item.name.toLowerCase().includes(pesquisa.toLocaleLowerCase())).forEach((item: Servicos) => res.push(item))

        setResultado(res)

        if (resultado) {
            setShowResult(true)
        }
    }
    return (
        <div className='relative mt-3 mb-3 items-center'>
            <svg className="w-6 h-6 text-slate-500 absolute  right-16 md:right-28 top-2 hover:text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input type="text" className="w-11/12 block text-sm text-gray-800 border-4 rounded-sm p-2 focus:outline-none focus:border-blue-400"
                placeholder='nome do serviço' onChange={(e: any) => handleSearch(e.target.value)} />
            {showResult && (
                resultado?.map(res => (<Link href={`/servicos/${res.id}`}><p>{res.name}</p></Link>))
            )
            }
        </div>)
}
import type { NextPage } from 'next'
import Router from 'next/router'
import { authentication } from '../../services/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import Head from 'next/head'
import { useState } from 'react'

const AuthPage: NextPage = () => {
    const [phoneNumber, setPhoneNumber] = useState("+55")
    const codeSender = ''
    const [code, setCode] = useState<any>('')
    const [sendCode, setSendCode] = useState<Boolean>(false)

    const generateRecaptch = () => {

        window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-contaier", {
            'callback': (response: any) => {
                console.log(response)
            }
        }, authentication)
    }
    const requestCode = (e: any) => {
        e.preventDefault();
        generateRecaptch()

        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(authentication, phoneNumber, appVerifier).then((confimationResult => {
            console.log(confimationResult)

            window.confirmationResult = confimationResult
            setSendCode(true)
        })).catch((err) => {
            console.log(err)
        })
    }

    const verifierCode = () => {
        //@ts-ignore
        let confirmationResult = window.confirmationResult
        //@ts-ignore
        confirmationResult.confirm(code).then(result => {
            console.log(result.user)
            Router.push('/')
            //@ts-ignore
        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <>
            <Head>
                <title>Lovyca | LOGIN</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="grid grid-cols-1 lg:grid-cols-2">

                <div className="lg:min-h-screen lg:flex lg:items-center p-8 sm:p-12">
                    <div className="flex-grow">
                        <h1 className='text-slate-600 font-bold text-center text-2xl sm:text-7xl'>Lovyca</h1>
                    </div>
                </div>
                <div className='lg:min-h-screen lg:flex lg:items-center p-12 lg:p-24'>
                    <div className='flex-grow bg-slate-500 shadow-xl p-12'>

                        <form className="space-y-6" onSubmit={requestCode}>
                            {sendCode ? <>

                                <input type="text" placeholder='Código de Verificação' value={code} onChange={(e) => setCode(e.target.value)} className='block w-full h-16 rounded-md border-gray-300 pl-7 pr-12 sm:text-lg mb-3' />
                                <button onClick={verifierCode} className='flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-8 py-3 text-xl font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-l'> Verificar </button>

                            </> : <>
                                <input type="text" placeholder='Celular' name='celular' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='block w-full h-16 rounded-md border-gray-300 pl-7 pr-12 sm:text-lg mb-3' />
                                <button className='flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-8 py-3 text-xl font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-l'> Entrar </button>
                                <div id="recaptcha-contaier" className="justify-center flex">

                                </div>
                            </>}
                        </form>

                    </div>
                </div>

            </main>


        </>
    )
}

export default AuthPage

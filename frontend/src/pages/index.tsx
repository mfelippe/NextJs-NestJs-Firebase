import type { NextPage } from 'next'
import { app } from '../services/firebase'
import *  as firebase from 'firebase/auth'
import Head from 'next/head'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { User } from '../types/User'

const AuthPage: NextPage = () => {
    const { signin } = useContext(AuthContext)
    const auth = firebase.getAuth(app)
    const [phoneNumber, setPhoneNumber] = useState("+55")
    const [code, setCode] = useState<any>('')
    const [error, setError] = useState<Boolean>(false)
    const [sendCode, setSendCode] = useState<Boolean>(false)

    const generateRecaptch = async () => {
        try {

            window.recaptchaVerifier = new firebase.RecaptchaVerifier('sign-in-button', {
                'size': 'normal',
                'callback': (response: any) => {
                }
            }, auth)

        }
        catch (err) {
            console.log(err)
        }
    }
    const requestCode = async (e: any) => {
        e.preventDefault();
        /*
        const user: User = {
            number: '61993153532',
            uid: '123123123'
        }
        signin(user, 'result.user.111123')*/
        //@ts-ignore
        generateRecaptch()
        let appVerifier = window.recaptchaVerifier;
        firebase.signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((confimationResult => {
            console.log("código enviado ...")
            window.confirmationResult = confimationResult
            setSendCode(true)
        })).catch((err) => {
            console.log(err)
        })
    }

    const verifierCode = () => {

        let confirmationResult = window.confirmationResult
        //@ts-ignore
        confirmationResult.confirm(code).then(result => {
            console.log(result.user)
            const user: User = {
                number: result.user.phoneNumber,
                uid: result.user.uid
            }
            signin(user, result.user.acessToken)

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


                        {sendCode ? <>

                            <input type="text" placeholder='Código de Verificação' value={code} onChange={(e) => setCode(e.target.value)} className={error ? `block w-full h-16 rounded-md border-red-600 pl-7 pr-12 sm:text-lg mb-3` : `block w-full h-16 rounded-md border-gray-300 pl-7 pr-12 sm:text-lg mb-3`} />
                            <button onClick={verifierCode} className='flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-8 py-3 text-xl font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-l'> Verificar </button>

                        </> : <>
                            <form className="space-y-6" onSubmit={requestCode}>
                                <input type="text" placeholder='Celular' name='celular' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='block w-full h-16 rounded-md border-gray-300 pl-7 pr-12 sm:text-lg mb-3' />
                                <button className='flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-8 py-3 text-xl font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-l'> Entrar </button>

                                <div id="sign-in-button" className="justify-center flex">

                                </div>

                            </form>
                        </>}


                    </div>
                </div>

            </main>


        </>
    )
}

export default AuthPage

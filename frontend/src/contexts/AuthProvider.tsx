import Router from "next/router"
import { useEffect, useState } from "react"
import { User } from "../types/User"
import { AuthContext } from "./AuthContext"
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import *  as firebase from 'firebase/auth'
import { app } from "../services/firebase"


export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<String | null>(null)
    const [uid, setUid] = useState<String | null>(null)

    useEffect(() => {
        const { 'lovyca.token': token } = parseCookies()
        setToken(token)
        const { 'lovyca.uid': uid } = parseCookies()
        setUid(uid)
    }, [])

    const signin = (user: User, token: string) => {
        console.log('to logando')

        console.log(token)

        if (!token) {
            return
        }
        setCookie(undefined, 'lovyca.token', token, {
            maxAge: 60 * 60 * 1 // 1hora 
        })
        setToken(token)
        setCookie(undefined, 'lovyca.uid', user.uid, {
            maxAge: 60 * 60 * 1 // 1hora 
        })
        setUid(user.uid)
        setUser(user)
        Router.push("/research")
    }

    const sigout = () => {
        const auth = firebase.getAuth(app);

        firebase.signOut(auth).then(() => {
            setUser(null)
            setToken(null)
            setUid(null)
            destroyCookie(null, 'lovyca.token')
            destroyCookie(null, 'lovyca.uid')

        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <AuthContext.Provider value={{ user, signin, sigout }}>
            {children}
        </AuthContext.Provider>
    )
}
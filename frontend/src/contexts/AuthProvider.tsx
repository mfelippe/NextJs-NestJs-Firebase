import Router from "next/router"
import { useState } from "react"
import { User } from "../types/User"
import { AuthContext } from "./AuthContext"


export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [user, setUser] = useState<User | null>(null)

    const signin = (user: User, token: string) => {

        if (!token) {
            return
        }
        setUser(user)
        Router.push("/research")
    }
    const sigout = () => { }

    return (
        <AuthContext.Provider value={{ user, signin, sigout }}>
            {children}
        </AuthContext.Provider>
    )
}
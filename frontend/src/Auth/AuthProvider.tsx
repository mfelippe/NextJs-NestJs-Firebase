import { useState } from "react"
import { User } from "../types/User"
import { AuthContext } from "./AuthContext"


export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [user, setUser] = useState<User | null>(null)

    const sigin = () => { }
    const signin = () => { }
    const sigout = () => { }

    return (
        <AuthContext.Provider value={{ user, signin, sigout }}>
            {children}
        </AuthContext.Provider>
    )
}
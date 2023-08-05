import { createContext, useState,useEffect } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: () => { }
})
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(()=>{
        const loginInfo=localStorage.getItem('isLoggedIn')
        if(loginInfo=='1'){
          setIsLoggedIn(true)
        }
      },[])
    const loginHandler = () => {
        localStorage.setItem('isLoggedIn','1')

        setIsLoggedIn(true)
    }
    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')

        setIsLoggedIn(false)
    }
    return <AuthContext.Provider value={{isLoggedIn:isLoggedIn,onLogout:logoutHandler,onLogin:loginHandler}}>{props.children}</AuthContext.Provider>
}
export default AuthContext;
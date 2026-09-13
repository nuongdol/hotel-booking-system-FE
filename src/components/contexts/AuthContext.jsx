import { createContext, useContext, useState, useEffect} from "react";
import {authService} from '../utils/auth/authService.js'
import { setAccessToken, clearAccessToken } from "../utils/token/tokenStore.js";

const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //reload -> accessToken mat -> dung refreshToken cookie de lay lai
    useEffect(()=>{
        const bootstrap = async() =>{
            try{
                const data = await authService.refresh();
                setAccessToken(data.accessToken);
            }catch(err){
                clearAccessToken();
            }finally{
                setLoading(false);
            }
        };
        bootstrap();
    }, []);

    const login = async(email, password) => {
        const response = await authService.login(email, password);
        const {user, accessToken} = response.data.data;

        setAccessToken(accessToken);
        setUser(user);
        return user;
    };

    const register = async (firstName, lastName, phone, address, email, password) =>{
        const response = await authService.register(firstName, lastName, phone, address, email, password);
        return response.data.data;
    };

    const value = {
        user,
        loading,
        login,
        register,
        isLoggedIn: !!user,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth phải dùng trong <AuthProvider>');
    }
    return context;
}
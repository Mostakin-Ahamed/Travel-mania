import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://travel-mania-server.vercel.app'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function(error){
        return Promise.reject(error)
    })

    // intercepts 410 and 403 status
    axiosSecure.interceptors.response.use(function(response){
        return response;
    },async (error)=>{
        const status = error.response.status;
        console.log(('status error in the interceptor', status));
        if(status === 401 || status ===403){
            await logout();
            navigate('/login')
        }
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;
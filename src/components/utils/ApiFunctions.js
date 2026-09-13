import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "./token/tokenStore";


export const api = axios.create({
    baseURL: "http://localhost:9192/api/v1",
    withCredentials: true, //auto send and reciever cookie
    headers: {
        'Content-Type':'application/json',
    }
});

// axios refreshToken, tránh interceptor loop vô hạn
const refreshApi = axios.create({
    baseURL: "http://localhost:9192/api/v1",
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json'
    },
});

//accessToken vào mọi request
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if(token && !config.skipAuth){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// tự động refresh -> retry request cũ
let isRefreshing = false;
let failedQueue = [];// các request bị 401 trong lúc refresh

const processQueue = (error, token = null) =>{
    failedQueue.forEach((promise)=>{
        if(error){
            promise.reject(error);
        }else{
            promise.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) =>{
        const originalRequest = error.config;

        if(error.respons?.status !== 401){
            return Promise.reject(error);
        }
        //refresh roi ma van 401 -> logout
        if(originalRequest._retry){
            return Promise.reject(error);
        }
        //khong refresh url /auth/refresh
        if(originalRequest.url?.includes('/auth/refresh-token')){
            return Promise.reject(error);
        }
        //dang refresh -> wait queue
        if(isRefreshing){
            return new Promise((resolve, reject)=>{
                failedQueue.push({resolve, reject});
            })
            .then((newToken) =>{
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }
        //bat dau refresh
        originalRequest._retry = true;
        isRefreshing = true;
        try{
            const response = await refreshApi.post('/auth/refresh-token');
            const newToken = response.data.accessToken;
            setAccessToken(newToken);
            processQueue(null, newToken);
            //retry request cu vs token moi
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
        }catch(refreshError){
            //refresh that bai-> logout
            processQueue(refreshError, null);
            clearAccessToken();

            // Phát event để AuthContext biết mà set user = null
            window.dispatchEvent(new Event('auth:logout'));
            return Promise.reject(refreshError);
        }finally{
            isRefreshing = false;
        }
    }
);


/*lấy thành phố du lịch */
export async function getCitys(){
    try{
        const response = await api.get("/city");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching cities:", error.message);
        throw new Error("Failed to fetch cities");
    }
}
/*lấy danh sách vouchers */
export async function getVouchers(){
    try{
        const response = await api.get("/voucher");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching vouchers:", error.message);
        throw new Error("Failed to fetch vouchers");
    }
}
/* Tìm kiếm phòng theo thành phố và ngày check-in, check-out, số lượng khách đặt*/  
export async function searchRooms(city, checkInDate, totalNights, adults, childrend, rooms) {
    try {
        const response = await api.get(`/rooms/research?city=${city}&checkInDate=${checkInDate}&totalNights=${totalNights}&adults=${adults}&childrend=${childrend}&rooms=${rooms}`);
        return response.data.data;
    } catch (error) {
        console.error("Error searching rooms:", error.message);
        throw new Error("Failed to search rooms");
    }
}
/* Lấy danh sách thành phố*/
export async function getCities() {
    try {
        const response = await api.get("/city");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching cities:", error.message);
        throw new Error("Failed to fetch cities");
    }
}











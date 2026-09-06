import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9192/api/v1"
})

export const getHeader = ()=>{
    const token = localStorage.getItem("token");
    return {
        Authorization : `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

/*this functiong adds a new room room to the database  */
export async function addRoom(imageRoom, roomType, roomPrice,isBook) {
    const formData = new FormData();
    formData.append("imageRoom", imageRoom)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)
    formData.append("isBook", isBook)

    const response = await api.post("/rooms", formData)
    if (response.status === 201) {
        return true
    } else {
        return false
    }
}

/* this function gets all room types from the database*/
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/type");
        return response.data;

    } catch (error) {
        throw new Error("Error fetching room types.")

    }
}

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











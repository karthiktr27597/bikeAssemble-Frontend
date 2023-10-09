import axios from "axios";

const url = "https://bikeassembleapp-backend.onrender.com/employee"


export const employeeLogin = async (payload) => {
    return await axios.post(`${url}/login`, payload);
}

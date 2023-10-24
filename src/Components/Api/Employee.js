import axios from "axios";

const url = "https://bikeassembleapp-backend.onrender.com/employee"

// const url = "http://localhost:9000/employee"


export const employeeLogin = async (payload) => {
    return await axios.post(`${url}/login`, payload);
}

export const employeeLogout = async (payload) => {
    return await axios.post(`${url}/logout`, payload);
}


  
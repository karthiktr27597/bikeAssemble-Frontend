import axios from "axios";

const url = "https://bikeassembleapp-backend.onrender.com"

// const url = "http://localhost:9000"


export const adminLogin = async (payload) => {
    return await axios.post(`${url}/adminlogin`, payload);
}

export const getData = async (selectedEmployee, startDate, endDate, username, config) => {
    return await axios.post(`${url}/admin/reports?employee=${selectedEmployee}&start=${startDate}&end=${endDate}`, username, config)
}




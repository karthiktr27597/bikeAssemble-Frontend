import React, { useEffect, useState } from 'react';
import { getData } from '../Api/Admin';
import { useNavigate } from 'react-router-dom';
import "./AdminPanel.css";

const AdminPanel = () => {
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();


    const getAuthentication = async () => {
        const token = await localStorage.getItem("token");
        if (!token) {
            alert("please login to contionue");
            navigate("/admin")
        }
    }

    useEffect(() => {
        getAuthentication();
    })

    const handleFetchReports = async () => {
        try {
            const token = await localStorage.getItem("token");
            const username = await localStorage.getItem("username");
            const config = { headers: { "x-auth-token": token } }
            const response = await getData(selectedEmployee, startDate, endDate, username, config)
            setReports(response.data);
            console.log("reports", response.data)
        } catch (err) {
            if (err.response.data.message === "Invalid Authorization") {
                alert("Please login to continue");
                navigate("/admin")
            }
        }
    };

    return (
        <div className="container">
            <h2>Admin Panel</h2>
            <div>
                <label className="label">Select Employee:</label>
                <select
                    className="select-input"
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                    <option value="">Select Employee</option>
                    <option value="100">Employee 1</option>
                    <option value="101">Employee 2</option>
                    <option value="102">Employee 3</option>
                    <option value="103">Employee 4</option>
                    <option value="104">Employee 5</option>
                </select>
            </div>
            <div>
                <label className="label">Start Date:</label>
                <input
                    type="date"
                    className="date-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div>
                <label className="label">End Date:</label>
                <input
                    type="date"
                    className="date-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <button className="button" onClick={handleFetchReports}>Fetch Reports</button>
            {reports.length > 0 && (
                <div>
                    <h3 className='countReport'>Reports</h3>
                    <ul>
                        <li className='text-success'>Employee Id: <strong>{reports[0].employeeId}</strong></li>
                        <li className='text-success'>Assembled Bikes: <strong>{reports.length}</strong></li>
                    </ul>
                </div>
            )}
        </div>
    )

}

export default AdminPanel;

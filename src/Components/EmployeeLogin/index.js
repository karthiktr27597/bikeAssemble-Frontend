import React, { useState } from 'react';
import './EmployeeLogin.css';
import { employeeLogin } from '../Api/Employee';

const EmployeeLogin = () => {
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedBike, setSelectedBike] = useState('');
    const [loginTime, setLoginTime] = useState(null);
    const [logoutTime, setLogoutTime] = useState(null);
    const [duration, setDuration] = useState('');

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const loginData = {
                employeeId: selectedEmployee,
                bike: selectedBike,
                duration: duration,
            }

            const response = await employeeLogin(loginData)

           // console.log('Login recorded:', response.data);
            const dateObjectIn = new Date(response.data.log.loginTime);
            const indianTimeIn = dateObjectIn.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
            setLoginTime(indianTimeIn);

            const dateObjectOut = new Date(response.data.log.logoutTime);
            const indianTimeOut = dateObjectOut.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
            setLogoutTime(indianTimeOut);

        } catch (err) {
            console.error('Error recording login:', err);
        }
    };

    const onChangeBike = (e) => {
        setSelectedBike(e.target.value)
        setDuration(e.target.options[e.target.selectedIndex].getAttribute('time'));
    }

    return (
        <div className='employeeLogin'>
            <div className="container">
                <h2>Employee Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="employeeSelect">Select Employee:</label>
                        <select
                            id="employeeSelect"
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
                    <div className="form-group">
                        <label htmlFor="bikeSelect">Select Bike:</label>
                        <select
                            id="bikeSelect"
                            value={selectedBike}
                            time={duration}
                            onChange={(e) => onChangeBike(e)}
                        >
                            <option value="" time="">Select Bike</option>
                            <option value="KTM" time="50">KTM</option>
                            <option value="Honda" time="60">Honda</option>
                            <option value="Activa" time="45">Activa</option>
                            <option value="Fascino" time="40">Fascino</option>
                            <option value="Hero" time="30">Hero</option>
                        </select>
                    </div>
                    {loginTime ? "" : <button type="submit">Login</button>}
                </form>

                {loginTime && (
                    <div className="time-recorded">
                        <h6 className='text-success'><strong>Login Time: </strong>{loginTime}</h6>
                        <h6 className='text-danger'><strong>Logout Time:</strong> {logoutTime}</h6>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeLogin;

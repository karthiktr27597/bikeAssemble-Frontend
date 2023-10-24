import React, { useEffect, useState } from 'react';
import './EmployeeLogin.css';
import { employeeLogin, employeeLogout } from '../Api/Employee';

const EmployeeLogin = () => {
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedBike, setSelectedBike] = useState('');
    const [loginTime, setLoginTime] = useState(null);
    const [logoutTime, setLogoutTime] = useState(null);
    const [duration, setDuration] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('employee')) {
            setSelectedEmployee(localStorage.getItem('employee'))
            setSelectedBike(localStorage.getItem('bike'))
            setLoginTime(localStorage.getItem('loginTime'))
            console.log('useEffect')
        }
    }, [])

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            setLogoutTime(null);

            const loginData = {
                employeeId: selectedEmployee,
                bike: selectedBike,
                duration: duration,
            }

            const response = await employeeLogin(loginData)
            console.log(response.data);

            // const dateObjectIn = new Date(response.data.log.loginTime);
            // const indianTimeIn = dateObjectIn.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
            const currentTime = await new Date().toLocaleTimeString();
            setLoginTime(currentTime);
            localStorage.setItem("loginTime", currentTime);
            localStorage.setItem("employee", selectedEmployee);
            localStorage.setItem("bike", selectedBike);

        } catch (err) {
            console.log(err.message)
            if (err.message === "Request failed with status code 403") {
                if (err.response.data.data.length) {
                    setErrorMessage(`You already logged with ${err.response.data.data[0].bike} on ${err.response.data.data[0].loginTime.slice(0, 10)}, Please logout before next login`)
                }
            }
            console.error('Error recording login:', err);
        }
    };

    const handleLogout = async () => {
        try {

            const logoutData = {
                employeeId: selectedEmployee
            }

            const response = await employeeLogout(logoutData)
            console.log('Logout recorded:', response.data);
            if (response.data.data.modifiedCount) {
                const currentTime = await new Date().toLocaleTimeString();

                setLogoutTime(currentTime);
                setSelectedEmployee('')
                setSelectedBike('')
                setErrorMessage(null)
                setLoginTime(null);
                localStorage.clear();
            }
        } catch (err) {
            console.log(err)
        }
    };


    const onChangeBike = (e) => {
        setSelectedBike(e.target.value)
        setDuration(e.target.options[e.target.selectedIndex].getAttribute('time'));
    }

    return (
        <>
            <div className='text-danger py-3'>
                {
                    errorMessage && <div>
                        <p>{errorMessage}</p>
                        <button type="submit" onClick={handleLogout}>Logout</button>
                    </div>
                }
            </div>
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
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}

                    {logoutTime && (
                        <div className="time-recorded">
                            <h6 className='text-danger'><strong>Logout Time: </strong>{logoutTime}</h6>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default EmployeeLogin;

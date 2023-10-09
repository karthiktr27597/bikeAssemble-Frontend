import './App.css';
import AdminPanel from './Components/AdminPanel';
import EmployeeLogin from './Components/EmployeeLogin';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Components/AdminPanel/LoginPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<EmployeeLogin />} />
        <Route AdminPanel path="/admin-panel" element={<AdminPanel />} />
        <Route AdminPanel path="/admin" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;

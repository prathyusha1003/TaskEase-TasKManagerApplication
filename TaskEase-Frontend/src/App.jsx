import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './Components/Login'
import PrivateRoute from './Helper/PrivateRoute.js';
import Dashboard from './Components/Dashboard';
import SignUp from './Components/SignUp';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
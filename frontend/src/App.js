import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import Home from "./components/Home/Home";
import WatchVideo from "./components/WatchVideo/WatchVideo";
import LogoImg from "./components/Layout/LogoImg";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/watchVideo/:id" element={<WatchVideo/>}/>
                    {/* 다른 라우트를 추가하세요 */}
                </Routes>
            </Router>
        </>
    );
}

export default App;
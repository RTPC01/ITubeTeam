import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Authentication/Register';
import Home from "./components/Home/Home";
import WatchVideo from "./components/WatchVideo/WatchVideo";
import Header from "./components/Layout/Header";

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/watchVideo/:id" element={<WatchVideo/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
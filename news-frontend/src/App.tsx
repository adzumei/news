import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddNews from './pages/AddNews';
import ViewNews from './pages/ViewNews';
import './App.css';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <header className="app-header">
                <div className="container">
                    <Link to="/" className="logo-link">
                        <h1 className="logo">News</h1>
                    </Link>
                </div>
            </header>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/news/new" element={<AddNews />} />
                <Route path="/news/:id" element={<ViewNews />} />
                <Route path="*" element={<div className="container"><p>Not found</p></div>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

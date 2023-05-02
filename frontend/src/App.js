import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Navbar from "./components/Navbar/Navbar";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import MainPage from "./pages/MainPage/MainPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route exact path="/"
                           element={<LoginPage/>}/>
                    <Route exact path="/registration"
                           element={<RegistrationPage/>}/>
                    <Route exact path="/main"
                           element={<MainPage/>}/>
                    <Route exact path="/products"
                           element={<ProductsPage/>}/>
                    <Route path="/products/:id"
                           element={<ProductPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

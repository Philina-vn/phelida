import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import MainPage from "./pages/MainPage/MainPage";
import NewProductPage from "./pages/NewProductPage/NewProductPage";
import Cart from "./components/Cart/Cart";
import {Provider} from "react-redux";
import {store} from "./redux"
import NavbarLayout from "./utils/NavbarLayout";
import ProductStatistics from "./components/ProductStatistics/ProductStatistics";
import PersonalAreaPage from "./pages/PersonalAreaPage/PersonalAreaPage";
import OrderPage from "./pages/OrdersPage/OrderPage";

function App() {

    return (
        <Provider store={store}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route index path="/login" element={<LoginPage/>}/>
                        <Route path="/registration" element={<RegistrationPage />} />
                        <Route element={<NavbarLayout/>}>
                            <Route path="/main" element={<MainPage/>}/>
                            <Route path="/products" element={<ProductsPage/>}/>
                            <Route path="/new-product" element={<NewProductPage/>}/>
                            <Route path="/products/:id" element={<ProductPage/>}/>
                            <Route path="/personal-area" element={<PersonalAreaPage/>}/>
                            <Route path="/orders" element={<OrderPage/>}/>
                            <Route path="/cart" element={<Cart/>}/>
                            <Route path="/product-statistics" element={<ProductStatistics/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    );
}

export default App;

import React from 'react';
import ProductsPage from "../ProductsPage/ProductsPage";
import Statistics from "../../components/Statistics/Statistics";

const MainPage = () => {
    return (
        <div>
            <Statistics/>
            <ProductsPage/>
        </div>
    );
};

export default MainPage;

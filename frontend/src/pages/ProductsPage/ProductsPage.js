import React, {useEffect, useState} from 'react';
import {getJwtToken} from "../../utils/AuthUtils";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";

const ProductsPage = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/products", {
            headers: {
                'Authorization': 'Bearer ' + getJwtToken()
            }
        })
            .then(response => {
                setProducts(response.data);
            });
    }, []);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard product={product}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;

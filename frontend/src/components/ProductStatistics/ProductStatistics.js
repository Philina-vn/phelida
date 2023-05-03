import React, {useEffect, useState} from 'react';
import axios from "axios";
import {getJwtToken} from "../../utils/AuthUtils";
import {useNavigate} from "react-router";

const ProductStatistics = () => {

    const navigate = useNavigate();
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

    const navigateToProduct = (productId) => {
        navigate("/products/" + productId);
    }

    if (!products) return null;

    return (
        <div className="flex flex-col w-4/5 mx-auto">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:borde-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">Номер продукта</th>
                                <th scope="col" className="px-6 py-4">Имя продукта</th>
                                <th scope="col" className="px-6 py-4">Цена</th>
                                <th scope="col" className="px-6 py-4">Количество заказов</th>
                                <th scope="col" className="px-6 py-4">Выручка, BYN</th>
                                <th scope="col" className="px-6 py-4">Количество на складе</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product) => (
                                <tr className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{product.id}</td>
                                    <td className="whitespace-nowrap px-6 py-4 hover:cursor-pointer hover:font-medium duration-100" onClick={() => navigateToProduct(product.id)} >{product.name}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{product.price.toFixed(2)}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{product.orderNum}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{(product.orderNum * product.price).toFixed(2)}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{product.storageNum}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductStatistics;

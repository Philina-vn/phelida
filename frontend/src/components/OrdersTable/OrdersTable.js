import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import axios from "axios";
import {getJwtToken} from "../../utils/AuthUtils";
import {Link} from "react-router-dom";

const OrdersTable = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/orders/my", {
            headers: {
                'Authorization': 'Bearer ' + getJwtToken()
            }
        })
            .then(response => {
                setOrders(response.data);
            });
    }, []);

    const handleProductNames = (order) => {
        const productsWithoutDuplicates = [];
        order.products.map(product => {
            const findItem = productsWithoutDuplicates.find(obj => obj.id === product.id);
            if (findItem) {
                findItem.count++;
            } else {
                productsWithoutDuplicates.push({
                    ...product,
                    count: 1,
                })
            }
        });
        return productsWithoutDuplicates.map((product) => (
            <p><Link className="font-medium hover:cursor-pointer" to={"/products/" + product.id}>{product.name}</Link> - {product.count} шт.</p>
        ))
    }

    const handleStatus = (order) => {
        if (order.orderStatus.localeCompare("REGISTERED") === 0) {
            return <td className="whitespace-nowrap px-6 py-4">На рассмотрении</td>
        } else {
            return <td className="whitespace-nowrap px-6 py-4 text-green-600">Доставлен</td>
        }
    }

    if (!orders) return null;

    return (
        <div className="flex flex-col w-4/5 mx-auto mt-10">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:borde-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">Номер заказа</th>
                                <th scope="col" className="px-6 py-4">Позиции</th>
                                <th scope="col" className="px-6 py-4">Цена заказа</th>
                                <th scope="col" className="px-6 py-4">Адрес доставки</th>
                                <th scope="col" className="px-6 py-4">Статус заказа</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => (
                                <tr className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{order.id}</td>
                                    <td className="flex flex-col whitespace-nowrap px-6 py-4">
                                        {handleProductNames(order)}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">{order.totalPrice.toFixed(2)}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{order.address}</td>
                                    {handleStatus(order)}
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

export default OrdersTable;

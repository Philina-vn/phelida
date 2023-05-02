import React, {useEffect, useState} from 'react';
import {getJwtToken} from "../../utils/AuthUtils";
import axios from "axios";

const Statistics = () => {

    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8081/statistics", {
            headers: {
                'Authorization': 'Bearer ' + getJwtToken()
            }
        })
            .then(response => {
                setStatistics(response.data);
            });
    }, []);

    if (!statistics) return null;

    return (
        <section className="mx-28 mr-2 text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
                <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
                    <div className="w-full sm:p-4 px-4 mb-6">
                        <h1 className="title-font font-medium text-xl mb-2 text-gray-900">
                            Почему следует выбрать phelida?
                        </h1>
                        <div className="leading-relaxed">
                            Молодой luxury-магазин женской одежды с последними трендами.
                        </div>
                    </div>
                    <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                        <h2 className="title-font font-medium text-3xl text-gray-900">{statistics.usersNum}+</h2>
                        <p className="leading-relaxed">Пользователей</p>
                    </div>
                    <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                        <h2 className="title-font font-medium text-3xl text-gray-900">{statistics.ordersNum}+</h2>
                        <p className="leading-relaxed">Заказов</p>
                    </div>
                    <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                        <h2 className="title-font font-medium text-3xl text-gray-900">{statistics.productsNum}+</h2>
                        <p className="leading-relaxed">Продуктов</p>
                    </div>
                </div>
                <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
                    <img className="object-cover object-center w-full h-full"
                         src={"http://localhost:8081/img/statistics"}
                         alt="stats"/>
                </div>
            </div>
        </section>
    );
};

export default Statistics;

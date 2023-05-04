import React, {useEffect, useState} from 'react';
import axios from "axios";
import {getJwtToken, isAdmin} from "../../utils/AuthUtils";
import OrdersTable from "../../components/OrdersTable/OrdersTable";

const PersonalAreaPage = () => {

    const [account, setAccount] = useState(null);
    const admin = isAdmin();

    useEffect(() => {
        axios.get("http://localhost:8081/user-accounts/my", {
            headers: {
                'Authorization': 'Bearer ' + getJwtToken()
            }
        })
            .then(response => {
                setAccount(response.data);
            });
    }, []);

    if (!account) return null;

    return (
        <div>
            <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg mx-auto mt-10 mb-14">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Ваша персональная информация
                    </h3>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Имя
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {account.name}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Фамилия
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {account.surname}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {account.email}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            {!admin && <OrdersTable/>}
        </div>
    );
};

export default PersonalAreaPage;

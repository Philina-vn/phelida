import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getJwtToken} from "../../utils/AuthUtils";
import {clearCart} from "../../redux/Cart/reducer";

const OrderDetails = () => {

    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const products = useSelector(state => state.cart.itemsInCart)
    const totalPrice = useSelector(state => state.cart.totalPrice)
    const dispatch = useDispatch();

    const handleOrder = () => {
        axios.post("http://localhost:8081/orders", {
            address: address,
            productIds: getProductIdsFromCart(),
            totalPrice: totalPrice
        }, {
            headers: {
                'Authorization': 'Bearer ' + getJwtToken()
            }
        }).then(response => {
            navigate("/main")
        });
    }

    const clearItemsFromCart = (e) => {
        e.stopPropagation();
        dispatch(clearCart())
    }

    const getProductIdsFromCart = () => {
        let productIds = [];
        for (let i = 0; i < products.length; i++) {
            productIds = productIds.concat(Array(products[i].count).fill(products[i].id));
        }
        return productIds;
    }

    return (
        <form className="flex flex-wrap gap-3 w-2/5 p-5 mx-auto mb-16">
            <h1 className="title-font font-medium text-xl mb-2 text-gray-900 mx-auto">
                Форма оформления заказа
            </h1>

            <label className="relative w-full flex flex-col">
                <span className="font-bold mb-3">Адрес доставки</span>
                <input className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                       type="text"
                       name="address"
                       placeholder="ул.Якуба Колоса, 28, 35"
                       value={address}
                       onChange={e => setAddress(e.target.value)}/>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"/>
                </svg>
            </label>

            <label className="relative w-full flex flex-col">
                <span className="font-bold mb-3">Номер карты</span>
                <input className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                       type="text" name="card_number" placeholder="0000 0000 0000 0000"/>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
            </label>

            <label className="relative flex-1 flex flex-col">
                <span className="font-bold mb-3">Действительна до</span>
                <input className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                       type="text" name="expire_date" placeholder="MM/ГГ"/>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
            </label>

            <label className="relative flex-1 flex flex-col">
                <span className="font-bold flex items-center gap-3 mb-3">
                CVV
                <span className="relative group">
                </span>
                </span>
                <input className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
                       type="password" name="card_cvc" placeholder="&bull;&bull;&bull;"/>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
            </label>
            <input type="button"
                   className="mt-4 w-full flex flex-col mx-auto items-center text-white bg-gray-800 font-semibold hover:bg-gray-900 rounded py-3 text-sm uppercase"
                   onClick={(e) => {
                       handleOrder();
                       clearItemsFromCart(e);
                   }}
                   value="Заказать"/>
        </form>
    );
};

export default OrderDetails;

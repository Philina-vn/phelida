import React, {useEffect, useRef, useState} from 'react';
import CartItem from "../CartItem/CartItem";
import {useSelector} from "react-redux";
import OrderDetails from "../OrderDetails/OrderDetails";

const Cart = () => {

    const ref = useRef(null);
    const items = useSelector(state => state.cart.itemsInCart)
    const totalPrice = useSelector(state => state.cart.totalPrice)
    const [isNotEmptyCart, setCartEmptiness] = useState(false);

    useEffect(() => {
            if (items.length > 0) {
                setCartEmptiness(true);
            }
        },
        [])

    const countAllItems = (items) => {
        return items.reduce((sum, obj) => {
            return obj.count + sum;
        }, 0)
    }

    const handleOrderButton = () => {
        ref.current?.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <div className="container mx-auto mt-10 w-3/4">
            <div className="flex shadow-md my-10">
                <div className="w-3/4 bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-semibold text-2xl">Корзина</h1>
                        <h2 className="font-semibold text-2xl">{items.length} позиции</h2>
                    </div>
                    <div className="flex mt-10 mb-5">
                        <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Детали продукта</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Количество</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Цена</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Всего</h3>
                    </div>
                    {
                        items.map(product => <CartItem product={product} number={product.count}/>)
                    }
                </div>
                <div id="summary" className="w-1/4 px-8 py-10">
                    <h1 className="font-semibold text-2xl border-b pb-8">Итого</h1>
                    <div className="flex justify-between mt-10 mb-5">
                        <span className="font-semibold text-sm uppercase">Единиц всего</span>
                        <span className="font-semibold text-sm">{countAllItems(items)}</span>
                    </div>
                    <div className="border-t mt-8">
                        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                            <span>Общая цена</span>
                            <span>{totalPrice.toFixed(2)} BYN</span>
                        </div>
                        <button
                            className="text-white bg-gray-800 font-semibold hover:bg-gray-900 rounded py-3 text-sm uppercase w-full"
                            onClick={handleOrderButton}>
                            Оформить
                        </button>
                    </div>
                </div>
            </div>
            <div ref={ref}>
                {isNotEmptyCart && <OrderDetails/>}
            </div>
        </div>
    );
};

export default Cart;

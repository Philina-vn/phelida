import React from 'react';
import {useDispatch} from "react-redux";
import {deleteItemFromCart, removeItem, setItemInCart} from "../../redux/Cart/reducer";

const CartItem = ({product, number}) => {

    const dispatch = useDispatch();

    const increment = (e) => {
        e.stopPropagation();
        dispatch(setItemInCart(product));
    }

    const decrement = (e) => {
        e.stopPropagation();
        dispatch(deleteItemFromCart(product));
    }

    const remove = (e) => {
        e.stopPropagation();
        dispatch(removeItem(product));
    }

    return (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex w-2/5">
                <div className="w-20">
                    <img className="h-24"
                         src={"http://localhost:8081/img/" + product.id}
                         alt="Image"/>
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{product.name}</span>
                    <span className="text-gray-400 text-xs">{product.category.name}</span>
                    <p className="font-semibold hover:text-red-500 hover:cursor-pointer text-gray-500 text-xs"
                       onClick={remove}>
                        Удалить
                    </p>
                </div>
            </div>
            <div className="flex justify-center w-1/5">
                <svg className="fill-current text-gray-600 w-3 hover:cursor-pointer"
                     viewBox="0 0 448 512"
                     onClick={decrement}>
                    <path
                        d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                </svg>
                <input className="mx-2 border text-center w-8" type="text" value={number}/>
                <svg className="fill-current text-gray-600 w-3 hover:cursor-pointer"
                     viewBox="0 0 448 512"
                     onClick={increment}>
                    <path
                        d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                </svg>
            </div>
            <span className="text-center w-1/5 font-semibold text-sm">{product.price} BYN</span>
            <span className="text-center w-1/5 font-semibold text-sm">{(product.price * number).toFixed(2)} BYN</span>
        </div>
    );
};

export default CartItem;

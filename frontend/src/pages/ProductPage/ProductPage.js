import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import {getJwtToken} from "../../utils/AuthUtils";

const ProductPage = () => {

    const [product, setProduct] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        axios.get("http://localhost:8081/products/" + id, {
            headers: {
                'Authorization': 'Bearer ' + getJwtToken()
            }
        })
            .then(response => {
                setProduct(response.data);
            });
    }, []);

    const fetchMaterials = (product) => {
        return product.materials.map(obj => obj.name).join(', ');
    }

    if (!product) return null;

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 ml-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-2">{product.name}</h1>
                        <h2 className="text-gray-900 text-sm title-font tracking-widest">Категория: {product.category.name.toLowerCase()}</h2>
                        <div className="flex mb-4">
                            <a className="flex-grow text-gray-800 border-b-2 border-gray-800 py-2 text-lg px-1">Описание</a>
                        </div>
                        <p className="leading-relaxed mb-4">{product.description}</p>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="text-gray-500">Материалы</span>
                            <span className="ml-auto text-gray-900">{fetchMaterials(product)}</span>
                        </div>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="text-gray-500">Цвет</span>
                            <span className="ml-auto text-gray-900">{product.color}</span>
                        </div>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="text-gray-500">Размер</span>
                            <span className="ml-auto text-gray-900">One-size</span>
                        </div>
                        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                            <span className="text-gray-500">Количество на складе</span>
                            <span className="ml-auto text-gray-900">{product.storageNum}</span>
                        </div>
                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-900">{product.price} BYN</span>
                            <button
                                className="flex ml-auto text-white bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-900 rounded">
                                Добавить в корзину
                            </button>
                        </div>
                    </div>
                    <img alt="ecommerce" className="lg:w-1/3 lg:h-1/2 object-cover object-center rounded"
                         src={"http://localhost:8081/img/" + id}/>
                </div>
            </div>
        </section>
    );
};

export default ProductPage;

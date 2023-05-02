import React from 'react';
import {Link} from "react-router-dom";

const ProductCard = ({product}) => {
    return (
        <Link to={"/products/" + product.id}>
            <div key={product.id} className="group relative">
                <div
                    className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                        src={"http://localhost:8081/img/" + product.id}
                        alt="Image"
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <div>
                        <h3 className="text-sm text-gray-700">
                            <span aria-hidden="true" className="absolute inset-0"/>
                            {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.category.name}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
            </div>
        </Link>

    );
};

export default ProductCard;

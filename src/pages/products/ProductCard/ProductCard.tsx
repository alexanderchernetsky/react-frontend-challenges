import React, {FC} from "react";
import {Product} from "../types";

interface ProductCardProps extends Product {}

const ProductCard: FC<ProductCardProps> = ({title, price, description, image}) => {
    return (
        <li className="bg-white p-4 flex flex-col items-center border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <div className="h-48 w-full flex items-center justify-center mb-4 overflow-hidden rounded-lg">
                <img 
                    src={image} 
                    alt={title} 
                    className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                />
            </div>
            <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 text-center h-10">{title}</h2>
            <p className="text-xs text-gray-500 line-clamp-3 mb-4 text-center flex-grow">{description}</p>
            <p className="text-lg font-bold text-blue-600 mt-auto">${price}</p>
        </li>
    )
}

export default ProductCard;

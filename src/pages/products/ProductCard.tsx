import React, {FC} from "react";
import {Product} from "./types";

interface ProductCardProps extends Product {}

const ProductCard: FC<ProductCardProps> = ({title, price, description, image}) => {
    return (
        <li className="product-card">
            <img src={image} alt={title} width="100" height="100" />
            <h2>{title}</h2>
            <p>{description}</p>
            <p className="product-price">{price}</p>
        </li>
    )
}

export default ProductCard;

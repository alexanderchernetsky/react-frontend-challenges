import React, {FC, useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import './styles.css';
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import {fetchWithCache} from "../../utils/fetch";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

interface ProductCardProps extends Product {}

const ProductCard: FC<ProductCardProps> = ({title, price, description, image}) => {
    const handleCopyToClipboard = async () => {
        await navigator.clipboard.writeText(title);
    }

    return (
        <li className="product-card">
            <img src={image} alt={title} width="100" height="100" />
            <h2>{title}</h2>
            <p>{description}</p>
            <p className="product-price">{price}</p>
            <div>
                <button type="button" onClick={handleCopyToClipboard}>Copy title</button>
            </div>
        </li>
    )
}

// https://fakestoreapi.com/docs#tag/Products/operation/getAllProducts
function ProductsPage() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    const {isBottomReached} = useIntersectionObserver();

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setLoading(true);
            try {
                const response = await fetchWithCache('https://fakestoreapi.com/products');

                if (!response.ok) {
                    setError('Something went wrong!');
                    throw new Error(`HTTP ${response.status}. Error: ${response.text}`);
                }

                const products = await response.json();
                setProducts(products);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Failed to fetch data!');
                }
                console.log('error', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="App">
            {!loading && !error && isBottomReached && <p className="message">You've reached the bottom!</p>}
            <section>
                <div>
                    <h1>Products</h1>
                    <Link to="/create-product">Create new</Link>
                </div>

                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <ul className="products">
                    {products.length > 0 && products.map(product => {
                        return (
                            <ProductCard key={product.id} {...product} />
                        )
                    })}
                </ul>
                <div id="bottomSentinel" />
            </section>
        </div>
    );
}

export default ProductsPage;

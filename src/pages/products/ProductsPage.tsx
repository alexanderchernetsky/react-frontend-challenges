import React, {useEffect, useState} from 'react';
import './styles.css';
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import {fetchWithCache} from "../../utils/fetch";
import {Product} from "./types";
import ProductCard from "./ProductCard/ProductCard";


// OBJECTIVE: fetch data from API and show a grid of items
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
                console.error('error', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            {!loading && !error && isBottomReached && <p className="message">You've reached the bottom!</p>}
            <section>
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

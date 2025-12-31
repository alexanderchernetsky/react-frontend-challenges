import React, {useEffect, useState} from 'react';
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
        <main className="p-8 flex flex-col items-center min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Products</h1>

            {!loading && !error && isBottomReached && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-bounce">
                    You've reached the bottom!
                </div>
            )}

            <section className="w-full max-w-7xl">
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="ml-4 text-gray-600 font-medium">Loading products...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                        <p className="text-red-700">Error: {error}</p>
                    </div>
                )}

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.length > 0 && products.map(product => {
                        return (
                            <ProductCard key={product.id} {...product} />
                        )
                    })}
                </ul>
                <div id="bottomSentinel" className="h-4" />
            </section>
        </main>
    );
}

export default ProductsPage;

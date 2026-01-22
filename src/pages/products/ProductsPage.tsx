import React, {useEffect, useState} from 'react';
import {fetchWithCache} from "../../utils/fetch";
import {Product} from "./types";
import ProductCard from "./ProductCard/ProductCard";


// OBJECTIVE: fetch data from API and show a grid of items
// https://fakestoreapi.com/docs#tag/Products/operation/getAllProducts
function ProductsPage() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

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

            <section className="w-full max-w-3xl mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Objective: Fetch and Display Products</h2>
                <p className="text-blue-800 mb-4">
                    Build a dynamic product grid that fetches data from an external API and implements infinite scroll detection.
                </p>
                <div className="space-y-2">
                    <p className="font-medium text-blue-900">Key Requirements:</p>
                    <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2">
                        <li>Fetch product data from <code className="bg-blue-100 px-1 rounded">fakestoreapi.com</code></li>
                        <li>Display products in a responsive grid layout</li>
                        <li>Handle loading and error states during data fetching</li>
                        <li>Use caching to optimize API requests</li>
                    </ul>
                </div>
            </section>

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

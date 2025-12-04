import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/products/ProductsPage";
import CreateProductsPage from "./pages/create-product/CreateProductPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/create-product" element={<CreateProductsPage />} />
        </Routes>
    );
}

export default App;

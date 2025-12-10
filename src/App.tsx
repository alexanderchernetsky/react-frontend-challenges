import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/products/ProductsPage";
import CreateProductsPage from "./pages/create-product/CreateProductPage";
import TodoPage from "./pages/todo/ToDoPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/create-product" element={<CreateProductsPage />} />
            <Route path="/todo" element={<TodoPage />} />
        </Routes>
    );
}

export default App;

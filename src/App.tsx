import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/products/ProductsPage";
import CreateProductsPage from "./pages/create-product/CreateProductPage";
import TodoPage from "./pages/todo/ToDoPage";
import AccordionPage from "./pages/accordion/AccordionPage";
import HomePage from "./pages/home/HomePage";
import ContactPage from "./pages/contact-form/ContactPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/create-product" element={<CreateProductsPage />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/accordion" element={<AccordionPage />} />
            <Route path="/contact-form" element={<ContactPage />} />
        </Routes>
    );
}

export default App;

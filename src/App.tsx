import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/products/ProductsPage";
import CreateProductsPage from "./pages/create-product/CreateProductPage";
import TodoPage from "./pages/todo/ToDoPage";
import AccordionPage from "./pages/accordion/AccordionPage";
import HomePage from "./pages/home/HomePage";
import ContactPage from "./pages/contact/ContactPage";
import ProgressBarsPage from "./pages/progress-bars/ProgressBarsPage";
import TabsPage from "./pages/tabs/TabsPage";
import AddMileagePage from "./pages/add-mileage/AddMileagePage";
import MortgageCalculatorPage from "./pages/mortgage-calculator/MorgageCalculatorPage";
import HolyGrailPage from "./pages/holy-grail/HolyGrailPage";
import DiceRollerPage from "./pages/dice-roller/DiceRollerPage";
import CSSBattle235Page from "./pages/css-battle-235/CSSBattle235Page";
import TablePage from "./pages/table/TablePage";
import LikeButtonPage from "./pages/like-button/LikeButtonPage";
import StarRatingPage from "./pages/star-rating/StarRatingPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/create-product" element={<CreateProductsPage />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/accordion" element={<AccordionPage />} />
            <Route path="/contact-form" element={<ContactPage />} />
            <Route path="/progress-bars" element={<ProgressBarsPage />} />
            <Route path="/tabs" element={<TabsPage />} />
            <Route path="/add-mileage-form" element={<AddMileagePage />} />
            <Route path="/mortgage-calculator" element={<MortgageCalculatorPage />} />
            <Route path="/holy-grail" element={<HolyGrailPage />} />
            <Route path="/dice-roller" element={<DiceRollerPage />} />
            <Route path="/css-battle-235" element={<CSSBattle235Page />} />
            <Route path="/table" element={<TablePage />} />
            <Route path="/like-button" element={<LikeButtonPage />} />
            <Route path="/star-rating" element={<StarRatingPage />} />
        </Routes>
    );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from './MainMenu';
import ProductsPage from './ProductsPage';
import CartPage from './CartPage';
import Footer from './Footer';
import { CartProvider } from './CartContext';

function App() {
    return (
        <CartProvider>
            {/* Добавляем basename для GitHub Pages */}
            <Router basename="/era-survival">
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<MainMenu />} />
                        <Route path="/products/:id" element={<ProductsPage />} />
                        <Route path="/cart" element={<CartPage />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;

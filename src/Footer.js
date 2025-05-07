import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Footer.css';

function Footer() {
    const navigate = useNavigate();
    const { totalItems } = useCart();

    return (
        <div className="footer">
            <button onClick={() => navigate('/')} className="menu-button">
                Главное меню 🏠
            </button>
            <button onClick={() => navigate('/cart')} className="cart-button">
    Корзина 🛒 ({totalItems > 0 ? totalItems : 'Пусто'})
</button>

        </div>
    );
}

export default Footer;

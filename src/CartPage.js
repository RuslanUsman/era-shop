import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import './CartPage.css';

function CartPage() {
    const { cart, removeFromCart } = useCart();
    const [accountId, setAccountId] = useState('');
    const [telegramUsername, setTelegramUsername] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Получение данных пользователя из Telegram Web App
    useEffect(() => {
        if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
            const { id, username, first_name, last_name } = window.Telegram.WebApp.initDataUnsafe.user;
            setTelegramUsername(username || `${first_name} ${last_name}`);
        }
    }, []);

    // Подсчет общей стоимости
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Логика оформления заказа
    const handleOrderSubmit = async () => {
        setError('');
        setSuccess(false);

        if (!accountId) {
            setError('Пожалуйста, введите ID игрового аккаунта.');
            return;
        }
        if (!/^\d+$/.test(accountId)) {
            setError('ID должен содержать только цифры.');
            return;
        }

        // Формирование сообщения для Telegram
        const message = `
Заказ оформлен!
ID игрового аккаунта: ${accountId}
Телеграм: ${telegramUsername || 'Не указан'}

Товары:
${cart.map((item) => `
Название: ${item.name}
Описание: ${item.description}
Цена за единицу: ${item.price} руб.
Количество: ${item.quantity}
Сумма: ${item.price * item.quantity} руб.
Ссылка на изображение: ${process.env.PUBLIC_URL}${item.image}
---------------------`).join('\n')}

Общая стоимость: ${totalPrice} руб.
        `;

        const chatIds = ['5930230795', '389746882', '6008153078'];

        try {
            const botToken = '8119819639:AAGSGevmAnNUG1qx_zssw-al6HG-s2XvikY';
            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

            for (const chatId of chatIds) {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: chatId, text: message }),
                });

                if (!response.ok) {
                    throw new Error(`Ошибка отправки заказа в чат ${chatId}`);
                }
            }

            setSuccess(true);
        } catch (err) {
            setError('Ошибка отправки заказа, попробуйте снова.');
        }
    };

    return (
        <div className="cart-page">
            <h1>Корзина</h1>
            {cart.length > 0 ? (
                <div className="grid-container">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img
                                src={`${process.env.PUBLIC_URL}${item.image}`}
                                alt={item.name}
                                onError={(e) => e.target.src = `${process.env.PUBLIC_URL}/images/default.jpg`}
                            />
                            <div className="item-details">
                                <h2>{item.name}</h2>
                                <p>{item.description}</p>
                                <p>Цена: {item.price} руб.</p>
                                <p>Количество: {item.quantity}</p>
                                <p>Сумма: {item.price * item.quantity} руб.</p>
                                <button className="remove-button" onClick={() => removeFromCart(item.id)}>🗑️ Удалить</button>
                            </div>
                        </div>
                    ))}
                    <h2 className="total-price">Общая стоимость: {totalPrice} руб.</h2>
                    <div className="order-section">
                        {/* Ввод ID игрового аккаунта */}
                        <input type="text" value={accountId} placeholder="Введите ID игрового аккаунта" onChange={(e) => setAccountId(e.target.value)} />

                        {/* Автоматическое отображение Telegram username */}
                        <p>Телеграм: {telegramUsername || 'Введите вручную'}</p>

                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">✅ Заказ успешно оформлен!</div>}
                        
                        <button onClick={handleOrderSubmit} className="order-button">Оформить заказ</button>
                    </div>
                </div>
            ) : (
                <p>Ваша корзина пуста.</p>
            )}
        </div>
    );
}

export default CartPage;




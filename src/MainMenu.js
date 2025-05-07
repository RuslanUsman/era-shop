import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'; // ✅ Импортируем Footer
import './MainMenu.css';

const containers = [
    { id: 'maps', title: 'Карты', description: 'Зелёные, синие и фиолетовые карточки (чипы для дверей)' },
    { id: 'sets', title: 'Сеты', description: 'Стартовые и улучшенные наборы: броня, оружие, патроны' },
    { id: 'explosion', title: 'Взрыв', description: 'Доступно на разных этапах вайпа: 6, 24, 48 часов' },
    { id: 'additionally', title: 'Дополнительно', description: 'Экстра предметы: перчатки для добычи, бур, пила' },
    { id: 'components', title: 'Компоненты', description: 'Необходимые элементы для крафта' },
    { id: 'buildings', title: 'Постройки', description: 'Объекты для строительства и защиты' },
    { id: 'weapon', title: 'Оружие и броня', description: 'Доступность зависит от времени после вайпа' },
    { id: 'resources', title: 'Ресурсы', description: 'Основные материалы, доступные со старта' },
    { id: 'technic', title: 'Техника', description: 'Различные виды транспорта: спорткар, хаммер, вертолёт' },
];

function MainMenu() {
    const navigate = useNavigate();

    return (
        <div className="main-menu-container">
            <h1 className="menu-title">🛒 Магазин</h1>
            <div className="grid-container">
                {containers.map((container) => (
                    <div
                        key={container.id}
                        className="menu-item"
                        onClick={() => navigate(`/products/${container.id}`)}
                    >
                        <h2 className="menu-item-title">{container.title}</h2>
                        <p className="menu-item-description">{container.description}</p>
                    </div>
                ))}
            </div>

            {/* ✅ Добавляем Footer */}
            <Footer />
        </div>
    );
}

export default MainMenu;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    title: string;
    imageUrl: string;
    price: number;
  } | null>(null);
  const [isLoading, setIsLoading] = React.useState(true); // Отдельное состояние для загрузки
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    let isMounted = true; // Флаг для проверки, что компонент ещё монтирован
    async function fetchPizza() {
      try {
        setIsLoading(true); // Установка состояния загрузки
        const { data } = await axios.get(`https://6691760b26c2a69f6e8fcf51.mockapi.io/items/${id}`);
        if (isMounted) {
          setPizza(data); // Установка пиццы только если компонент монтирован
        }
      } catch (error) {
        alert('Ошибка при получении пиццы!!!');
        navigate('/'); // Перенаправление на главную страницу при ошибке
      } finally {
        if (isMounted) {
          setIsLoading(false); // Остановка состояния загрузки
        }
      }
    }
    fetchPizza();

    return () => {
      isMounted = false; // Очистка при размонтировании компонента
    };
  }, [id, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Сообщение о загрузке
  }

  if (!pizza) {
    return <div>Пицца не найдена</div>; // Сообщение, если пицца не найдена
  }

  return (
    <div className="container">
      <h2>{pizza.title}</h2>
      <img src={pizza.imageUrl} alt={pizza.title} /> {/* Использование названия пиццы как alt-текста */}
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, removeItem, minusItem } from '../../Redux/Slices/cartSlices'; // Импорт экшенов
const CartItem = ({ id, title, type, size, price, count, imageUrl }) => {
  const dispatch = useDispatch();

  // Функция для увеличения количества товара
  const onClickPlus = () => {
    dispatch(addItem({ id, title, type, size, price, imageUrl })); // Передаем все параметры товара
  };

  // Функция для уменьшения количества товара или удаления его
  const onClickMinus = () => {
    if (count > 1) {
      dispatch(minusItem(id)); // Уменьшаем количество
    } else {
      dispatch(removeItem(id)); // Удаляем товар из корзины, если count = 1
    }
  };

  // Функция для удаления товара
  const onClickRemove = () => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар из корзины?')) {
      dispatch(removeItem(id)); // Удаляем товар
    }
  };

  // Вычисляем сумму для данного товара
  const itemTotalPrice = price * count;
  
  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt={title} />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3> {/* Название товара */}
        <p>{type} тесто, {size} см.</p> {/* Тип теста и размер */}
      </div>
      <div className="cart__item-count">
        <div
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5H9"  // Линия для знака минус
              stroke="#EB5A1E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <b>{count}</b> {/* Текущее количество товара */}
        <div
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 1V9M1 5H9"  // Крестик для знака плюс
              stroke="#EB5A1E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="cart__item-price">
        <b>{itemTotalPrice} ₽ </b> {/* Отображение цены за одну штуку */}
      </div>
      <div
        onClick={onClickRemove} // Обработчик для удаления товара
        className="cart__item-remove"
      >
        <div className="button button--outline button--circle">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 1V9M1 5H9"   // Крестик для удаления товара
              stroke="#EB5A1E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItemById } from '../../Redux/Slices/cartSlices';

// Типизация пропсов
interface PizzaBlockProps {
  id: string;
  title: string;
  price: number[];
  imageUrl: string;
  sizes: number[];
  types: number[];
}

const PizzaBlock: React.FC<PizzaBlockProps> = React.memo(({ id, title, price, imageUrl, sizes, types }) => {
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartItemById(id));
  const addedCount = cartItem ? cartItem.count : 0;

  const typeNames = ['Тонкое', 'Традиционное'];

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price: price[activeSize], // Цена изменяется в зависимости от выбранного размера
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        {/* Ленивое загружаемое изображение */}
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" loading="lazy" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul role="tablist">
            {types?.map((type, index) => (
              <li
                key={type}
                role="tab"
                aria-selected={activeType === index} // ARIA атрибут для доступности
                onClick={() => setActiveType(index)}
                className={activeType === index ? 'active' : ''}>
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul role="tablist">
            {sizes?.map((size, index) => (
              <li
                key={size}
                role="tab"
                aria-selected={activeSize === index}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? 'active' : ''}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price[activeSize]} ₽</div> {/* Цена зависит от выбранного размера */}
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>} {/* Показывает количество добавленных пицц */}
          </button>
        </div>
      </div>
    </div>  
  );
});

export default PizzaBlock;

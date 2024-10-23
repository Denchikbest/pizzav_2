import React from 'react';

type CategoriesProps = {
  value: number; // Индекс активной категории
  onChangeCategory: (i: number) => void; // Функция для изменения активной категории
};

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясо', 'Веган', 'Гриль', 'Чили', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => {
          const isActive = value === i; // Проверка, является ли категория активной
          return (
            <li
              key={`${i}-${categoryName}`} // Уникальный ключ для каждой категории
              role="button"
              tabIndex={0} // Делаем элемент доступным для фокуса
              onClick={() => onChangeCategory(i)} // Обработчик клика
              onKeyDown={(e:string) => e === 'Enter' && onChangeCategory(i)} // Обработка клавиатурной навигации
              className={isActive ? 'active' : ''} // Активный класс
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;

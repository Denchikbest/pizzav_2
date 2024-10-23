import React from 'react';
import qs from 'qs';
import Sort, { list } from '../Components/Sorted.tsx';
import Categories from '../Components/Categories.tsx';
import PizzaBlock from '../Components/PizzaBlock/index.tsx';
import Skeleton from '../Components/PizzaBlock/Skeleton.tsx';
import Pagination from '../Components/Pagination/index.tsx';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilter,
} from '../Redux/Slices/filterSlices';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPizzas, selectPizzaData } from '../Redux/Slices/pizzaSlice';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef<boolean>(false);
  const isMounted = React.useRef<boolean>(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, currentPage, sortType, searchValue } = useSelector(selectFilter);

  const onChangeCategory = (index: number) => {
    dispatch(setCategoryId(index));
  };

  const onChangePage = React.useCallback(
    (number: number) => {
      dispatch(setCurrentPage(number));
    },
    [dispatch],
  );

  const getPizzas = React.useCallback(() => {
    const sortBy = sortType ? sortType.replace('-', '') : 'rating';
    const order = sortType && sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    // Оставляем этот блок кода неизменным
    dispatch(
      //@ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );
  }, [categoryId, currentPage, sortType, searchValue, dispatch]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    } else {
      isMounted.current = true;
    }
  }, [categoryId, sortType, currentPage, navigate]);

  React.useEffect(() => {
    const params = qs.parse(window.location.search.substring(1));
    if (params.sortProperty) {
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      if (sort) {
        dispatch(setFilter({ ...params, sort }));
      }
      isSearch.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage, getPizzas]);

  // Отрисовка пицц
    const pizzas = items.map((obj:any) => (
      <Link key={obj.id} to={`/pizza/${obj.id}`}>
        <PizzaBlock {...obj} />
      </Link>
    ));

  // Отрисовка скелетов загрузки
  const skeletons = Array.from({ length: 6 }, (_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div>
          <h2>Ошибка при загрузке пицц 😕</h2>
          <p>Произошла ошибка. Пожалуйста, попробуйте еще раз позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

import React from 'react';
import styles from './Search.module.scss';
import { setSearchValue } from '../../Redux/Slices/filterSlices';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

const Search: React.FC = () => { 
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = React.useCallback(() => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus(); // Фокусируем на инпуте
  }, [dispatch]);

  // Создаем debounced функцию
  const debouncedSearch = React.useMemo(
    () => debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 150),
    [dispatch]
  );

  // Эффект для вызова debounced функции
  React.useEffect(() => {
    if (value) {
      debouncedSearch(value);
    } else {
      dispatch(setSearchValue(''));
    }

    // Функция очистки для debounced функции
    return () => {
      debouncedSearch.cancel();
    };
  }, [value, debouncedSearch, dispatch]);

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        height="512"
        viewBox="0 0 512 512"
        width="512"
        role="img"
        aria-hidden="true"
      >
        <title />
        <path d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск Пиццы..."
        aria-label="Search for pizzas"
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};

export default Search;

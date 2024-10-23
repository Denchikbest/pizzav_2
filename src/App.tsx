import './scss/app.scss';
import Header from './Components/Header.tsx';
import { FullPizza } from './pages/FullPizza.tsx';
import Home from './pages/Home.tsx';
import Cart from './pages/Cart.tsx';
import HotFaund from './pages/HotFaund.tsx';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const SearchContext = React.createContext({});

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<FullPizza />} /> {/* Правильный путь для FullPizza */}
            <Route path="*" element={<HotFaund />} /> {/* Обработка всех несуществующих маршрутов */}
          </Routes>
        </div>фффффффффффффффффффффффффф
      </SearchContext.Provider>
    </div>
  );
}

export default App;

import './scss/app.scss';
import Header from './Components/Header';
import HotFaund from './pages/HotFaund';
import Home from './pages/Home';
import Cart from './pages/Cart';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const SearchContext = React.createContext('');

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
            <Route path="*" element={<HotFaund />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;

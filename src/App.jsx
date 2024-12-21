import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import Admin from "./components/admin/admin"
import Dire from "./components/dire/dire"

const App = () => {
  useEffect(() => {
    // LocalStorage ma'lumotlarini 2 daqiqada bir marta o'chirish
    const interval = setInterval(() => {
      localStorage.clear();
      console.log("LocalStorage o'chirildi");
    }, 2 * 60 * 1000); // 2 daqiqa

    // Component unmount bo'lganda intervalni to'xtatish
    return () => clearInterval(interval);
  }, []);

  return (
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path='/admin' element={<Admin />}/>
        <Route path='/dire' element={<Dire />}/>
      </Routes>
  );
};

export default App;

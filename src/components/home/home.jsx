import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './home.css';

const Home = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ma'lumotlar to'liq kiritilganligini tekshirish
    if (!name || !surname || !age || !address) {
      toast.error('Iltimos, barcha ma\'lumotlarni kiriting!');
      return;
    }

    // Foydalanuvchi ma'lumotlarini localStorage ga saqlash
    const userData = { name, surname, age, address };
    localStorage.setItem('userData', JSON.stringify(userData));

    // Yuklanish holatini faollashtirish va /dire sahifasiga o'tish
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dire');
    }, 2000);
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="formContainer">
        <div className="iconContainer">
          <h1>Kirish</h1>
        </div>
        {loading ? (
          <div className="loading">Yuklanmoqda...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Foydalanuvchi haqida ma'lumotlar */}
            <input
              type="text"
              placeholder="Ism"
              className="inputField"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Familya"
              className="inputField"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <input
              type="number"
              placeholder="Yosh"
              className="inputField"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              type="text"
              placeholder="Manzil"
              className="inputField"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
             <input
              type="text"
              placeholder="Nomer"
              className="inputField"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            
            <button className="button">Kirish</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../bolim1/bolim.css";

const Bolim1 = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState(''); // Initial state
  const [printers, setPrinters] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://66a6197023b29e17a1a1ba9a.mockapi.io/Orders');
        const data = await response.json();
        const filteredProducts = data.filter(product => product.category === '1bolim');
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }

    // Check if a printer was already selected in localStorage
    const storedPrinter = localStorage.getItem('selectedPrinter');
    if (storedPrinter) {
      setSelectedPrinter(storedPrinter);
    }
  }, []);

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await fetch('http://localhost:5000/printers');
        const data = await response.json();
        if (data.error) {
          alert('Printerlar topilmadi!');
        } else {
          setPrinters(data);
        }
      } catch (error) {
        console.error('Printerlarni olishda xatolik:', error);
      }
    };

    if (showModal) {
      fetchPrinters();
    }
  }, [showModal]);

  const handleProductClick = (product) => {
    if (selectedProducts.some(p => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveProduct = (product) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();
    return `${date} ${time}`;
  };

  const printReceipt = async () => {
    if (!selectedPrinter) {
      alert('Printer tanlanmagan!');
      return;
    }
  
    const receiptContent = {
      dateTime: getCurrentDateTime(),
      user: userData,
      products: selectedProducts
    };
  
    try {
      console.log("Chek chiqarish boshlanmoqda:", receiptContent);
      const response = await fetch('http://localhost:5000/print', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          printer: selectedPrinter,
          content: receiptContent
        })
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server xatosi: ${errorText}`);
      }
  
      alert('Chek muvaffaqiyatli chiqarildi!');
  
      localStorage.removeItem('userData');
  
      navigate('/');
    } catch (error) {
      console.error("Xato:", error.message);
      alert('Server bilan ulanishda muammo yuz berdi! Tafsilotlar: ' + error.message);
    }
  };

  const handlePrinterSelect = (printer) => {
    setSelectedPrinter(printer);
    localStorage.setItem('selectedPrinter', printer); // Store the selected printer in localStorage
    setShowModal(false);
  };

  return (
    <div className='mains'>
      <h1>1-bo'lim Page</h1>
      <div>
        <h2>Xizmatlar</h2>
        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <button
                className={`select-btn ${selectedProducts.some(p => p.id === product.id) ? 'selected' : ''}`}
                onClick={() => handleProductClick(product)}
              >
                {selectedProducts.some(p => p.id === product.id) ? 'X' : '+'}
              </button>
              <strong>{product.treatmentName}</strong>: {product.price} so'm
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Tanlangan maxsulotlar:</h3>
        <div id="receipt">
          <p><strong>Sana:</strong> {getCurrentDateTime()}</p>
          {userData && (
            <div>
              <p><strong>Ism:</strong> {userData.name}</p>
              <p><strong>Familiya:</strong> {userData.surname}</p>
              <p><strong>Yosh:</strong> {userData.age}</p>
              <p><strong>Manzil:</strong> {userData.address}</p>
              <p><strong>Tel raqami: </strong> {userData.phone}</p>
            </div>
          )}
          {selectedProducts.length > 0 ? (
            <div className="product-list">
              {selectedProducts.map(product => (
                <div key={product.id} className="product-item">
                  <p><strong>{product.treatmentName}</strong>: {product.price} so'm</p>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveProduct(product)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Tanlangan maxsulotlar yo'q.</p>
          )}
        </div>
        <button className="buy-btn" onClick={printReceipt} disabled={selectedProducts.length === 0}>
          Chek chiqarish
        </button>
        <button className="modal-btn" onClick={() => setShowModal(true)}>
          Printerlarni ko'rish
        </button>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Ulangan Printerlar</h2>
            <ul>
              {printers.length > 0 ? (
                printers.map((printer, index) => (
                  <li key={index}>
                    <button onClick={() => handlePrinterSelect(printer.name)}>
                      {printer.name}
                    </button>
                  </li>
                ))
              ) : (
                <p>Printerlar mavjud emas.</p>
              )}
            </ul>
            <button onClick={() => setShowModal(false)}>Yopish</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bolim1;

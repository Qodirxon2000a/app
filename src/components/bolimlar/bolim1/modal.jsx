import React, { useState } from 'react';
import "../bolim1/bolim.css"

const Bolim1 = () => {
  // Maxsulotlar ro'yxati
  const products = [
    { id: 1, name: 'Mualaja 1', price: 15000 },
    { id: 2, name: 'Mualaja 2', price: 13000 }
  ];

  // Tanlangan maxsulotlar ro'yxatini saqlash
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Maxsulot tanlash/ochirish
  const handleProductChange = (e, product) => {
    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    }
  };

  // Hozirgi sana va vaqtni olish
  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString(); // Sana
    const time = currentDate.toLocaleTimeString(); // Soat
    return `${date} ${time}`;
  };

  // Chekni chiqarish
  const printReceipt = () => {
    const printContent = document.getElementById('receipt').innerHTML;
    const printWindow = window.open('', '', 'height=400,width=50');
    printWindow.document.write('<html><head><title>Chek</title></head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className='mains'>
      <h1>1-bo'lim Page</h1>
      <div>
        <h2>Maxsulotlar ro'yxati</h2>
        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <input 
                type="checkbox" 
                onChange={(e) => handleProductChange(e, product)} 
              />
              <strong>{product.name}</strong>: {product.price} so'm
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Tanlangan maxsulotlar:</h3>
        <div id="receipt">
          <p><strong>Sana:</strong> {getCurrentDateTime()}</p>
          {selectedProducts.length > 0 ? (
            <div className="product-list">
              {selectedProducts.map(product => (
                <div key={product.id} className="product-item">
                  <p><strong>{product.name}</strong>: {product.price} so'm</p>
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
      </div>
    </div>
  );
};

export default Bolim1;

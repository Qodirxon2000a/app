import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../bolim1/bolim.css";

const Bolim1 = () => {
  const navigate = useNavigate(); // Navigate for routing

  const [products, setProducts] = useState([]); // State to store fetched products
  const [selectedProducts, setSelectedProducts] = useState([]); // State for selected products
  const [userData, setUserData] = useState(null); // To store user data from localStorage

  // Fetch products from the API and filter based on category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://66a6197023b29e17a1a1ba9a.mockapi.io/Orders');
        const data = await response.json();
        
        // Filter the products where category is '1bolim'
        const filteredProducts = data.filter(product => product.category === '3bolim');
        
        // Set the filtered products to the state
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    // Get user data from localStorage
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  // Toggle selection of product
  const handleProductClick = (product) => {
    if (selectedProducts.some(p => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  // Remove selected product
  const handleRemoveProduct = (product) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
  };

  // Get current date and time
  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const date = currentDate.toLocaleDateString(); // Date
    const time = currentDate.toLocaleTimeString(); // Time
    return `${date} ${time}`;
  };

  // Print receipt
  const printReceipt = () => {
    const printContent = document.getElementById('receipt').innerHTML;
    const printWindow = window.open('', '', 'height=400,width=50');
    printWindow.document.write('<html><head><title>Chek</title></head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();

    // Remove user data from localStorage
    localStorage.removeItem('userData');

    // Redirect to home page
    navigate('/');
  };

  return (
    <div className='mains'>
      <h1>3-bo'lim Page</h1>
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
      </div>
    </div>
  );
};

export default Bolim1;

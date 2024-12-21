import React, { useState, useEffect } from 'react';
import "./admin.css";

const Admin = () => {
  const [category, setCategory] = useState('1bolim'); // Default category
  const [price, setPrice] = useState('');
  const [treatmentName, setTreatmentName] = useState(''); // New state for treatment name
  const [error, setError] = useState(null); // To display error if needed
  const [success, setSuccess] = useState(null); // To show success message
  const [treatments, setTreatments] = useState([]); // To store fetched treatments

  // Fetch existing treatments from the API
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch('https://66a6197023b29e17a1a1ba9a.mockapi.io/Orders');
        const data = await response.json();
        setTreatments(data);
      } catch (err) {
        console.error("Error fetching treatments:", err);
      }
    };

    fetchTreatments();
  }, [success]); // Re-fetch when a new treatment is added

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleTreatmentNameChange = (e) => {
    setTreatmentName(e.target.value);
  };

  // Handle form submission to add a new treatment
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate price
    if (!price || isNaN(price) || price <= 0) {
      setError("Narxni to'g'ri kiriting.");
      return;
    }

    // Validate treatment name
    if (!treatmentName) {
      setError("Muolaja nomini kiriting.");
      return;
    }

    const orderData = {
      category,
      price: parseFloat(price),
      treatmentName, // Include treatment name
    };

    try {
      const response = await fetch('https://66a6197023b29e17a1a1ba9a.mockapi.io/Orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setSuccess("Maxsulot muvaffaqiyatli qo'shildi.");
        setError(null); // Clear any previous error
        setCategory('1bolim'); // Reset category to default
        setPrice(''); // Clear price field
        setTreatmentName(''); // Clear treatment name field
      } else {
        setError("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
        setSuccess(null);
      }
    } catch (err) {
      setError("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    }
  };

  // Delete treatment
  const deleteTreatment = async (id) => {
    try {
      const response = await fetch(`https://66a6197023b29e17a1a1ba9a.mockapi.io/Orders/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess("Maxsulot muvaffaqiyatli o'chirildi.");
        setTreatments(treatments.filter(treatment => treatment.id !== id)); // Remove from state
      } else {
        setError("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
      }
    } catch (err) {
      setError("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    }
  };

  // Group treatments by category
  const groupedTreatments = treatments.reduce((acc, treatment) => {
    if (!acc[treatment.category]) {
      acc[treatment.category] = [];
    }
    acc[treatment.category].push(treatment);
    return acc;
  }, {});

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="input-group">
          <label htmlFor="treatmentName">Muolaja nomi:</label>
          <input
            type="text"
            id="treatmentName"
            value={treatmentName}
            onChange={handleTreatmentNameChange}
            placeholder="Muolaja nomini kiriting"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="category">Kategoriya:</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="1bolim">1-bo'lim</option>
            <option value="2bolim">2-bo'lim</option>
            <option value="3bolim">3-bo'lim</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="price">Narx:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handlePriceChange}
            placeholder="Narxni kiriting"
            min="0"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit" className="submit-button">Maxsulotni qo'shish</button>
      </form>

      <h2>Qo'shilgan Maxsulotlar:</h2>
      <div className="treatments-list">
        {Object.keys(groupedTreatments).map((category) => (
          <div key={category}>
            <h3>{category === '1bolim' ? "1-bo'lim" : category === '2bolim' ? "2-bo'lim" : "3-bo'lim"}</h3>
            <div className="category-group">
              {groupedTreatments[category].map(treatment => (
                <div key={treatment.id} className="treatment-item">
                  <p><strong>{treatment.treatmentName}</strong> - {treatment.price} so'm</p>
                  <button
                    onClick={() => deleteTreatment(treatment.id)}
                    className="delete-btn"
                  >
                    O'chirish
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;

import React, { useState } from 'react';
import './dire.css'; // Style uchun
import Bolim1 from '../bolimlar/bolim1/bolim';
import Bolim2 from '../bolimlar/bolim2/bolim2';
import Bolim3 from '../bolimlar/bolim3/bolim3';
import Adminss from '../admin/admin'

const Dire = () => {
  // State uchun bo'limni tanlash
  const [selectedBoLim, setSelectedBoLim] = useState('bolim1');

  return (
    <div className="dire-container">
      {/* Chap tomon menyu */}
      <nav className="dire-sidebar">
        <ul>
          <li>
            <button
              className={selectedBoLim === 'bolim1' ? 'active' : ''}
              onClick={() => setSelectedBoLim('bolim1')}
            >
              1-bo'lim
            </button>
          </li>
          <li>
            <button
              className={selectedBoLim === 'bolim2' ? 'active' : ''}
              onClick={() => setSelectedBoLim('bolim2')}
            >
              2-bo'lim
            </button>
          </li>
          <li>
            <button
              className={selectedBoLim === 'bolim3' ? 'active' : ''}
              onClick={() => setSelectedBoLim('bolim3')}
            >
              3-bo'lim
            </button>
            <button
              className={selectedBoLim === 'admin' ? 'active' : ''}
              onClick={() => setSelectedBoLim('admin')}
            >
              Admin
            </button>
          </li>
        </ul>
      </nav>

      {/* Asosiy kontent qismi */}
      <div className="dire-main-content">
        {selectedBoLim === 'bolim1' && <Bolim1 />}
        {selectedBoLim === 'bolim2' && <Bolim2 />}
        {selectedBoLim === 'bolim3' && <Bolim3 />}
        
        {selectedBoLim === 'admin' && <Adminss />}

        
      </div>
    </div>
  );
};

export default Dire;

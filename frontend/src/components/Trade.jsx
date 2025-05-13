// Trade.jsx

import React, { useState } from 'react';
import api from '../services/api';

const Trade = () => {
  const [coinId, setCoinId] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleBuy = () => {
    api.buyCoin(coinId, quantity);
  };

  const handleSell = () => {
    api.sellCoin(coinId, quantity);
  };

  return (
    <div className="container bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Coin Alım/Satım</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="coinId" className="block text-sm font-medium text-gray-700">
            Coin ID
          </label>
          <select
            id="coinId"
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
            value={coinId}
            onChange={(e) => setCoinId(e.target.value)}
          >
            {/* Örnek olarak sabit coin seçenekleri ekliyoruz */}
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="ripple">Ripple</option>
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Miktar
          </label>
          <input
            type="number"
            id="quantity"
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="space-x-4">
          <button
            onClick={handleBuy}
            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
          >
            Satın Al
          </button>
          <button
            onClick={handleSell}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
          >
            Sat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trade;

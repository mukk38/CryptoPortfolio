import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const data = await api.getPortfolio();
      setPortfolio(data);
    };
    fetchPortfolio();
  }, []);

  return (
    <div>
      <h2>Portföyünüz</h2>
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Miktar</th>
            <th>Değer (USD)</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map(wallet => (
            <tr key={wallet.coinId}>
              <td>{wallet.coinId}</td>
              <td>{wallet.quantity}</td>
              <td>{(wallet.quantity * 10000).toFixed(2)} USD</td> {/* Burada fiyatı API'den alabiliriz */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;

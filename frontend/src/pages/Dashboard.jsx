import React, { useEffect, useState } from 'react';
import PortfolioChart from '../PortfolioChart.jsx';
import axios from 'axios';

const PORTFOLIO_URL = 'http://localhost:8319/api/trade/portfolio';
const TRADE_URL = 'http://localhost:8319/api/trade';
const COINS = [
  'bitcoin', 'ethereum', 'tether', 'solana', 'bnb',
  'xrp', 'dogecoin', 'cardano', 'shiba-inu', 'avalanche',
  'polkadot', 'tron', 'chainlink', 'uniswap', 'litecoin',
  'polygon', 'internet-computer', 'near', 'aptos', 'stellar',
  'vechain', 'hedera', 'arbitrum', 'optimism', 'cosmos',
  'maker', 'quant', 'the-graph', 'aave', 'algorand',
  'tezos', 'flow', 'filecoin', 'axie-infinity', 'sandbox',
  'decentraland', 'eos', 'neo', 'kava', 'iota',
  'theta-token', 'kusama', 'waves', 'chiliz', 'harmony',
  'terra-luna-classic', 'dash', 'zilliqa', 'bitcoin-cash', 'gala'
];

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [totalValue, setTotalValue] = useState(0);
  const [prices, setPrices] = useState({});

  const token = localStorage.getItem('token');

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(PORTFOLIO_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;

      if (Array.isArray(data) && data.length > 0) {
        setPortfolio(data);
        setBalance(data[0]?.user?.balance ?? 0);
        fetchPrices(data);
      } else {
        setPortfolio([]);
        setBalance(0);
      }
    } catch (err) {
      console.error('Portföy verisi alınamadı:', err);
      setPortfolio([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrices = async (portfolioData) => {
    const ids = portfolioData.map(p => p.coinId).join(',');
    const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
      params: {
        ids,
        vs_currencies: 'usd'
      }
    });
    setPrices(res.data);
    let total = 0;
    portfolioData.forEach(item => {
      const price = res.data[item.coinId]?.usd || 0;
      total += price * item.quantity;
    });

    setTotalValue(total);
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleTrade = async (type) => {
    if (!selectedCoin || !quantity) {
      setMessage('Lütfen coin ve miktar girin.');
      return;
    }

    try {
      await axios.post(`${TRADE_URL}/${type}`, null, {
        params: {
          coinId: selectedCoin,
          quantity,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(`Coin ${type === 'buy' ? 'satın alındı' : 'satıldı'} `);
      await fetchPortfolio(); // güncelle
    } catch (err) {
      const errMsg = err.response?.data || err.message;
      setMessage(`Hata: ${errMsg}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Dashboard</h2>
      <div className="mb-6 text-center text-lg">
        <span className="font-semibold">Bakiye:</span> {balance} ₺
      </div>

      {/* Al / Sat İşlemi */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md space-y-4">
        <h3 className="text-xl font-semibold">Coin Seçin ve İşlem Yapın</h3>
        <select
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">-- Coin Seçin --</option>
          {COINS.map((coin) => (
            <option key={coin} value={coin}>
              {coin}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Miktar"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <div className="flex space-x-4">
          <button
            onClick={() => handleTrade('buy')}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
          >
            Satın Al
          </button>
          <button
            onClick={() => handleTrade('sell')}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
          >
            Sat
          </button>
        </div>
        {message && <p className="text-center text-sm text-blue-600">{message}</p>}
      </div>

      {/* Portföy Listesi */}
      <h3 className="text-xl font-semibold mb-2">Portföyünüz</h3>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : portfolio.length === 0 ? (
        <p className="text-gray-500">Portföyünüzde coin bulunmamaktadır.</p>
      ) : (
        <div className="grid gap-4">
          {portfolio.map((item) => (
            <div
              key={item.id}
              className="p-4 border border-gray-200 rounded-md bg-white shadow-sm"
            >
              <p className="capitalize text-lg font-medium">Coin: {item.coinId}</p>
              <p>Miktar: {item.quantity}</p>
            </div>
          ))}
           <h2 className="text-xl font-bold mb-4">Toplam Portföy Değeri: ${totalValue.toFixed(2)}</h2>
           <PortfolioChart portfolio={portfolio} prices={prices} />
        </div>
        
      )}
    </div>
  );
};

export default Dashboard;

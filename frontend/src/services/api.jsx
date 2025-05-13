import axios from 'axios';

const API_URL = 'http://localhost:8319/api';

const getPortfolio = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_URL}/trade/portfolio`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Portföy alınırken hata oluştu:', error);
  }
};

const buyCoin = async (coinId, quantity) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post(`${API_URL}/trade/buy`, null, {
      params: { coinId, quantity },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res=>{
      console.log(res);
      alert('Coin başarıyla alındı');
    });
      console.log(response);
   /* if (response.status === 200) {
      alert('Coin başarıyla alındı');
    }*/
  } catch (error) {
    alert('Hata: ' + error.response?.data || error.message);
  }
};

const sellCoin = async (coinId, quantity) => {
  try {
    const token = localStorage.getItem('token');

    await axios.post(`${API_URL}/trade/sell`, null, {
      params: { coinId, quantity },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert('Coin başarıyla satıldı');
  } catch (error) {
    alert('Hata: ' + error.response?.data || error.message);
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });

    localStorage.setItem('token', response.data.token);

    window.location.href = '/dashboard';
  } catch (error) {
    console.error('Giriş başarısız:', error);
  }
};

export default { getPortfolio, buyCoin, sellCoin,loginUser };

import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const HomePage = () => {
    const [ticker, setTicker] = useState('');
    const [buyDate, setBuyDate] = useState('');
    const [chartData, setChartData] = useState(null);
    const [totalReturn, setTotalReturn] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const fetchStockData = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await axios.post('https://your-backend-service.com/api/returns', {
          ticker,
          buyDate,
        });
  
        const { dates, datasets, total_return } = response.data;
  
        setChartData({
          labels: dates,
          datasets,
        });
  
        setTotalReturn(total_return);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Stock Return Calculator</h1>
        <form onSubmit={fetchStockData} style={{ marginBottom: '20px' }}>
          <div>
            <label>
              Stock Ticker:
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                required
                style={{ margin: '5px' }}
              />
            </label>
          </div>
          <div>
            <label>
              Buy Date:
              <input
                type="date"
                value={buyDate}
                onChange={(e) => setBuyDate(e.target.value)}
                required
                style={{ margin: '5px' }}
              />
            </label>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
  
        {totalReturn !== null && (
          <div>
            <h2>Total Return: {totalReturn.toFixed(2)}%</h2>
          </div>
        )}
  
        {chartData && (
          <div style={{ width: '80%', margin: '0 auto' }}>
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        )}
      </div>
    );
  };

export default HomePage;

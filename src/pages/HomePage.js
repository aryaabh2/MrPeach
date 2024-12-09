import React, { useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const HomePage = () => {
  const [ticker, setTicker] = useState("");
  const [buyDate, setBuyDate] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    try {
      setError(null);
      const res = await axios.post("https://mrpeachbackend.onrender.com/api/returns", {
        ticker: ticker.trim(),
        buy_date: buyDate.trim(),
      });
      setResponse(res.data);
    } catch (err) {
      setError(err.response ? err.response.data.error : "An unexpected error occurred.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Stock Return Calculator</h1>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "10px" }}>
          Ticker:
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="Enter stock ticker"
            style={{ marginLeft: "5px", padding: "5px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "10px" }}>
          Buy Date:
          <input
            type="date"
            value={buyDate}
            onChange={(e) => setBuyDate(e.target.value)}
            style={{ marginLeft: "5px", padding: "5px" }}
          />
        </label>
      </div>
      <button
        onClick={fetchStockData}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Calculate Return
      </button>

      <div style={{ marginTop: "20px" }}>
        {response && (
          <div>
            <h2>Results:</h2>
            <p><strong>Total Return:</strong> {response.total_return.toFixed(2)}%</p>
            <h3>Historical Data:</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={response.dates.map((date, index) => ({ date, price: response.datasets[0].data[index] }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#8884d8" name={`${ticker.toUpperCase()} Price`} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

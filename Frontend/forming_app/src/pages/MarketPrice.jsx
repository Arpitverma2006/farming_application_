import React, { useState } from "react";
import "./MarketPrice.css";

const API_KEY = import.meta.env.VITE_DATA_GOV_API_KEY;

function MarketPrice() {
  const [crop, setCrop] = useState("");
  const [state, setState] = useState("");
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchCropPrices = async () => {
    if (!crop.trim()) {
      setError("Please enter crop name");
      return;
    }

    setLoading(true);
    setError("");
    setMarketData([]);

    try {
      let url =
        `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070` +
        `?api-key=${API_KEY}&format=json&limit=50` +
        `&filters[commodity]=${encodeURIComponent(crop)}`;

      if (state.trim()) {
        url += `&filters[state]=${encodeURIComponent(state)}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (!data.records || data.records.length === 0) {
        setError("No mandi price found. Try another crop or state.");
      } else {
        setMarketData(data.records);
      }
    } catch (err) {
      setError("Something went wrong while fetching market prices.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="market-section">
      <div className="market-header">
        <span className="market-badge">Live Market Prices</span>
        <h1>💹 Market Price Dashboard</h1>
        <p>
          Search any crop and get mandi-wise minimum, maximum and modal prices.
        </p>
      </div>

      <div className="market-controls">
        <input
          type="text"
          placeholder="Enter crop name e.g. Wheat, Rice, Onion"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
        />

        <input
          type="text"
          placeholder="Optional state e.g. Uttar Pradesh"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <button className="primary-btn" onClick={searchCropPrices}>
          Search Prices
        </button>
      </div>

      {loading && <div className="empty-market-state">Loading prices...</div>}

      {error && !loading && (
        <div className="empty-market-state">
          <h3>{error}</h3>
        </div>
      )}

      <div className="market-grid">
        {marketData.map((item, index) => (
          <div className="market-card" key={index}>
            <div className="market-card-top">
              <div>
                <span className="crop-category">{item.commodity}</span>
                <h2>{item.market}</h2>
              </div>
            </div>

            <div className="price-row">
              <h3>₹ {item.modal_price}</h3>
              <span>Modal Price / Quintal</span>
            </div>

            <div className="market-info">
              <p><strong>State:</strong> {item.state}</p>
              <p><strong>District:</strong> {item.district}</p>
              <p><strong>Market:</strong> {item.market}</p>
              <p><strong>Variety:</strong> {item.variety}</p>
              <p><strong>Min Price:</strong> ₹ {item.min_price}</p>
              <p><strong>Max Price:</strong> ₹ {item.max_price}</p>
              <p><strong>Date:</strong> {item.arrival_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketPrice;
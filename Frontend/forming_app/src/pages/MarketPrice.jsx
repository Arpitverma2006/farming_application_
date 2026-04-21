import React, { useMemo, useState } from "react";
import "./MarketPrice.css";

const marketData = [
  {
    id: 1,
    crop: "Wheat",
    category: "Cereals",
    market: "Lucknow Mandi",
    state: "Uttar Pradesh",
    price: 2420,
    unit: "per quintal",
    trend: "up",
    change: "+120",
    updated: "Today, 9:30 AM",
  },
  {
    id: 2,
    crop: "Rice",
    category: "Cereals",
    market: "Kanpur Mandi",
    state: "Uttar Pradesh",
    price: 3180,
    unit: "per quintal",
    trend: "down",
    change: "-60",
    updated: "Today, 10:15 AM",
  },
  {
    id: 3,
    crop: "Potato",
    category: "Vegetables",
    market: "Agra Mandi",
    state: "Uttar Pradesh",
    price: 1450,
    unit: "per quintal",
    trend: "up",
    change: "+80",
    updated: "Today, 11:00 AM",
  },
  {
    id: 4,
    crop: "Tomato",
    category: "Vegetables",
    market: "Varanasi Mandi",
    state: "Uttar Pradesh",
    price: 2200,
    unit: "per quintal",
    trend: "stable",
    change: "0",
    updated: "Today, 8:45 AM",
  },
  {
    id: 5,
    crop: "Onion",
    category: "Vegetables",
    market: "Delhi Azadpur",
    state: "Delhi",
    price: 2650,
    unit: "per quintal",
    trend: "up",
    change: "+140",
    updated: "Today, 9:50 AM",
  },
  {
    id: 6,
    crop: "Mustard",
    category: "Oil Seeds",
    market: "Jaipur Mandi",
    state: "Rajasthan",
    price: 6020,
    unit: "per quintal",
    trend: "down",
    change: "-90",
    updated: "Today, 10:40 AM",
  },
  {
    id: 7,
    crop: "Maize",
    category: "Cereals",
    market: "Indore Mandi",
    state: "Madhya Pradesh",
    price: 2110,
    unit: "per quintal",
    trend: "stable",
    change: "0",
    updated: "Today, 12:10 PM",
  },
  {
    id: 8,
    crop: "Soybean",
    category: "Oil Seeds",
    market: "Bhopal Mandi",
    state: "Madhya Pradesh",
    price: 4980,
    unit: "per quintal",
    trend: "up",
    change: "+110",
    updated: "Today, 1:00 PM",
  },
];

function MarketPrice() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Cereals", "Vegetables", "Oil Seeds"];

  const filteredData = useMemo(() => {
    return marketData.filter((item) => {
      const matchesSearch =
        item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.state.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const stats = useMemo(() => {
    const totalMarkets = marketData.length;
    const upCount = marketData.filter((item) => item.trend === "up").length;
    const downCount = marketData.filter((item) => item.trend === "down").length;
    const stableCount = marketData.filter((item) => item.trend === "stable").length;

    return { totalMarkets, upCount, downCount, stableCount };
  }, []);

  const getTrendClass = (trend) => {
    if (trend === "up") return "trend-up";
    if (trend === "down") return "trend-down";
    return "trend-stable";
  };

  const getTrendIcon = (trend) => {
    if (trend === "up") return "📈";
    if (trend === "down") return "📉";
    return "➖";
  };

  return (
    <div className="market-section">
      <div className="market-header">
        <span className="market-badge">Dashboard Market Insights</span>
        <h1>💹 Market Price Dashboard</h1>
        <p>
          Track mandi rates, compare crop prices, and monitor trends to make
          better selling decisions.
        </p>
      </div>

      <div className="market-stats-grid">
        <div className="market-stat-card">
          <span>Total Markets</span>
          <h3>{stats.totalMarkets}</h3>
        </div>
        <div className="market-stat-card">
          <span>Price Rising</span>
          <h3>{stats.upCount}</h3>
        </div>
        <div className="market-stat-card">
          <span>Price Falling</span>
          <h3>{stats.downCount}</h3>
        </div>
        <div className="market-stat-card">
          <span>Stable Rates</span>
          <h3>{stats.stableCount}</h3>
        </div>
      </div>

      <div className="market-controls">
        <div className="market-search-box">
          <input
            type="text"
            placeholder="Search by crop, mandi, or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="market-filter-group">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                selectedCategory === category ? "active-filter" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="market-grid">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div className="market-card" key={item.id}>
              <div className="market-card-top">
                <div>
                  <span className="crop-category">{item.category}</span>
                  <h2>{item.crop}</h2>
                </div>

                <div className={`trend-badge ${getTrendClass(item.trend)}`}>
                  {getTrendIcon(item.trend)} {item.change}
                </div>
              </div>

              <div className="price-row">
                <h3>₹ {item.price}</h3>
                <span>{item.unit}</span>
              </div>

              <div className="market-info">
                <p><strong>Mandi:</strong> {item.market}</p>
                <p><strong>State:</strong> {item.state}</p>
                <p><strong>Updated:</strong> {item.updated}</p>
              </div>

              <div className="market-card-footer">
                <button className="secondary-btn">View Details</button>
                <button className="primary-btn">Set Alert</button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-market-state">
            <div className="empty-icon">🔍</div>
            <h3>No market data found</h3>
            <p>Try changing the search term or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketPrice;
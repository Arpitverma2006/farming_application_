import "./Analytics.css";

function Analytics() {
  const stats = [
    {
      title: "Total Crops",
      value: "12",
      icon: "🌾",
      change: "+8% this month",
    },
    {
      title: "Healthy Crops",
      value: "89%",
      icon: "✅",
      change: "+5% improvement",
    },
    {
      title: "Water Usage",
      value: "18.5K L",
      icon: "💧",
      change: "-3% optimized",
    },
    {
      title: "Estimated Profit",
      value: "₹1,49,500",
      icon: "💰",
      change: "+12% growth",
    },
  ];

  const cropData = [
    { name: "Wheat", health: 92, production: "1.8 Ton", profit: "₹32,000" },
    { name: "Rice", health: 88, production: "2.4 Ton", profit: "₹41,500" },
    { name: "Maize", health: 85, production: "1.3 Ton", profit: "₹24,000" },
    { name: "Sugarcane", health: 90, production: "3.2 Ton", profit: "₹52,000" },
  ];

  const insights = [
    "Rice is currently the top profit-generating crop.",
    "Maize needs fertilizer monitoring for better output.",
    "Water usage has improved compared to last cycle.",
    "Overall crop health is stable and improving.",
  ];

  return (
    <div className="analytics-container">
      <div className="analytics-top">
        <div>
          <h2>Farm Analytics</h2>
          <p>Track performance, crop health, water usage, and earnings for Unnati Krashi.</p>
        </div>
      </div>

      <div className="analytics-stats">
        {stats.map((item, index) => (
          <div className="analytics-stat-card" key={index}>
            <div className="stat-icon">{item.icon}</div>
            <div className="stat-info">
              <h4>{item.title}</h4>
              <h3>{item.value}</h3>
              <span>{item.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="analytics-main-grid">
        <div className="analytics-panel">
          <div className="panel-header">
            <h3>Crop Productivity</h3>
            <span>Season Overview</span>
          </div>

          <div className="progress-group">
            <div className="progress-item">
              <div className="progress-title">
                <span>Wheat</span>
                <span>75%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill wheat-fill"></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-title">
                <span>Rice</span>
                <span>90%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill rice-fill"></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-title">
                <span>Maize</span>
                <span>65%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill maize-fill"></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-title">
                <span>Sugarcane</span>
                <span>95%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill sugarcane-fill"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-panel">
          <div className="panel-header">
            <h3>Smart Insights</h3>
            <span>AI Summary</span>
          </div>

          <div className="insights-list">
            {insights.map((item, index) => (
              <div className="insight-card" key={index}>
                <span className="insight-dot"></span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="analytics-panel analytics-table-panel">
        <div className="panel-header">
          <h3>Crop Performance Details</h3>
          <span>Live Farm Snapshot</span>
        </div>

        <div className="table-wrapper">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Crop</th>
                <th>Health</th>
                <th>Production</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              {cropData.map((crop, index) => (
                <tr key={index}>
                  <td>{crop.name}</td>
                  <td>{crop.health}%</td>
                  <td>{crop.production}</td>
                  <td>{crop.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
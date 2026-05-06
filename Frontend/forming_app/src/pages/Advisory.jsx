import React from "react";
import "./advisory.css";

function Advisory() {
  const advisoryData = [
    {
      icon: "🌾",
      title: "Crop Advisory",
      desc: "Best crops to grow based on season and soil conditions.",
      advices: [
        "Grow wheat, mustard in Rabi season",
        "Grow rice, maize in Kharif season",
        "Use certified seeds",
        "Practice crop rotation",
      ],
    },
    {
      icon: "🐛",
      title: "Pest Control",
      desc: "Protect crops from harmful insects and diseases.",
      advices: [
        "Use neem-based pesticides",
        "Check crops weekly",
        "Remove infected plants",
        "Avoid chemical overuse",
      ],
    },
    {
      icon: "💧",
      title: "Irrigation Tips",
      desc: "Efficient water usage for better productivity.",
      advices: [
        "Water early morning/evening",
        "Use drip irrigation",
        "Avoid overwatering",
        "Check soil moisture",
      ],
    },
    {
      icon: "🌦",
      title: "Weather Advisory",
      desc: "Plan activities based on weather conditions.",
      advices: [
        "Avoid spraying before rain",
        "Harvest before storms",
        "Check daily forecast",
        "Protect crops in heat",
      ],
    },
    {
      icon: "🧪",
      title: "Soil Health",
      desc: "Improve soil fertility and nutrients.",
      advices: [
        "Test soil regularly",
        "Use organic compost",
        "Maintain soil pH",
        "Avoid excess fertilizers",
      ],
    },
    {
      icon: "🚜",
      title: "Modern Techniques",
      desc: "Use modern farming technology.",
      advices: [
        "Use farming apps",
        "Try precision farming",
        "Use sensors",
        "Adopt new machinery",
      ],
    },
  ];

  return (
    <div className="advisory-wrapper">
      
      {/* Header */}
      <div className="advisory-header">
        <h1>🌱 Farming Advisory</h1>
        <p>Smart farming guidance for better yield and productivity</p>
      </div>

      {/* Vision Section */}
      <div className="vision-box">
        <h2>Our Vision</h2>
        <p>
          To empower farmers with knowledge, modern techniques, and smart
          advisory solutions for sustainable agriculture and higher profits.
        </p>
      </div>

      {/* Cards */}
      <div className="advisory-grid">
        {advisoryData.map((item, index) => (
          <div className="advisory-card" key={index}>
            <div className="advisory-icon">{item.icon}</div>

            <h3>{item.title}</h3>
            <p>{item.desc}</p>

            <ul className="advice-list">
              {item.advices.map((advice, i) => (
                <li key={i}>{advice}</li>
              ))}
            </ul>

            {/* GOOGLE SEARCH BUTTON */}
            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/search?q=${encodeURIComponent(
                    item.title + " farming advice"
                  )}`,
                  "_blank"
                )
              }
            >
              View More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Advisory;
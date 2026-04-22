import "./Dashboard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBot from "./ChatBot";
import Weather from "./Weather"; // ✅ IMPORT ADDED
import Crops from "./Crops";
import MarketPrice from "./MarketPrice";
import Analytics from "./Analytics";

function Dashboard() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: storedUser.name || "Farmer Name",
    email: storedUser.email || "farmer@example.com",
    headline:
      storedUser.headline || "🌾 Smart Farmer | Agri-Tech Enthusiast",
    location: storedUser.location || "India",
    about:
      storedUser.about ||
      "Passionate farmer using modern technology to improve crop yield and sustainability.",
    phone: storedUser.phone || "",
    image: storedUser.image || "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setProfile(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(profile));
    const updatedUser = JSON.parse(localStorage.getItem("user"));
    setProfile(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>🌾 Unnati Krashi</h2>

        <ul>
          <li
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            🏠 Profile
          </li>

          <li
            className={activeTab === "weather" ? "active" : ""}
            onClick={() => setActiveTab("weather")}
          >
            🌦 Weather
          </li>

          <li
            className={activeTab === "crops" ? "active" : ""}
            onClick={() => setActiveTab("crops")}
          >
            🌱 Crops
          </li>

          <li
            className={activeTab === "market" ? "active" : ""}
            onClick={() => setActiveTab("market")}
          >
            💰 Market Prices
          </li>

          <li
            className={activeTab === "analytics" ? "active" : ""}
            onClick={() => setActiveTab("analytics")}
          >
            📊 Analytics
          </li>
        </ul>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div className="profile-page">

            <div className="profile-banner"></div>

            <div className="profile-container">

              <div className="profile-left">

                <div className="profile-header">

                  <div className="avatar large">
                    {profile.image ? (
                      <img src={profile.image} alt="profile" />
                    ) : (
                      profile.name?.charAt(0)?.toUpperCase()
                    )}
                  </div>

                  {isEditing && (
                    <input type="file" onChange={handleImageUpload} />
                  )}

                  <div className="profile-basic-info">
                    {isEditing ? (
                      <>
                        <input name="name" value={profile.name} onChange={handleChange} />
                        <input name="headline" value={profile.headline} onChange={handleChange} />
                        <input name="location" value={profile.location} onChange={handleChange} />
                      </>
                    ) : (
                      <>
                        <h2>{profile.name}</h2>
                        <p className="headline">{profile.headline}</p>
                        <p className="location">📍 {profile.location}</p>
                      </>
                    )}
                  </div>

                  <div className="edit-btn-container">
                    {isEditing ? (
                      <button onClick={handleSave} className="save-btn">Save</button>
                    ) : (
                      <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
                    )}
                  </div>

                </div>

                <div className="profile-section">
                  <h3>About</h3>
                  {isEditing ? (
                    <textarea name="about" value={profile.about} onChange={handleChange} />
                  ) : (
                    <p>{profile.about}</p>
                  )}
                </div>

                <div className="profile-section">
                  <h3>Skills</h3>
                  <div className="skills">
                    <span>Crop Management</span>
                    <span>Soil Analysis</span>
                    <span>Smart Irrigation</span>
                    <span>Agri-Tech Tools</span>
                  </div>
                </div>

              </div>

              <div className="profile-right">
                <div className="profile-card small">
                  <h4>Contact Info</h4>
                  {isEditing ? (
                    <>
                      <input name="email" value={profile.email} onChange={handleChange} />
                      <input name="phone" value={profile.phone} onChange={handleChange} />
                    </>
                  ) : (
                    <>
                      <p>📧 {profile.email}</p>
                      <p>📱 {profile.phone || "Not added"}</p>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* WEATHER TAB */}
        {activeTab === "weather" && (
          <div className="tab-wrapper">
            <Weather />
          </div>
        )}

        {/* OTHER TABS */}
        {activeTab === "crops" && <div className="placeholder"><Crops /></div>}
        {activeTab === "market" && <div className="placeholder"><h2><MarketPrice/></h2></div>}
        {activeTab === "analytics" && <div className="placeholder"><h2><Analytics/></h2></div>}

      </div>

      <ChatBot />
    </div>
  );
}

export default Dashboard;
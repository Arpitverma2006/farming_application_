import "./Dashboard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBot from "./ChatBot";
import Weather from "./Weather";
import Crops from "./Crops";
import MarketPrice from "./MarketPrice";
// import Analytics from "./Analytics";

function Dashboard() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [language, setLanguage] = useState("en");

  const text = {
    en: {
      title: "🌾 Unnati Krashi",
      profile: "🏠 Profile",
      weather: "🌦 Weather",
      crops: "🌱 Crops",
      market: "💰 Market Prices",
      logout: "Logout",
      edit: "Edit",
      save: "Save",
      about: "About",
      skills: "Skills",
      contact: "Contact Info",
      notAdded: "Not added",
      enterName: "Enter Your Name",
      summary: "Profile Summary",
      locationPlaceholder: "Enter Your Location",
      skillsPlaceholder: "Enter skills separated by comma",
    },

    hi: {
      title: "🌾 उन्नति कृषि",
      profile: "🏠 प्रोफाइल",
      weather: "🌦 मौसम",
      crops: "🌱 फसलें",
      market: "💰 बाजार मूल्य",
      logout: "लॉगआउट",
      edit: "संपादित करें",
      save: "सेव करें",
      about: "परिचय",
      skills: "कौशल",
      contact: "संपर्क जानकारी",
      notAdded: "जोड़ा नहीं गया",
      enterName: "अपना नाम दर्ज करें",
      summary: "प्रोफाइल सारांश",
      locationPlaceholder: "अपना स्थान दर्ज करें",
      skillsPlaceholder: "कौशल कॉमा से अलग करके दर्ज करें",
    },
  };

  const translateDynamic = (value) => {
    if (language === "en") return value;

    const dictionary = {
      "Farmer Name": "किसान का नाम",

      "🌾 Smart Farmer | Agri-Tech Enthusiast":
        "🌾 स्मार्ट किसान | कृषि तकनीक उत्साही",

      India: "भारत",

      "Passionate farmer using modern technology to improve crop yield and sustainability.":
        "फसल उत्पादन और स्थिरता बढ़ाने के लिए आधुनिक तकनीक का उपयोग करने वाला उत्साही किसान।",

      "Crop Management": "फसल प्रबंधन",
      "Soil Analysis": "मिट्टी विश्लेषण",
      "Smart Irrigation": "स्मार्ट सिंचाई",
      "Agri-Tech Tools": "कृषि तकनीक उपकरण",
    };

    return dictionary[value] || value;
  };

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

    skills:
      storedUser.skills ||
      "Crop Management, Soil Analysis, Smart Irrigation, Agri-Tech Tools",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setProfile({
        name: user.name || "Farmer Name",
        email: user.email || "farmer@example.com",
        headline:
          user.headline || "🌾 Smart Farmer | Agri-Tech Enthusiast",
        location: user.location || "India",
        about:
          user.about ||
          "Passionate farmer using modern technology to improve crop yield and sustainability.",
        phone: user.phone || "",
        image: user.image || "",
        skills:
          user.skills ||
          "Crop Management, Soil Analysis, Smart Irrigation, Agri-Tech Tools",
      });
    }
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
        <h2>{text[language].title}</h2>

        {/* Language Button */}
        <button
          className="lang-btn"
          onClick={() =>
            setLanguage(language === "en" ? "hi" : "en")
          }
        >
          {language === "en" ? "हिंदी" : "English"}
        </button>

        <ul>
          <li
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            {text[language].profile}
          </li>

          <li
            className={activeTab === "weather" ? "active" : ""}
            onClick={() => setActiveTab("weather")}
          >
            {text[language].weather}
          </li>

          <li
            className={activeTab === "crops" ? "active" : ""}
            onClick={() => setActiveTab("crops")}
          >
            {text[language].crops}
          </li>

          <li
            className={activeTab === "market" ? "active" : ""}
            onClick={() => setActiveTab("market")}
          >
            {text[language].market}
          </li>

          {/* <li
            className={activeTab === "analytics" ? "active" : ""}
            onClick={() => setActiveTab("analytics")}
          >
            📊 Analytics
          </li> */}
        </ul>

        <button onClick={handleLogout} className="logout-btn">
          {text[language].logout}
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
                        <input
                          name="name"
                          placeholder={text[language].enterName}
                          value={profile.name}
                          onChange={handleChange}
                        />

                        <input
                          name="headline"
                          placeholder={text[language].summary}
                          value={profile.headline}
                          onChange={handleChange}
                        />

                        <input
                          name="location"
                          placeholder={
                            text[language].locationPlaceholder
                          }
                          value={profile.location}
                          onChange={handleChange}
                        />
                      </>
                    ) : (
                      <>
                        <h2>{translateDynamic(profile.name)}</h2>

                        <p className="headline">
                          {translateDynamic(profile.headline)}
                        </p>

                        <p className="location">
                          📍 {translateDynamic(profile.location)}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="edit-btn-container">
                    {isEditing ? (
                      <button
                        onClick={handleSave}
                        className="save-btn"
                      >
                        {text[language].save}
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="edit-btn"
                      >
                        {text[language].edit}
                      </button>
                    )}
                  </div>
                </div>

                <div className="profile-section">
                  <h3>{text[language].about}</h3>

                  {isEditing ? (
                    <textarea
                      name="about"
                      value={profile.about}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{translateDynamic(profile.about)}</p>
                  )}
                </div>

                <div className="profile-section">
                  <h3>{text[language].skills}</h3>

                  {isEditing ? (
                    <textarea
                      name="skills"
                      value={profile.skills}
                      onChange={handleChange}
                      placeholder={text[language].skillsPlaceholder}
                    />
                  ) : (
                    <div className="skills">
                      {profile.skills
                        ?.split(",")
                        .filter((skill) => skill.trim() !== "")
                        .map((skill, index) => (
                          <span key={index}>
                            {translateDynamic(skill.trim())}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="profile-right">
                <div className="profile-card small">
                  <h4>{text[language].contact}</h4>

                  {isEditing ? (
                    <>
                      <input
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                      />

                      <input
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                      />
                    </>
                  ) : (
                    <>
                      <p>📧 {profile.email}</p>

                      <p>
                        📱 {profile.phone || text[language].notAdded}
                      </p>
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

        {/* CROPS TAB */}
        {activeTab === "crops" && (
          <div className="placeholder">
            <Crops />
          </div>
        )}

        {/* MARKET TAB */}
        {activeTab === "market" && (
          <div className="placeholder">
            <h2>
              <MarketPrice />
            </h2>
          </div>
        )}

        {/* ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="placeholder">
            <h2>
              {/* <Analytics /> */}
            </h2>
          </div>
        )}
      </div>

      <ChatBot />
    </div>
  );
}

export default Dashboard;
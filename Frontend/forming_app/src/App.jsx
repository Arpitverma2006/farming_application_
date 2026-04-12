import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/Registration.jsx";
import Weather from "./pages/Weather.jsx";
import MarketPlace from "./pages/MarketPlace.jsx";
import Advisory from "./pages/Advisory.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ChatBot from "./pages/ChatBot.jsx";
import UserPortal from "./pages/UserPortal.jsx";
import Crops from "./pages/Crops.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/weather" element={<Weather/>}/>
        <Route path="/marketplace" element={<MarketPlace/>}/>
        <Route path="/advisory" element={<Advisory/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatbot" element={<ChatBot/>}/>
        <Route path="/userportal" element={<UserPortal/>}></Route>
        <Route path="/crops" element={<Crops/>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
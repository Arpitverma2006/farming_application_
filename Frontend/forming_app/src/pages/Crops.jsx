import React, { useState } from "react";
import "./Crops.css";

function Crops() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return alert("Upload image first");

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="crops-wrapper">
      <h1>🌱 Crop Disease Detection</h1>

      <input type="file" onChange={handleImage} />

      {preview && <img src={preview} alt="preview" className="preview" />}

      <button onClick={handleUpload}>
        {loading ? "Analyzing..." : "Detect Disease"}
      </button>

      {result && (
        <div className="result">
          <h2>Result</h2>
          <p>🦠 {result.disease}</p>
          <p>📊 {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}

export default Crops;
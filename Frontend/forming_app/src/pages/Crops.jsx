import React, { useMemo, useState } from "react";
import "./Crops.css";

function Crops() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const confidenceValue = useMemo(() => {
    if (!result || result.error || typeof result.confidence !== "number") return 0;
    return Math.max(0, Math.min(100, result.confidence));
  }, [result]);

  const severityLabel = useMemo(() => {
    if (!result || result.error || typeof result.confidence !== "number") return "";
    if (result.confidence >= 90) return "High confidence";
    if (result.confidence >= 70) return "Moderate confidence";
    return "Low confidence";
  }, [result]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Upload image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setResult({
          error: data.error || "Something went wrong while analyzing the image.",
        });
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error(err);
      setResult({
        error: "Server connection failed. Please check backend.",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderList = (items) => {
    if (!items || items.length === 0) return null;
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="crops-section">
      <div className="crops-wrapper">
        <div className="hero-section">
          <span className="hero-badge">AI Smart Farming Assistant</span>
          <h1>🌱 Crop Disease Detection & Advisory</h1>
          <p>
            Upload a crop leaf image to detect disease and get guidance on
            identification, damage, treatment, and prevention.
          </p>
        </div>

        <div className="upload-card">
          <div className="upload-left">
            <label className="file-label">
              <span className="file-label-text">Choose Crop Image</span>
              <input type="file" accept="image/*" onChange={handleImage} />
            </label>

            <button
              className="analyze-btn"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Detect Disease"}
            </button>
          </div>

          <div className="upload-right">
            {preview ? (
              <div className="preview-card">
                <img src={preview} alt="preview" className="preview" />
                <p className="preview-text">Selected image preview</p>
              </div>
            ) : (
              <div className="preview-placeholder">
                <div className="placeholder-icon">📷</div>
                <p>No image selected yet</p>
                <span>Upload a leaf image to begin analysis</span>
              </div>
            )}
          </div>
        </div>

        {loading && (
          <div className="status-box loading-box">
            <div className="spinner"></div>
            <p>Analyzing image and preparing advisory...</p>
          </div>
        )}

        {result && result.error && (
          <div className="result error-box">
            <h2>⚠ Error</h2>
            <p>{result.error}</p>
          </div>
        )}

        {result && !result.error && (
          <div className="result">
            <div className="result-header">
              <div>
                <h2>Analysis Result</h2>
                <p className="result-subtitle">
                  Disease prediction with confidence and expert advisory
                </p>
              </div>
              <div className="result-badge">{severityLabel}</div>
            </div>

            <div className="summary-grid">
              <div className="summary-card">
                <span className="summary-label">Detected Disease</span>
                <h3>🦠 {result.disease || "Not available"}</h3>
              </div>

              <div className="summary-card">
                <span className="summary-label">Confidence Score</span>
                <h3>📊 {confidenceValue}%</h3>
                <div className="confidence-bar">
                  <div
                    className="confidence-fill"
                    style={{ width: `${confidenceValue}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {result.advisory && (
              <div className="advisory-grid">
                {result.advisory.crop_status && (
                  <div className="advisory-card full-width">
                    <h3>🌾 Crop Status</h3>
                    <p>{result.advisory.crop_status}</p>
                  </div>
                )}

                {result.advisory.identification?.length > 0 && (
                  <div className="advisory-card">
                    <h3>🔍 Identification</h3>
                    {renderList(result.advisory.identification)}
                  </div>
                )}

                {result.advisory.damage?.length > 0 && (
                  <div className="advisory-card">
                    <h3>⚠ Damage</h3>
                    {renderList(result.advisory.damage)}
                  </div>
                )}

                {result.advisory.possible_insects?.length > 0 && (
                  <div className="advisory-card">
                    <h3>🐛 Possible Insects / Related Risk</h3>
                    {renderList(result.advisory.possible_insects)}
                  </div>
                )}

                {result.advisory.treatment?.organic?.length > 0 && (
                  <div className="advisory-card">
                    <h3>🌿 Organic Treatment</h3>
                    {renderList(result.advisory.treatment.organic)}
                  </div>
                )}

                {result.advisory.treatment?.chemical?.length > 0 && (
                  <div className="advisory-card">
                    <h3>💊 Chemical Treatment</h3>
                    {renderList(result.advisory.treatment.chemical)}
                  </div>
                )}

                {result.advisory.prevention?.length > 0 && (
                  <div className="advisory-card full-width">
                    <h3>🛡 Prevention Tips</h3>
                    {renderList(result.advisory.prevention)}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Crops;
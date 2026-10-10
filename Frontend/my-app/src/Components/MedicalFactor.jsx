import React, { useState } from "react";
import "./MedicalFactor.css";
import { useNavigate } from "react-router-dom";

export default function MedicalFactorsForm({
  formData,
  updateForm,
  clearMedicalData,
  disabled
}) {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [bmiGlowing, setBmiGlowing] = useState(false);
  const navigate = useNavigate();

  /* ------------------ Helpers ------------------ */

  const safeSet = (field, value) => {
    if (disabled) return;
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    updateForm({ [field]: value });
  };

  const validatePositive = (field, value) => {
    if (disabled) return;

    if (value === "") {
      updateForm({ [field]: "" });
      return;
    }

    const num = Number(value);
    if (isNaN(num) || num < 0) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Enter a valid positive number"
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, [field]: undefined }));
    updateForm({ [field]: num });
  };

  /* ------------------ BMI ------------------ */

  const calculateBMI = () => {
    const height = Number(formData.height);
    const weight = Number(formData.weight);

    if (!height || !weight) {
      setStatus("Enter valid height and weight to calculate BMI.");
      return;
    }

    const bmi = +(weight / ((height / 100) ** 2)).toFixed(1);
    updateForm({ bmi });
    setStatus("");
    // Trigger glow animation
    setBmiGlowing(true);
    setTimeout(() => setBmiGlowing(false), 1500);
  };

  /* ------------------ Submit ------------------ */

  const handleSubmit = async () => {
    if (disabled) return;

    setErrors({});
    setStatus("");

    const requiredFields = [
      "bmi",
      "systolic",
      "diastolic",
      "cholesterol",
      "diabetes",
      "smoking",
      "alcohol"
    ];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("Please fix the highlighted errors.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/predicts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.message || "Submission failed");
        return;
      }

      // ✅ SUCCESS
      navigate("/prediction-result", {
        state: { result: data }
      });

      // 🧹 CLEAR MEDICAL DATA (App.jsx)
      clearMedicalData();

      setErrors({});
      setStatus("");

    } catch (err) {
      console.error(err);
      setStatus("Server error. Please try again.");
    }
  };

  /* ------------------ UI ------------------ */

  return (
    <div className={`medical-form-container ${disabled ? "disabled-box" : ""}`}>
      <h2>⚕ Medical Factors</h2>

      {disabled && (
        <p className="disabled-msg">
          ⚡ Complete Policyholder details first to unlock Medical Factors.
        </p>
      )}

      {status && <p className="error-text">{status}</p>}

      {/* BMI */}
      <div className="form-group">
        <label>BMI *</label>
        <input
          type="number"
          value={formData.bmi || ""}
          onChange={(e) => validatePositive("bmi", e.target.value)}
          disabled={disabled}
          className={`form-input ${bmiGlowing ? "bmi-result-glow" : ""}`}
        />
        {errors.bmi && <p className="error-text">{errors.bmi}</p>}

        <div className="bmi-row">
          <input
            type="number"
            placeholder="Height (cm)"
            value={formData.height || ""}
            onChange={(e) => validatePositive("height", e.target.value)}
            disabled={disabled}
            className="form-input small-input"
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={formData.weight || ""}
            onChange={(e) => validatePositive("weight", e.target.value)}
            disabled={disabled}
            className="form-input small-input"
          />
          <button
            type="button"
            className="calc-btn"
            onClick={calculateBMI}
            disabled={disabled}
          >
            Calculate BMI
          </button>
        </div>
      </div>

      {/* Blood Pressure */}
      <div className="form-group">
        <label>Blood Pressure *</label>
        <div className="bp-row">
          <input
            type="number"
            placeholder="Systolic"
            value={formData.systolic || ""}
            onChange={(e) => validatePositive("systolic", e.target.value)}
            disabled={disabled}
            className="form-input small-input"
          />
          <input
            type="number"
            placeholder="Diastolic"
            value={formData.diastolic || ""}
            onChange={(e) => validatePositive("diastolic", e.target.value)}
            disabled={disabled}
            className="form-input small-input"
          />
        </div>
        {errors.systolic && <p className="error-text">{errors.systolic}</p>}
        {errors.diastolic && <p className="error-text">{errors.diastolic}</p>}
      </div>

      {/* Cholesterol */}
      <div className="form-group">
        <label>Cholesterol *</label>
        <input
          type="number"
          value={formData.cholesterol || ""}
          onChange={(e) => validatePositive("cholesterol", e.target.value)}
          disabled={disabled}
          className="form-input"
        />
        {errors.cholesterol && (
          <p className="error-text">{errors.cholesterol}</p>
        )}
      </div>

      {/* Select Fields */}
      {["diabetes", "smoking", "alcohol"].map((field) => (
        <div className="form-group" key={field}>
          <label>{field.toUpperCase()} *</label>
          <select
            value={formData[field] || ""}
            onChange={(e) => safeSet(field, e.target.value)}
            disabled={disabled}
            className="form-select"
          >
            <option value="">-- Select --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors[field] && <p className="error-text">{errors[field]}</p>}
        </div>
      ))}

      {/* Submit */}
      <button
        type="button"
        className="calc-btn primary"
        onClick={handleSubmit}
        disabled={disabled}
      >
        Submit Medical Data
      </button>
    </div>
  );
}

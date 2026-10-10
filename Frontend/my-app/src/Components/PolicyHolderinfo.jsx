import React, { useState } from "react";
import "./PolicyForm.css";

export default function PolicyForm({ formData, updateForm, onComplete }) {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const validate = (values) => {
    const errs = {};

    // Name validation
    if (!values.name || String(values.name).trim() === "") {
      errs.name = "Name is required.";
    } else if (String(values.name).trim().length < 2) {
      errs.name = "Name must be at least 2 characters.";
    } else if (!/^[A-Za-z\s.'-]+$/.test(String(values.name).trim())) {
      errs.name = "Name contains invalid characters.";
    }

    // Age validation
    if (values.age === "" || values.age === null || values.age === undefined) {
      errs.age = "Age is required.";
    } else {
      // coerce to number safely
      const n = Number(values.age);
      if (!Number.isInteger(n)) errs.age = "Age must be an integer.";
      else if (n < 18 || n > 100) errs.age = "Age must be between 18 and 100.";
    }

    // Gender validation
    const allowedGenders = ["Male", "Female", "Other"];
    if (!values.gender) errs.gender = "Gender is required.";
    else if (!allowedGenders.includes(values.gender))
      errs.gender = "Invalid gender selected.";

    // Family member validation
    if (
      values.familyCount === "" ||
      values.familyCount === null ||
      values.familyCount === undefined
    ) {
      errs.familyCount = "Family members count is required.";
    } else {
      const f = Number(values.familyCount);
      if (!Number.isInteger(f)) errs.familyCount = "Must be an integer.";
      else if (f < 1) errs.familyCount = "Minimum 1 family member required.";
      else if (f > 20) errs.familyCount = "Family size seems unusually large.";
    }

    return errs;
  };

  // update field (coerce numbers for numeric inputs)
  const updateField = (field, rawValue) => {
    let value = rawValue;

    // For number inputs, keep '' for empty, otherwise convert to integer
    if (field === "age" || field === "familyCount") {
      if (value === "" || value === null) {
        value = "";
      } else {
        // remove leading zeros / whitespace and parse
        const parsed = parseInt(String(value).trim(), 10);
        value = Number.isNaN(parsed) ? value : parsed;
      }
    }

    updateForm({ [field]: value });

    // run validation on-the-fly
    const validation = validate({ ...formData, [field]: value });
    setErrors(validation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    const validation = validate(formData);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      setMessage({ type: "error", text: "Please fix validation errors." });
      return;
    }

    // If form is valid, call completion handler if provided
    if (onComplete) onComplete(formData);

    setMessage({ type: "success", text: "Policyholder details completed." });
  };

  return (
    <div className="form-container blue-theme" role="region" aria-labelledby="policyform-title">
      <h2 id="policyform-title">Policyholder Details</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="pf-name">Full Name</label>
          <input
            id="pf-name"
            name="name"
            type="text"
            className="form-input"
            value={formData.name ?? ""}
            onChange={(e) => updateField("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "err-name" : undefined}
            required
          />
          {errors.name && (
            <p className="error-text" id="err-name" role="alert">{errors.name}</p>
          )}
        </div>

        {/* Age */}
        <div className="form-group">
          <label className="form-label" htmlFor="pf-age">Age</label>
          <input
            id="pf-age"
            name="age"
            type="number"
            className="form-input"
            value={formData.age ?? ""}
            onChange={(e) => updateField("age", e.target.value)}
            min="18"
            max="100"
            aria-invalid={!!errors.age}
            aria-describedby={errors.age ? "err-age" : undefined}
            required
          />
          {errors.age && (
            <p className="error-text" id="err-age" role="alert">{errors.age}</p>
          )}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label className="form-label" htmlFor="pf-gender">Gender</label>
          <select
            id="pf-gender"
            name="gender"
            className="form-select"
            value={formData.gender ?? ""}
            onChange={(e) => updateField("gender", e.target.value)}
            aria-invalid={!!errors.gender}
            aria-describedby={errors.gender ? "err-gender" : undefined}
            required
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="error-text" id="err-gender" role="alert">{errors.gender}</p>
          )}
        </div>

        {/* Number of Family Members */}
        <div className="form-group">
          <label className="form-label" htmlFor="pf-familyCount">Number of Family Members</label>
          <input
            id="pf-familyCount"
            name="familyCount"
            type="number"
            className="form-input"
            value={formData.familyCount ?? ""}
            onChange={(e) => updateField("familyCount", e.target.value)}
            min="1"
            aria-invalid={!!errors.familyCount}
            aria-describedby={errors.familyCount ? "err-familyCount" : undefined}
            required
          />
          {errors.familyCount && (
            <p className="error-text" id="err-familyCount" role="alert">{errors.familyCount}</p>
          )}
        </div>

        <button className="submit-btn" type="submit" aria-label="Save Policyholder">
          Save Policyholder
        </button>
      </form>

      {message && (
        <div
          className={`message-box ${message.type === "success" ? "success-box" : "error-box"}`}
          role={message.type === "success" ? "status" : "alert"}
          aria-live="polite"
        >
          {message.text}
        </div>
      )}
    </div>
  );
}

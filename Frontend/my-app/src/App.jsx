import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PolicyForm from "./Components/PolicyHolderinfo";
import MedicalFactor from "./Components/MedicalFactor";
import PredictionResult from "./Pages/ResultPage";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Docs from "./Components/Docs";

/* ✅ SINGLE SOURCE OF TRUTH */
const INITIAL_FORM_DATA = {
  name: "",
  age: "",
  gender: "",
  familyCount: "",

  height: "",
  weight: "",
  bmi: "",
  systolic: "",
  diastolic: "",
  cholesterol: "",
  diabetes: "",
  smoking: "",
  alcohol: "",
};

export default function App() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [policyDone, setPolicyDone] = useState(false);

  const updateForm = (values) => {
    setFormData((prev) => ({ ...prev, ...values }));
  };

  const clearMedicalData = () => {
    setFormData((prev) => ({
      ...prev,
      height: "",
      weight: "",
      bmi: "",
      systolic: "",
      diastolic: "",
      cholesterol: "",
      diabetes: "",
      smoking: "",
      alcohol: "",
    }));
    setPolicyDone(false);
  };

  return (
    <BrowserRouter>
      <div className="app-canvas bio-lumina-theme">
        {/* Background Elements */}
        <div className="bg-grid"></div>
        <div className="dna-helix"></div>
        
        {/* Floating Particles */}
        <div className="particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={`particle p-${i}`}></div>
          ))}
        </div>

        <div className="app-content">
          <Navbar />

          <Routes>
            {/* 🏠 HOME / PREDICT PAGE */}
            <Route
              path="/"
              element={
                <div className="forms-wrapper layout-stack">
                  <PolicyForm
                    formData={formData}
                    updateForm={updateForm}
                    onComplete={() => setPolicyDone(true)}
                  />

                  <MedicalFactor
                    formData={formData}
                    updateForm={updateForm}
                    clearMedicalData={clearMedicalData}
                    disabled={!policyDone}
                  />
                </div>
              }
            />

            {/* 🔁 SAME PAGE AS HOME (Predict button) */}
            <Route
              path="/predict"
              element={
                <div className="forms-wrapper layout-stack">
                  <PolicyForm
                    formData={formData}
                    updateForm={updateForm}
                    onComplete={() => setPolicyDone(true)}
                  />

                  <MedicalFactor
                    formData={formData}
                    updateForm={updateForm}
                    clearMedicalData={clearMedicalData}
                    disabled={!policyDone}
                  />
                </div>
              }
            />

            {/* 📊 RESULT */}
            <Route
              path="/prediction-result"
              element={<PredictionResult />}
            />

            {/* 📘 INFO PAGES */}
            <Route path="/about" element={<About />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

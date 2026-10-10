import { useLocation, useNavigate } from "react-router-dom";
import "./ResultPage.css";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const data = state?.result;

  if (!data) {
    return (
      <div className="report-container">
        <h2 className="report-title">No Prediction Data</h2>
        <button className="back-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="report-container">
      <h1 className="report-title">Insurance Prediction Report</h1>

      <div className="report-card">
        <div className="row">
          <span>Name</span>
          <strong>{data.name}</strong>
        </div>

        <div className="row">
          <span>Age</span>
          <strong>{data.age}</strong>
        </div>

        <div className="row">
          <span>Gender</span>
          <strong>{data.gender}</strong>
        </div>

        <div className="row">
          <span>BMI</span>
          <strong>{data.bmi}</strong>
        </div>

        <div className="row">
          <span>Blood Pressure</span>
          <strong>
            {data.systolic}/{data.diastolic} ({data.bp_level})
          </strong>
        </div>

        <div className="row">
          <span>Cholesterol</span>
          <strong>
            {data.cholesterol} ({data.cholesterol_level})
          </strong>
        </div>

        <div className="row">
          <span>Diabetes</span>
          <strong>{data.diabetes ? "Yes" : "No"}</strong>
        </div>

        <div className="row">
          <span>Smoking</span>
          <strong>{data.smoking ? "Yes" : "No"}</strong>
        </div>

        <div className="row">
          <span>Alcohol</span>
          <strong>{data.alcohol ? "Yes" : "No"}</strong>
        </div>

        <div className="row">
          <span>Family Members</span>
          <strong>{data.family_members}</strong>
        </div>

        <div className="premium-box">
          <span>Predicted Insurance Premium</span>
          <h2>₹ {data.predicted_premium.toFixed(2)}</h2>
        </div>

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  );
}

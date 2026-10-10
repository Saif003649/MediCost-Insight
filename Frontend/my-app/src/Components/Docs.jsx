import "./Shared.css"


export default function Docs() {
  return (
    <section className="page-container">
      <h1>MediCost Insight Documentation</h1>

      <div className="info-card">
        <h2>📦 Technology Stack</h2>
        <ul>
          <li>React + Vite (Frontend)</li>
          <li>Flask REST API (Backend)</li>
          <li>Random Forest Regression (ML)</li>
          <li>Pandas, NumPy, Scikit-learn</li>
        </ul>
      </div>

      <div className="info-card">
        <h2>🧠 Prediction Workflow</h2>
        <ol>
          <li>User enters personal & medical details</li>
          <li>Data is preprocessed & encoded</li>
          <li>ML model predicts insurance premium</li>
          <li>Risk categories are derived for display</li>
        </ol>
      </div>

      <div className="info-card">
        <h2>🔐 Data Usage</h2>
        <p>
          This system is built for academic and educational purposes.
          No real user data is stored or shared.
        </p>
      </div>
    </section>
  );
}

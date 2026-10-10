import "./Shared.css"


export default function About() {
  return (
    <section className="page-container">
      <h1>About MediCost Insight</h1>

      <p>
        MediCost Insight is a data-driven healthcare analytics platform
        designed to estimate medical insurance premiums based on
        personal and clinical risk factors.
      </p>

      <p>
        The platform helps users understand how lifestyle choices,
        vitals, and health indicators influence insurance costs,
        promoting transparency and informed decision-making.
      </p>

      <div className="about-grid">
        <div className="info-card">
          <h3>📊 Predictive Analytics</h3>
          <p>Machine learning models trained on medical datasets.</p>
        </div>

        <div className="info-card">
          <h3>🩺 Health Risk Factors</h3>
          <p>BMI, blood pressure, cholesterol, habits, and age.</p>
        </div>

        <div className="info-card">
          <h3>🔍 Transparency</h3>
          <p>Clear breakdown of factors affecting premium cost.</p>
        </div>
      </div>
    </section>
  );
}

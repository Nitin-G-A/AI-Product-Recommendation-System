function ResultCard({ result }) {

  if (!result) {
    return (
      <div className="result-card">
        <h3>Results</h3>
        <p>Analysis results will appear here.</p>
      </div>
    );
  }

  return (
    <div className="result-card">
      <h3>Results</h3>

      <p>
        <strong>Gender:</strong> {result.gender}
      </p>

      <p>
        <strong>Age Group:</strong> {result.age_group}
      </p>

      <p>
        <strong>Income:</strong> {result.income}
      </p>

      <hr />

      <div className="recommendation-card">
        <h2 className="recommendation-title">
          🎯 Recommended Product
        </h2>

        <p className="recommendation-product">
          {result.recommended_product}
        </p>
      </div>

    </div>
  );
}

export default ResultCard;
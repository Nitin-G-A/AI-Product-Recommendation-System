function ResultCard({ result }) {
  if (!result) return null;

  const items = [
    { label: "Gender",             emoji: "⚧",  value: result.gender },
    { label: "Age Group",          emoji: "👤",  value: result.age_group },
    { label: "Income Range",       emoji: "💰",  value: result.income },
    { label: "Recommended Product",emoji: "🛍",  value: result.recommended_product },
  ];

  return (
    <div className="result-card">
      <h2>🤖 AI Recommendation Result</h2>

      <div className="result-grid">
        {items.map((item) => (
          <div className="result-item" key={item.label}>
            <span>{item.emoji} {item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      <div className="recommendation-box">
        <h3>🎯 Your Personalised Recommendation</h3>
        <div className="product-badge">{result.recommended_product}</div>
      </div>
    </div>
  );
}

export default ResultCard;
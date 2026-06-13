const features = [
  {
    icon: "👤",
    title: "Face Analysis",
    desc: "Real-time demographic detection via computer vision — identifies age group and gender from a single photo.",
  },
  {
    icon: "🧠",
    title: "AI Recommendation",
    desc: "ML model trained on customer behaviour patterns to surface hyper-relevant product matches instantly.",
  },
  {
    icon: "📊",
    title: "Live Analytics",
    desc: "Real-time charts tracking gender split, income segments, and top recommended products across all sessions.",
  },
  {
    icon: "💾",
    title: "MySQL Storage",
    desc: "Every interaction persisted — powers the dashboard and continuously improves recommendation accuracy.",
  },
];

function Features() {
  return (
    <section id="features" className="features-section">
      <p className="section-label reveal">What We Offer</p>
      <h2 className="reveal reveal-delay-1">
        Built for modern<br />
        <span className="blue-text">retail intelligence</span>
      </h2>

      <div className="feature-grid">
        {features.map((f, i) => (
          <div className={`feature-card reveal reveal-delay-${i + 1}`} key={f.title}>
            <div className="feature-icon-wrap">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
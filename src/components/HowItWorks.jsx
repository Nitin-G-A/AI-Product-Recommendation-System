const steps = [
  {
    icon: "📷",
    title: "Upload a Photo",
    desc: "Take or upload any clear photo of a customer's face. Our system accepts JPG, PNG, and WEBP formats.",
  },
  {
    icon: "🔬",
    title: "AI Analyses",
    desc: "Face detection runs instantly — predicting age group and gender with 90%+ confidence using deep learning.",
  },
  {
    icon: "🎯",
    title: "Get Recommendation",
    desc: "Combined with your income range, the ML model picks the perfect product match and logs it to the dashboard.",
  },
];

function HowItWorks() {
  return (
    <section id="how" className="how-section">
      <p className="section-label reveal" style={{ justifyContent: "center" }}>The Process</p>
      <h2 className="reveal reveal-delay-1">
        How it <span className="gradient-text">works</span>
      </h2>

      <div className="steps-row">
        {steps.map((s, i) => (
          <div className={`step-item reveal reveal-delay-${i + 1}`} key={s.title}>
            <div className="step-num">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
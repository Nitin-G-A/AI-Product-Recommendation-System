const pills = [
  "React", "Node.js", "Flask", "MySQL", "TensorFlow",
  "DeepFace", "Chart.js", "Machine Learning", "REST API",
];

function About() {
  return (
    <section id="about" className="about-section">
      <p className="section-label reveal" style={{ justifyContent: "center" }}>The Project</p>
      <h2 className="reveal reveal-delay-1">
        About <span className="gradient-text">Smart Retail AI</span>
      </h2>
      <p className="reveal reveal-delay-2">
        Smart Retail AI combines facial recognition, machine learning, and customer analytics
        to surface the right product for every person — based on age, gender, and income patterns.
        Every interaction is stored, every recommendation logged, and every insight surfaced
        through a live analytics dashboard built for business teams.
      </p>
      <div className="about-pills reveal reveal-delay-3">
        {pills.map((p) => (
          <span className="about-pill" key={p}>{p}</span>
        ))}
      </div>
    </section>
  );
}

export default About;
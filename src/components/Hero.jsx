function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
    >
      <h1>
        AI Product Recommendation
        <br />
        System
      </h1>

      <p>
        Face Analysis + Machine Learning +
        Analytics Dashboard
      </p>

      <a
        href="#recommend"
        className="hero-btn"
      >
        Get Started
      </a>

      <div className="hero-stats">

        <div className="stat-card">
          <h3>18+</h3>
          <p>Customers</p>
        </div>

        <div className="stat-card">
          <h3>90%</h3>
          <p>Confidence</p>
        </div>

        <div className="stat-card">
          <h3>AI</h3>
          <p>Powered</p>
        </div>

      </div>
    </section>
  );
}

export default Hero;
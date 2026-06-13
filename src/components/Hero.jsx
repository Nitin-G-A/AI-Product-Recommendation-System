function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-glow-ring" />

      <div className="hero-eyebrow reveal">
        <span className="pulse-dot" />
        AI-Powered Retail Intelligence
      </div>

      <h1 className="reveal reveal-delay-1">
        Know Your Customer.<br />
        <span className="gradient-text">Recommend Perfectly.</span>
      </h1>

      <p className="hero-sub reveal reveal-delay-2">
        Upload a photo, select an income range — our face analysis AI detects
        demographics and delivers a pinpoint product recommendation in seconds.
      </p>

      <div className="hero-actions reveal reveal-delay-3">
        <a href="#recommend" className="hero-btn">
          <span>Get Started</span>
          <span className="arr">→</span>
        </a>
        <a href="#how" className="hero-btn-ghost">See How It Works</a>
      </div>

      <div className="hero-stats reveal reveal-delay-4">
        <div className="stat-card">
          <h3>18+</h3>
          <p>Customers Served</p>
        </div>
        <div className="stat-card">
          <h3>90%</h3>
          <p>Accuracy Rate</p>
        </div>
        <div className="stat-card">
          <h3>&lt;3s</h3>
          <p>Response Time</p>
        </div>
        <div className="stat-card">
          <h3>AI</h3>
          <p>Powered Engine</p>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line" />
        Scroll
      </div>
    </section>
  );
}
export default Hero;
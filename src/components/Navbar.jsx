import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-icon">🤖</div>
        <h2>Smart Retail AI</h2>
      </div>

      <ul className={open ? "open" : ""}>
        <li><a href="#hero"      onClick={close}>Home</a></li>
        <li><a href="#features"  onClick={close}>Features</a></li>
        <li><a href="#how"       onClick={close}>How It Works</a></li>
        <li><a href="#recommend" onClick={close}>Recommend</a></li>
        <li><a href="#dashboard" onClick={close}>Dashboard</a></li>
        <li><a href="#about"     onClick={close}>About</a></li>
      </ul>

      <button
        className={`nav-hamburger ${open ? "open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

export default Navbar;
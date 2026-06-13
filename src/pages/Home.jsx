import { useState, useRef, useEffect } from "react";
import "../styles/home.css";

import ImageUpload from "../components/ImageUpload";
import IncomeSelector from "../components/IncomeSelector";
import ResultCard from "../components/ResultCard";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import About from "../components/About";
import Footer from "../components/Footer";
import Dashboard from "../components/Dashboard";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

/* ─── Custom cursor (desktop only) ─────────────────────── */
function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    // Skip entirely on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dot.current)  dot.current.style.cssText  = `left:${mx}px;top:${my}px`;
      if (ring.current) ring.current.style.cssText = `left:${rx}px;top:${ry}px`;
      raf = requestAnimationFrame(loop);
    };

    const onDown = () => { dot.current?.classList.add('clicking'); ring.current?.classList.add('clicking'); };
    const onUp   = () => { dot.current?.classList.remove('clicking'); ring.current?.classList.remove('clicking'); };

    const onOver = (e) => {
      const el = e.target.closest('a,button,select,.feature-card,.stat-card,.dashboard-card,.trust-badge');
      if (el) { dot.current?.classList.add('hovering'); ring.current?.classList.add('hovering'); }
      else    { dot.current?.classList.remove('hovering'); ring.current?.classList.remove('hovering'); }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Don't render cursor elements on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null;

  return (
    <>
      <div className="cursor-dot"  ref={dot}  />
      <div className="cursor-ring" ref={ring} />
    </>
  );
}

/* ─── Particle canvas ───────────────────────────────── */
function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let mouse = { x: W/2, y: H/2 };

    const isMobile = window.innerWidth <= 768;
    const N = isMobile ? 25 : 70;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '37,99,235' : '6,182,212',
    }));

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      particles.forEach(p => {
        // subtle mouse attraction
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 200) {
          p.vx += dx / dist * 0.008;
          p.vy += dy / dist * 0.008;
        }
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });

      // draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx*dx + dy*dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(37,99,235,${(1 - d/110) * 0.12})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef} />;
}

/* ─── Scroll reveal hook ─────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Main Home ─────────────────────────────────── */
function Home() {
  const [image, setImage]         = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [income, setIncome]       = useState("");
  const [result, setResult]       = useState(null);
  const [loading, setLoading]     = useState(false);
  const cardRef = useRef(null);

  useScrollReveal();

  /* 3-D card tilt */
  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth <= 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const rx = ((e.clientY - rect.top  - rect.height/2) / rect.height) * -10;
    const ry = ((e.clientX - rect.left - rect.width/2)  / rect.width)  *  10;
    cardRef.current.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
    cardRef.current.style.transform  = 'perspective(1100px) rotateX(0) rotateY(0)';
    setTimeout(() => { if (cardRef.current) cardRef.current.style.transition = ''; }, 600);
  };

  const handleImageChange = (e) => {
    const f = e.target.files[0];
    if (f) { setImage(URL.createObjectURL(f)); setImageFile(f); }
  };
  const handleIncomeChange = (e) => setIncome(e.target.value);

  const handleAnalyze = async () => {
    if (!image)  { toast.error("Please upload an image");        return; }
    if (!income) { toast.error("Please select an income range"); return; }
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("image", imageFile);
      fd.append("income", income);
      const res = await axios.post("http://localhost:5000/api/analyze", fd);
      setResult(res.data);
      setTimeout(() => setLoading(false), 500);
      toast.success("Analysis complete!");
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.error || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="page-wrapper">
      <Cursor />
      <Particles />
      <div className="dot-grid" />

      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />

      {/* ── Recommend ── */}
      <section id="recommend" className="recommend-section">
        <div className="recommend-left">
          <p className="section-label reveal">Get Your Match</p>
          <h2 className="reveal reveal-delay-1">
            Personalized<br />
            <span className="gradient-text">AI Recommendation</span>
          </h2>
          <p className="reveal reveal-delay-2">
            Upload a photo and select your income range. Our AI analyses your demographics
            and instantly recommends the most relevant product for you.
          </p>
          <div className="trust-badges reveal reveal-delay-3">
            <div className="trust-badge"><span className="tb-icon">🔒</span> Image processed securely — never stored</div>
            <div className="trust-badge"><span className="tb-icon">⚡</span> Results in under 3 seconds</div>
            <div className="trust-badge"><span className="tb-icon">🎯</span> 90%+ recommendation accuracy</div>
          </div>
        </div>

        <div className="recommend-right">
          <div
            className="card reveal reveal-delay-2"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-title">🤖 AI Analysis Form</div>

            <ImageUpload image={image} handleImageChange={handleImageChange} />
            <IncomeSelector income={income} handleIncomeChange={handleIncomeChange} />

            <button className="analyze-btn" onClick={handleAnalyze} disabled={loading}>
              <span>{loading ? "🔬 Analysing…" : "Analyse & Recommend →"}</span>
            </button>

            {loading && (
              <div className="loading-card">
                <div className="loader" />
                <h3>AI is reading your image…</h3>
                <p>Detecting face · Predicting age & gender · Matching product</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="results-section">
        <div className="results-inner">
          <p className="section-label reveal" style={{justifyContent:'center', marginBottom:'24px'}}>Output</p>
          <h2 className="reveal" style={{textAlign:'center', fontSize:'clamp(2rem,3.5vw,3rem)', marginBottom:'48px', letterSpacing:'-0.03em'}}>
            Analysis <span className="gradient-text">Results</span>
          </h2>
          {result ? (
            <ResultCard result={result} />
          ) : (
            <div className="empty-result reveal reveal-delay-1">
              <span className="empty-icon">🤖</span>
              <h2>Waiting for your photo</h2>
              <p>Upload an image, choose an income range, and click Analyse. Your personalised product recommendation will appear here.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Dashboard ── */}
      <section id="dashboard" className="dashboard-page">
        <Dashboard />
      </section>

      <About />
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastStyle={{
          background: "#0f2044",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#fff",
          borderRadius: "16px",
          fontFamily: "'Inter', sans-serif",
        }}
      />
    </div>
  );
}

export default Home;
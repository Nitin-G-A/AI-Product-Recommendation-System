import { useState, useRef } from "react";
import "../styles/home.css";

import ImageUpload from "../components/ImageUpload";
import IncomeSelector from "../components/IncomeSelector";
import ResultCard from "../components/ResultCard";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import Footer from "../components/Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Axios is imported but not used in this component. It can be used later for making API calls to the backend for analysis results.
import axios from "axios";
import Dashboard from "../components/Dashboard";

function Home() {
const [image, setImage] = useState(null);
const [imageFile, setImageFile] = useState(null);
  const [income, setIncome] = useState("");
  const [result, setResult] = useState(null);
  const cardRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    // Handle Card Rotation
    if (cardRef.current) {
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;  

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Disable 3D tilt on smaller screens (makes mobile experience better)
      if (window.innerWidth <= 768) return;

      const rotateX = ((y - centerY) / centerY) * -1;
      const rotateY = ((x - centerX) / centerX) * 1;

      card.style.transform = `perspective(1200px) translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
    }

    // Handle Background Parallax
    if (containerRef.current) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate how far mouse is from screen center (-1 to 1)
      const mouseX = (e.clientX / windowWidth) * 2 - 1;
      const mouseY = (e.clientY / windowHeight) * 2 - 1;

      // Move the background slightly in opposite direction of mouse
      containerRef.current.style.backgroundPosition = `calc(50% + ${mouseX * 20}px) calc(50% + ${mouseY * 20}px)`;
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      const card = cardRef.current;
      
      card.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s ease";
      card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)`;

      setTimeout(() => {
        card.style.transition = "transform 0.1s ease-out, box-shadow 0.6s ease";
      }, 600);
    }
    
    // Background returns to center
    if (containerRef.current) {
      containerRef.current.style.backgroundPosition = "center";
    }
  };

const handleImageChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    setImage(URL.createObjectURL(file));
    setImageFile(file);
  }
};

  const handleIncomeChange = (event) => {
    setIncome(event.target.value);
  };

const handleAnalyze = async () => {
  if (!image) {
    toast.error("Please upload an image");
    return;
  }

  if (!income) {
    toast.error("Please select an income range");
    return;
  }

  try {
  const formData = new FormData();

  formData.append("image", imageFile);
  formData.append("income", income);

  const response = await axios.post(
    "http://localhost:5000/api/analyze",
    formData
  );

setResult(response.data);

toast.success("Analysis Complete");

console.log(response.data);

} catch (error) {
  toast.error("Backend Connection Failed");
  console.error(error);
}
};

return (
  <>
    <Navbar />

    <Hero />

    <Features />

    {/* Recommendation Section */}
    <section
     id="recommend"
     className="recommend-section"
     ref={containerRef}
     >
      <h2 className="section-title">
        Get Personalized Recommendations
      </h2>
      <p className="section-subtitle">
        Upload your image and select income range
      </p>
      <div
        className="card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <ImageUpload
          image={image}
          handleImageChange={handleImageChange}
        />

        <IncomeSelector
          income={income}
          handleIncomeChange={handleIncomeChange}
        />

        <button
          className="analyze-btn"
          onClick={handleAnalyze}
        >
          Analyze
        </button>
      </div>
    </section>

    {/* Results Section */}
    <section className="container">
      <div className="card">
        <h2 className="section-title">
         Analysis Results
        </h2>
        <ResultCard result={result} />
      </div>
    </section>

    {/* Dashboard Section */}
    <section id="dashboard" className="dashboard-page">
          <Dashboard />
    </section>
    <About />

    <Footer />

    <ToastContainer />
  </>
);
}

export default Home;
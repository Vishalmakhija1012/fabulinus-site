import { useState, useEffect, useRef } from "react";
import '../style.css';

// ComparisonCell component
const ComparisonCell = ({ status, detail, isFabulinusCol }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowDetail(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const iconColorClass = status ? "text-green-500" : "text-red-500";
  const icon = status ? (
    <span style={{ color: "green", fontSize: "28px" }}>✔️</span>
  ) : (
    <span style={{ color: "red", fontSize: "28px" }}>✖️</span>
  );

  return (
    <div
      className={`col-span-1 flex flex-col items-center relative ${isMobile ? "cursor-pointer" : "cursor-auto"} ${isFabulinusCol ? "comparison-cell-fabulinus" : "comparison-cell-others"}`}
      onMouseEnter={() => !isMobile && setShowDetail(true)}
      onMouseLeave={() => !isMobile && setShowDetail(false)}
      onClick={() => isMobile && setShowDetail(!showDetail)}
    >
      <div className="tooltip-wrapper">
        {icon}
        {isMobile && (
          <div className={`mobile-tooltip-container ${showDetail ? "show" : ""}`}>
            <p className="tooltip-bubble">{detail}</p>
          </div>
        )}
      </div>
      {!isMobile && (
        <p className="text-sm opacity-80 mt-1 text-gray-700 desktop-detail-text">{detail}</p>
      )}
    </div>
  );
};

// ...existing code...

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 antialiased overflow-x-hidden">
      {/* ...existing style and section components... */}
      <Header />
      <HeroSection />
      <SolutionsSection />
      <TestimonialsSection />
      <GreatFrameworkSection />
      <HowWeAreDifferentSection />
      <FAQsSection />
      <Footer />
    </div>
  );
};

// ...existing code...

// Update all image paths: remove 'public/' prefix, use '/image.png' style
// Example: <img src="/1.png" ... />
// ...existing code for all other components, with image paths updated as needed...

export default App;

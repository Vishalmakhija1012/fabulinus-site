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

// useInViewAnimation hook
const useInViewAnimation = (ref, threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [ref, threshold]);
  return isInView;
};

// Header component
const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <a href="#" className="flex-shrink-0">
              <img className="h-8" src="/logo.png" alt="Logo" />
            </a>
            <nav className="hidden md:flex space-x-10 ml-10">
              <a href="#solutions" className="text-gray-500 hover:text-gray-900">
                Solutions
              </a>
              <a href="#testimonials" className="text-gray-500 hover:text-gray-900">
                Testimonials
              </a>
              <a href="#about" className="text-gray-500 hover:text-gray-900">
                About
              </a>
              <a href="#contact" className="text-gray-500 hover:text-gray-900">
                Contact
              </a>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Login
            </a>
            <a
              href="#"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

// HeroSection component
const HeroSection = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Transforming Education Through Technology
          </h1>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Join thousands of learners and educators in the digital revolution.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// SolutionsSection component
const SolutionsSection = () => {
  return (
    <div className="py-16 bg-gray-50" id="solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Our Solutions
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Innovative solutions for modern learners and educators.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
          {/* Solution items */}
          <div className="relative bg-white p-6 rounded-lg shadow-md">
            <div className="flex-shrink-0">
              <img className="h-12" src="/solution1.png" alt="Solution 1" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Solution 1
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Brief description of Solution 1.
              </p>
            </div>
          </div>
          <div className="relative bg-white p-6 rounded-lg shadow-md">
            <div className="flex-shrink-0">
              <img className="h-12" src="/solution2.png" alt="Solution 2" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Solution 2
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Brief description of Solution 2.
              </p>
            </div>
          </div>
          <div className="relative bg-white p-6 rounded-lg shadow-md">
            <div className="flex-shrink-0">
              <img className="h-12" src="/solution3.png" alt="Solution 3" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Solution 3
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Brief description of Solution 3.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// TestimonialsSection component
const TestimonialsSection = () => {
  return (
    <div className="py-16 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Hear from our satisfied learners and educators.
          </p>
        </div>
        <div className="mt-12">
          {/* Testimonial items */}
          <div className="flex flex-col space-y-10">
            <div className="relative bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="flex-shrink-0">
                <img className="h-12 rounded-full" src="/user1.jpg" alt="User 1" />
              </div>
              <div className="mt-4">
                <p className="text-base text-gray-600">
                  "This platform has transformed the way I teach. The tools are intuitive and effective."
                </p>
                <p className="mt-2 text-sm font-semibold text-gray-800">
                  - Educator, School Name
                </p>
              </div>
            </div>
            <div className="relative bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="flex-shrink-0">
                <img className="h-12 rounded-full" src="/user2.jpg" alt="User 2" />
              </div>
              <div className="mt-4">
                <p className="text-base text-gray-600">
                  "As a learner, I appreciate the flexibility and variety of resources available."
                </p>
                <p className="mt-2 text-sm font-semibold text-gray-800">
                  - Learner, Course Name
                </p>
              </div>
            </div>
            <div className="relative bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="flex-shrink-0">
                <img className="h-12 rounded-full" src="/user3.jpg" alt="User 3" />
              </div>
              <div className="mt-4">
                <p className="text-base text-gray-600">
                  "The community and support are outstanding. I always feel encouraged and motivated."
                </p>
                <p className="mt-2 text-sm font-semibold text-gray-800">
                  - User, Program Name
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// GreatFrameworkSection component
const GreatFrameworkSection = () => {
  return (
    <div className="py-16 bg-gray-50" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Why Choose Our Framework?
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            A comprehensive and flexible framework for all educational needs.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
          {/* Framework items */}
          <div className="relative bg-white p-6 rounded-lg shadow-md">
            <div className="flex-shrink-0">
              <img className="h-12" src="/framework1.png" alt="Framework 1" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Framework 1
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Brief description of Framework 1.
              </p>
            </div>
          </div>
          <div className="relative bg-white p-6 rounded-lg shadow-md">
            <div className="flex-shrink-0">
              <img className="h-12" src="/framework2.png" alt="Framework 2" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Framework 2
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Brief description of Framework 2.
              </p>
            </div>
          </div>
          <div className="relative bg-white p-6 rounded-lg shadow-md">
            <div className="flex-shrink-0">
              <img className="h-12" src="/framework3.png" alt="Framework 3" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Framework 3
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Brief description of Framework 3.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// HowWeAreDifferentSection component
const HowWeAreDifferentSection = () => {
  return (
    <div className="py-16 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            How We Are Different
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Discover the unique aspects of our platform.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
          {/* Difference items */}
          <div className="relative bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex-shrink-0">
              <img className="h-12" src="/difference1.png" alt="Difference 1" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Difference 1
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Brief description of Difference 1.
              </p>
            </div>
          </div>
          <div className="relative bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex-shrink-0">
              <img className="h-12" src="/difference2.png" alt="Difference 2" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Difference 2
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Brief description of Difference 2.
              </p>
            </div>
          </div>
          <div className="relative bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex-shrink-0">
              <img className="h-12" src="/difference3.png" alt="Difference 3" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Difference 3
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Brief description of Difference 3.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// FAQsSection component
const FAQsSection = () => {
  return (
    <div className="py-16 bg-gray-50" id="faqs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Find answers to the most common questions.
          </p>
        </div>
        <div className="mt-12">
          {/* FAQ items */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">
                Question 1?
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Answer to question 1.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">
                Question 2?
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Answer to question 2.
p              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">
                Question 3?
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Answer to question 3.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <a href="#" className="flex-shrink-0">
              <img className="h-8" src="/logo.png" alt="Logo" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Solutions</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#solutions" className="text-sm text-gray-600 hover:text-gray-800">
                    Solution 1
                  </a>
                </li>
                <li>
                  <a href="#solutions" className="text-sm text-gray-600 hover:text-gray-800">
                    Solution 2
                  </a>
                </li>
                <li>
                  <a href="#solutions" className="text-sm text-gray-600 hover:text-gray-800">
                    Solution 3
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">About Us</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#about" className="text-sm text-gray-600 hover:text-gray-800">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-sm text-gray-600 hover:text-gray-800">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-sm text-gray-600 hover:text-gray-800">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Resources</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#faqs" className="text-sm text-gray-600 hover:text-gray-800">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Contact</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="mailto:info@example.com" className="text-sm text-gray-600 hover:text-gray-800">
                    Email Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                    Schedule a Call
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                    Location
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-4">
          <p className="text-center text-sm text-gray-500">
            &copy; 2023 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 antialiased overflow-x-hidden">
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

export default App;

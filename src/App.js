// Remove the import line for React and hooks, as React is loaded globally via CDN
const { useState, useEffect, useRef } = React;

// New ComparisonCell component (moved to top level for proper definition)
const ComparisonCell = ({ status, detail, isFabulinusCol }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowDetail(false); // Hide tooltip if resized to desktop
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const iconColorClass = status ? "text-green-500" : "text-red-500";
  // Use emoji instead of icon components
  const icon = status ? <span style={{color: 'green', fontSize: '28px'}}>✔️</span> : <span style={{color: 'red', fontSize: '28px'}}>✖️</span>;

  return (
    <div 
      className={`col-span-1 flex flex-col items-center relative ${isMobile ? 'cursor-pointer' : 'cursor-auto'} 
                  ${isFabulinusCol ? 'comparison-cell-fabulinus' : 'comparison-cell-others'}`} 
      onMouseEnter={() => !isMobile && setShowDetail(true)} // Show on hover for desktop
      onMouseLeave={() => !isMobile && setShowDetail(false)} // Hide on leave for desktop
      onClick={() => isMobile && setShowDetail(!showDetail)} // Toggle on click for mobile
    >
      <div className="tooltip-wrapper">
          {icon}
          {isMobile && ( // Only render tooltip container on mobile
            <div className={`mobile-tooltip-container ${showDetail ? 'show' : ''}`}>
              <p className="tooltip-bubble">
                {detail}
              </p>
            </div>
          )}
      </div>
      {!isMobile && ( // Only render static text on desktop
        <p className="text-sm opacity-80 mt-1 text-gray-700 desktop-detail-text">
          {detail}
        </p>
      )}
    </div>
  );
};


// Main App Component - Renders all sections sequentially
const App = () => {
  return (
    // The main container's background creates the continuous flow for the entire page
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 antialiased overflow-x-hidden">
      <style>
        {`
        /* Essential CSS for consistent scrolling in various environments */
        html, body {
            height: 100%; /* Important for min-h-screen to work consistently */
            margin: 0;
            padding: 0;
            overflow-y: auto; /* Allow scrolling on the body if content overflows */
        }

        /* Custom Keyframes for Animations (repeated for clarity, but ideally in a single global CSS file) */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes blob { 0%, 100% { transform: scale(1) translate(0px, 0px); border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 50% { transform: scale(1.1) translate(30px, -20px); border-radius: 30% 70% 60% 40% / 70% 40% 60% 30%; } 66% { transform: scale(0.9) translate(-20px, 20px); border-radius: 70% 30% 40% 60% / 40% 70% 30% 60%; } }
        @keyframes blob-alt { 0%, 100% { transform: scale(1) translate(0px, 0px); border-radius: 40% 60% 70% 30% / 30% 60% 40% 70%; } 50% { transform: scale(1.2) translate(-20px, 30px); border-radius: 70% 30% 40% 60% / 60% 70% 30% 40%; } 66% { transform: scale(0.8) translate(20px, -30px); border-radius: 30% 70% 60% 40% / 70% 40% 60% 30%; } }
        @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0); } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.7s ease-out forwards; }
        .animate-fadeInScale { animation: fadeInScale 0.7s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.7s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.7s ease-out forwards; }
        .animate-blob { animation: blob 8s infinite ease-in-out; }
        .animate-blob-alt { animation: blob-alt 9s infinite ease-in-out alternate; }
        .animate-float { animation: float 3s infinite ease-in-out; }
        .animate-gradientShift { background-size: 400% 400%; animation: gradientShift 15s ease infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; }
        .accordion-content.open { max-height: 500px; }
        .accordion-icon.rotate { transform: rotate(180deg); }
        `}
      </style>
      
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

// Hook for Intersection Observer animations
const useInViewAnimation = (ref, threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return isInView;
};

// Header Component
const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-b-3xl">
    <div className="text-2xl font-extrabold text-blue-700">fabulinus</div>
    <nav>
      <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">Home</a>
    </nav>
  </header>
);

// Reusable Social Proof Component for learners
const LearnersSocialProof = ({ whiteText }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-8 space-x-4">
            <div className="flex -space-x-3 mb-3">
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="/public/1.png" alt="Learner Profile 1" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="/public/2.png" alt="Learner Profile 2" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="/public/3.png" alt="Learner Profile 3" />
            </div>
            <p className={`text-md sm:text-lg ${whiteText ? 'text-white' : 'text-gray-700'}`}>Trusted by 2,000 learners</p>
        </div>
    );
};


// Hero Section Component (Section 1)
const HeroSection = () => {
  const heroRef = useRef(null);
  const isInView = useInViewAnimation(heroRef, 0.5);

  return (
    <section 
      ref={heroRef} id="hero" 
      className={`relative flex flex-col items-center justify-center py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 md:p-10 rounded-b-3xl shadow-2xl overflow-hidden animate-gradientShift`} 
    >
      <div className="absolute inset-0 z-0 opacity-15">
        <svg className="absolute top-0 -left-1/4 w-3/4 h-auto transform rotate-12 animate-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#FFFFFF" d="M47.7,-64C61.4,-50.2,71.7,-33.4,70.5,-16.9C69.3,-0.5,56.7,15.6,45.8,28.2C34.9,40.9,25.7,50,13.7,56.5C1.6,62.9,-13.4,66.8,-24.5,61.9C-35.7,57,-43.1,43.3,-50.3,30.3C-57.5,17.2,-64.5,4.7,-64.8,-8.1C-65.1,-21,-58.6,-34,-48.5,-45.5C-38.3,-57,-24.5,-67,-9.6,-70.6C5.4,-74.2,20.8,-71.4,32.3,-64.4L32.3,-64.4Z" transform="translate(100 100)" /></svg>
        <svg className="absolute bottom-0 -right-1/4 w-3/4 h-auto transform -rotate-45 animate-blob animation-delay-2000" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#FFFFFF" d="M50.2,-47.9C64.6,-40.4,75.4,-23.4,76.5,-5.9C77.5,11.6,68.9,29.6,56.9,41.9C44.9,54.2,29.5,60.8,12.7,62.8C-4.1,64.9,-22.4,62.4,-37.2,54.8C-52,47.2,-63.3,34.5,-69.1,18.4C-74.9,2.3,-75.2,-17.3,-67.2,-30.9C-59.2,-44.6,-43,-52.3,-27.1,-56C-11.2,-59.7,3.3,-59.5,16.5,-56.9L16.5,-56.9Z" transform="translate(100 100)" /></svg>
      </div>
      <div className={`relative z-10 w-full max-w-5xl mx-auto py-12 px-6 sm:px-8 lg:px-12 text-left ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 tracking-tight" style={{ animationDelay: '0.1s' }}>Master English <span className="text-red-300">Communication</span></h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6" style={{ animationDelay: '0.3s' }}>
          Express. Communicate. Dominate.
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl mx-auto" style={{ animationDelay: '0.5s' }}>
          Get personalized guidance from top English instructors through one-on-one sessions. Build fluency, precision, and confidence. Advance your career and daily communication with measurable results.
        </p>
        <div className="w-full flex flex-col items-start">
          <a href="#aparna-sinha" className="inline-block bg-white text-blue-700 hover:bg-gray-100 font-bold py-4 px-10 rounded-full shadow-lg transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75 text-xl" style={{ animationDelay: '0.7s' }}>
            Explore Courses
          </a>
          <LearnersSocialProof whiteText={true} />
        </div>
      </div>
      <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white opacity-20 rounded-full animate-float delay-100"></div>
      <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-white opacity-20 rounded-full animate-float delay-300"></div>
      <div className="absolute top-1/2 right-1/2 w-10 h-10 bg-white opacity-20 rounded-xl animate-float delay-500"></div>
    </section>
  );
};

// Data for Solutions Section
const achievementsData = [
  { text: "Best-selling Indian author", icon: <span style={{color: 'gold', fontSize: '32px'}}>🏆</span> }, 
  { text: "7 books published", icon: <span style={{color: 'green', fontSize: '32px'}}>📚</span> }, 
  { text: "Known as \"Queen of Thrillers!\"", icon: <span style={{color: 'red', fontSize: '32px'}}>⭐</span> }, 
  { text: "2X Entrepreneur", icon: <span style={{color: 'blue', fontSize: '32px'}}>💼</span> }, 
  { text: "Multiple national & international awards", icon: <span style={{color: 'purple', fontSize: '32px'}}>🏅</span> }, 
  { text: "Published in Indian & International Magazines", icon: <span style={{color: 'orange', fontSize: '32px'}}>📰</span> }, 
];
const mediaLogosData = [
  { src: "/public/hindustantimes.png", alt: "Hindustan Times" }, 
  { src: "/public/Republic.png", alt: "Republic" },
  { src: "/public/thehindu.png", alt: "The Hindu" },
  { src: "/public/dainikjagran.png", alt: "Dainik Jagran" },
  { src: "/public/dainikbhaskar.png", alt: "Dainik Bhaskar" },
  { src: "/public/bt.png", alt: "Business Times" },
  { src: "/public/DD.png", alt: "DD" },
  { src: "/public/TOI.png", alt: "TOI" },
  { src: "/public/amar.png", alt: "Amar Ujala" },
];


// SolutionsSection (Section 2)
const SolutionsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInViewAnimation(sectionRef);

  const achievementsListRef = useRef(null);
  const achievementsListInView = useInViewAnimation(achievementsListRef);

  const mediaCoverageRef = useRef(null);
  const mediaCoverageInView = useInViewAnimation(mediaCoverageRef);

  // In SolutionsSection, use local book images
  const bookImages = [
    { src: "/public/book1.png", alt: "Book 1" },
    { src: "/public/book2.png", alt: "Book 2" },
    { src: "/public/book3.png", alt: "Book 3" },
    { src: "/public/book4.png" , alt: "Book 4" },
    { src: "/public/book5.png", alt: "Book 5" },
    { src: "/public/book6.png", alt: "Book 6" },
    { src: "/public/book7.png", alt: "Book 7" }
  ];

  return (
    <section 
      ref={sectionRef} id="solutions" 
      className={`relative py-24 text-gray-800 overflow-hidden flex flex-col items-center justify-center min-h-screen bg-white`} 
    >
      <div className={`relative z-10 w-full max-w-5xl mx-auto py-12 px-6 sm:px-8 lg:px-12 text-left ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-gray-800 leading-tight" style={{ animationDelay: '0.1s' }}>
          Do not <span className="text-red-400">compromise</span>.
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 text-gray-800 leading-snug" style={{ animationDelay: '0.3s' }}>
          Learn Personally from the best-selling Author Aparna Sinha.
        </h2>
        
        <div className="w-full text-center mb-4">
          <span className="text-sm text-gray-500 tracking-wide font-semibold uppercase">Books by Aparna Sinha</span>
        </div>
        <div className="relative w-full overflow-hidden mt-8 mb-16">
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 -mx-2 md:-mx-3 lg:-mx-4">
                {bookImages.map((book, index) => (
                  <div key={index} className="flex-shrink-0 snap-start px-2 md:px-3 lg:px-4 w-[calc(100%/2.5)] md:w-[calc(100%/3.5)] lg:w-[calc(100%/4.5)] flex items-center justify-center">
                    <div style={{background: '#fff', borderRadius: '1.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '0.5rem', height: '18rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                      <img src={book.src} alt={book.alt} className="h-full max-h-[15rem] w-auto object-contain" style={{display: 'block'}} />
                      <span style={{position: 'absolute', bottom: '0.5rem', left: '50%', transform: 'translateX(-50%)', fontSize: '2rem', color: '#3b82f6'}}>•</span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="absolute top-0 left-0 bottom-0 w-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
        <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-16 text-gray-700"> 
            Aparna Sinha is a celebrated Indian author and entrepreneur, recognized for her impactful writing and leadership. With six published books and numerous awards, she has inspired thousands. Her work is widely featured and she is a sought-after voice in media and interviews.
        </p>
        <div ref={achievementsListRef} className={`relative w-full p-12 rounded-xl shadow-2xl overflow-hidden mt-16 mx-auto max-w-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white ${achievementsListInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-0"></div>
                <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-white rounded-full mix-blend-multiply filter blur-2xl animate-blob-alt animation-delay-2000"></div>
            </div>
            <h3 className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-center leading-snug">Achievements</h3> 
            <ul className="relative z-10 list-none p-0 space-y-8 text-lg sm:text-xl md:text-2xl text-left"> 
                {achievementsData.map((item, index) => (<li key={index} className={`flex items-center transition-all duration-700 ease-out ${achievementsListInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                        <span className="flex-shrink-0 mr-6">{item.icon}</span> 
                        <span className="flex-grow text-white font-medium">{item.text}</span> 
                    </li>
                ))}
            </ul>
        </div>
        <div ref={mediaCoverageRef} className={`relative w-full overflow-hidden mt-24 mx-auto max-w-4xl ${mediaCoverageInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-bold mb-12 text-gray-700 text-center leading-snug">Media Coverage</h3> 
            <div className="grid grid-cols-3 gap-x-16 gap-y-12 justify-items-center items-center py-4"> 
                {mediaLogosData.slice(0, 9).map((logo, index) => (<div key={index} className={`flex items-center justify-center ${mediaCoverageInView ? 'opacity-100 animate-fadeInScale' : 'opacity-0'}`} style={{ animationDelay: `${index * 100}ms` }}>
                        <img src={logo.src} alt={logo.alt} className="h-20 w-auto object-contain opacity-70 filter grayscale hover:filter-none transition-all duration-300 hover:opacity-100 transform hover:scale-110" />
                    </div>
                ))}
            </div>
            <p className="text-center text-lg sm:text-xl md:text-2xl text-gray-600 mt-12">and more...</p> 
        </div>
      </div>
    </section>
  );
};

// Testimonials Section Component (Section 3)
const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInViewAnimation(sectionRef);

  // Use local images for testimonials
  const testimonialsData = [
    { quote: "I took classes at my time of convenience, and when I missed I used recording, Aparna Ma'am helped me in understanding aspects of good English communication.", name: "Sonal Kapoor", program: "Student – Young Learner Program", image: "/public/1.png" },
    { quote: "I'm extremely grateful to Aparna Ma'am and Fabulinus teachers for helping me clear my concepts and supporting me every step of the way.", name: "Darshan Nagpal", program: "Student – Advantage English Program", image: "/public/2.png" },
    { quote: "I was able to crack my job interview—Fabulinus truly transformed my communication, a big Thank you! :)", name: "Sneha Gupta", program: "Professional – Competitive Edge Program", image: "/public/3.png" }
  ];

  return (
    <section 
      ref={sectionRef} id="testimonials" 
      className={`relative py-24 px-6 sm:px-10 lg:px-20 text-gray-800 overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100`} 
    >
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob-alt animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      <div className={`relative z-10 w-full max-w-5xl mx-auto text-center mb-16 ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-gray-800 leading-tight">
          What our <span className="font-extrabold text-red-400">learners</span> say.
        </h1>
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className={`flex flex-col items-center text-center p-10 rounded-2xl shadow-xl bg-white border border-gray-200 transition-all duration-700 ease-out hover:shadow-2xl hover:scale-[1.01] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: `${0.15 * index}s` }}>
            <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden mb-6 shadow-md">
              <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
            </div>
            <span style={{fontSize: '32px', color: '#3b82f6', marginBottom: '24px'}}>“</span>
            <p className="text-lg sm:text-xl leading-relaxed text-gray-700 mb-6">"{testimonial.quote}"</p>
            <div className="flex flex-col items-center justify-center gap-1 mb-2 w-full">
              <span className="text-xl sm:text-2xl font-bold text-blue-700 whitespace-nowrap">{testimonial.name}</span>
              <span className="inline-block bg-blue-100 text-blue-800 font-semibold text-sm px-3 py-1 rounded-full whitespace-nowrap" style={{marginLeft: 0, flexShrink: 0}}>{testimonial.program}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// GreatFrameworkSection (Section 4)
const GreatFrameworkSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInViewAnimation(sectionRef);

  const greatPoints = [
    { letter: "G", word: "Grading", description: "Tailored assessments and defined benchmarks to track your development.", icon: <span style={{color: 'blue', fontSize: '32px'}}>✔️</span> },
    { letter: "R", word: "Regular Monitoring", description: "Continuous feedback and performance evaluations to guide improvement.", icon: <span style={{color: 'purple', fontSize: '32px'}}>✔️</span> },
    { letter: "E", word: "Experts", description: "Learn from Aparna Sinha, and other expert educators, using time-tested strategies.", icon: <span style={{color: 'pink', fontSize: '32px'}}>✔️</span> },
    { letter: "A", word: "Accessibility", description: "Flexible scheduling, on-demand resources, and a supportive learning environment.", icon: <span style={{color: 'green', fontSize: '32px'}}>✔️</span> },
    { letter: "T", word: "Transparency", description: "Clear objectives, honest feedback, and absolutely no hidden costs.", icon: <span style={{color: 'gold', fontSize: '32px'}}>✔️</span> },
  ];

  return (
    <section 
      ref={sectionRef} id="great-framework" 
      className={`relative py-24 px-6 sm:px-10 lg:px-20 text-gray-800 overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50`} 
    >
      <div className={`relative z-10 w-full max-w-5xl mx-auto text-center mb-16 ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-gray-800 leading-tight">
          Excel in English Communication with the <span className="font-extrabold text-red-400">GREAT</span> Approach
        </h1> 
        <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 text-gray-800 max-w-3xl mx-auto">
          Unlock your <span className="font-extrabold text-red-400">potential</span> in public speaking, communication, and English proficiency—both verbal and written—through our <span className="font-extrabold text-red-400">structured</span> and results-driven GREAT Approach.
        </p>
        <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-700 max-w-3xl mx-auto">
          Whether you're a student, a working professional, or someone striving to build confidence, our <span className="font-extrabold text-red-400">methodology</span> ensures consistent progress and <span className="font-extrabold text-red-400">success</span>.
        </p>
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16 mt-12">
        {greatPoints.map((point, index) => (<div key={index} className={`flex flex-col items-start p-8 rounded-xl bg-white shadow-lg border border-gray-200 transition-all duration-700 ease-out hover:shadow-xl hover:scale-[1.01] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: `${0.15 * index}s` }}>
            <div className="flex items-center mb-4">
                <span className={`text-5xl font-extrabold mr-4 ${point.letter === 'G' ? 'text-blue-600' : point.letter === 'R' ? 'text-purple-600' : point.letter === 'E' ? 'text-pink-600' : point.letter === 'A' ? 'text-green-600' : 'text-yellow-600'}`}>{point.letter}.</span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{point.word}</h3>
            </div>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">{point.description}</p>
            <span className="flex-shrink-0 text-blue-500 mt-auto">{point.icon}</span>
          </div>
        ))}
      </div>
      <div className={`relative z-10 w-full max-w-5xl mx-auto text-center mt-20 ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <div className="w-full flex flex-col items-center">
          <a href="#" className="inline-block bg-blue-600 text-white hover:bg-blue-700 font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75 text-xl">
            Explore Courses
          </a>
          <LearnersSocialProof />
        </div>
      </div>
    </section>
  );
};

// HowWeAreDifferentSection (New Section 5)
const HowWeAreDifferentSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInViewAnimation(sectionRef);

  const comparisonData = [
    { 
      param: "Personalized Coaching", 
      fabulinus: { status: true, detail: "One-on-one sessions tailored to your needs." }, 
      others: { status: false, detail: "Generic group classes, limited individual attention." } 
    },
    { 
      param: "Expert Instructors", 
      fabulinus: { status: true, detail: "Direct access to best-selling authors/experts." }, 
      others: { status: false, detail: "Standard trainers, often lacking author experience." }
    },
    { 
      param: "Flexible Learning", 
      fabulinus: { status: true, detail: "Flexible scheduling, on-demand resources, self-paced progress." }, 
      others: { status: false, detail: "Fixed class timings, rigid curricula." } 
    },
    { 
      param: "Transparent & Fair Grading", 
      fabulinus: { status: true, detail: "Clear rubrics, quantifiable criteria, open communication." }, 
      others: { status: false, detail: "Vague assessment, confusing methods." } 
    },
    { 
      param: "Continuous Feedback", 
      fabulinus: { status: true, detail: "Real-time, constructive feedback after each task." }, 
      others: { status: false, detail: "Infrequent or generalized feedback." } 
    },
    { 
      param: "Holistic Skill Development", 
      fabulinus: { status: true, detail: "Focus on fluency, precision, confidence, communication mastery." }, 
      others: { status: false, detail: "Primarily grammar and vocabulary drills." } 
    },
    { 
      param: "Measurable Progress", 
      fabulinus: { status: true, detail: "Regular tracking, detailed reports, clear benchmarks." }, 
      others: { status: false, detail: "Progress self-assessed, subjective feeling." }
    },
    { 
      param: "Short-Term Courses", 
      fabulinus: { status: true, detail: "Option for focused, intensive short-term programs." }, 
      others: { status: false, detail: "Often long, drawn-out courses." } 
    },
    { 
      param: "Guaranteed Results", 
      fabulinus: { status: true, detail: "Methodology ensures consistent, measurable progress." }, 
      others: { status: false, detail: "No explicit guarantees on individual student outcomes." } 
    },
  ];

  return (
    <section 
      ref={sectionRef} id="how-we-are-different" 
      className={`relative py-24 px-6 sm:px-10 lg:px-20 text-gray-800 overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-100`} 
    >
      <div className={`relative z-10 w-full max-w-5xl mx-auto text-center mb-16 ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-gray-800 leading-tight">
          Our <span className="text-red-400">Difference</span>.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 text-gray-800 max-w-3xl mx-auto">
          Discover what sets Fabulinus apart in English communication training.
        </p>
      </div>

      <div className={`relative z-10 w-full max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 ${isInView ? 'animate-fadeInScale' : 'opacity-0'}`}>
        <div className="grid grid-cols-3 text-center text-gray-800 font-bold text-xl py-4 border-b border-gray-300">
          <div className="col-span-1 py-2 flex items-center justify-start sm:justify-center">Parameter</div> 
          <div className="col-span-1 py-2 flex items-center justify-center">Fabulinus</div> 
          <div className="col-span-1 py-2 flex items-center justify-center">Others</div>
        </div>
        {comparisonData.map((item, index) => (
          <div key={index} className={`grid grid-cols-3 items-center py-4 px-2 sm:px-4 text-lg md:text-xl ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-200 last:border-b-0`}>
            <div className="col-span-1 text-left font-medium text-base sm:text-lg text-gray-800">{item.param}</div>
            <div className="col-span-1 flex justify-center">
              {item.fabulinus.status ? (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 17.5L14 23.5L24 9.5" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 10L22 22M22 10L10 22" stroke="#ef4444" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              )}
            </div>
            <div className="col-span-1 flex justify-center">
              {item.others.status ? (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 17.5L14 23.5L24 9.5" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 10L22 22M22 10L10 22" stroke="#ef4444" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


// FAQs Section Component (Section 6 - formerly Section 5)
const FAQsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInViewAnimation(sectionRef); // For section-level animation

  const [openIndex, setOpenIndex] = useState(null); // State to manage which FAQ is open

  const faqsData = [
    {
      question: "Who are the teachers at Fabulinus?",
      answer: `Aparna Sinha, a best-selling author, is supported by highly qualified, English language and communication <span class="font-extrabold text-red-400">experts</span>.` // Grammar: best-selling
    },
    {
      question: "What is the GREAT Approach?",
      answer: `The GREAT <span class="font-extrabold text-red-400">Approach</span> is our unique and structured methodology, built on five pillars: Grading, Regular Monitoring, Experts, Accessibility, and Transparency. It is designed to ensure measurable <span class="font-extrabold text-red-400">improvement</span> in communication and public speaking skills.`
    },
    {
      question: "How are classes conducted?",
      answer: `Classes are delivered <span class="font-extrabold text-red-400">one-on-one</span> in an online format, offering personalized attention and flexible <span class="font-extrabold text-red-400">scheduling</span>. You can book sessions at your convenience and access learning resources anytime.`
    },
    {
      question: "What age groups do you cater to?",
      answer: `We offer programs for <span class="font-extrabold text-red-400">all</span> age groups—including young learners, students, working professionals, and anyone aiming to enhance their English and communication <span class="font-extrabold text-red-400">abilities</span>.`
    },
    {
      question: "How do I track my progress?",
      answer: `You will receive regular <span class="font-extrabold text-red-400">feedback</span>, detailed progress reports, and clear learning <span class="font-extrabold text-red-400">benchmarks</span> after each session. Our transparent system ensures you stay informed and on track throughout your learning journey.`
    },
    {
      question: "How do I get an appointment with Aparna Mam?",
      answer: `Click the "Explore Courses" button anywhere on the site, fill in your details, and our team will contact you to <span class="font-extrabold text-red-400">schedule</span> your <span class="font-extrabold text-red-400">session</span> with Aparna Mam!`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      id="faqs" 
      className={`relative py-24 px-6 sm:px-10 lg:px-20 text-gray-800 overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50`} 
    >
      {/* Animated Background Elements (subtle blobs for this section) */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob-alt animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Title */}
      <div className={`relative z-10 w-full max-w-5xl mx-auto text-center mb-16 
        ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-gray-800 leading-tight">
          Frequently Asked <span className="font-extrabold text-red-400">Questions</span>
        </h1>
      </div>

      {/* FAQs Accordion */}
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-4">
        {faqsData.map((faq, index) => (
          <div 
            key={index} 
            className={`bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-all duration-500 ease-out hover:shadow-xl hover:scale-[1.005] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            <button 
              className="flex justify-between items-center w-full text-left font-semibold text-xl md:text-2xl text-gray-800 py-2 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span style={{fontSize: '24px', transition: 'transform 0.3s', transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'}}>▼</span>
            </button>
            <div className={`accordion-content ${openIndex === index ? 'open pt-4' : ''}`}>
              <p 
                className="text-lg text-gray-700 leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              ></p>
            </div>
          </div>
        ))}
      </div>
      <div className={`relative z-10 w-full max-w-5xl mx-auto text-center mt-20 ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <div className="w-full flex flex-col items-center">
          <a 
            href="#" 
            className="inline-block bg-blue-600 text-white hover:bg-blue-700 font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75 text-xl"
          >
            Explore Courses
          </a>
          <LearnersSocialProof />
        </div>
      </div>
    </section>
  );
};

// Footer Component (matches screenshot, with tagline)
const Footer = () => {
    return (
        <footer className="relative py-16 px-6 sm:px-10 lg:px-20 bg-gradient-to-br from-blue-800 to-indigo-900 text-white overflow-hidden">
            <div className="flex flex-col items-center justify-center space-y-6">
                <div className="text-4xl font-extrabold mb-1">fabulinus</div>
                <div className="text-lg font-medium text-blue-100 mb-2 tracking-wide">Express. Communicate. Dominate.</div>
                <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-xl font-normal mb-2">
                    <a href="#" className="hover:underline">Home</a>
                    <a href="#about" className="hover:underline">About Us</a>
                    <a href="#courses" className="hover:underline">Courses</a>
                </div>
                <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-xl font-normal mb-2">
                    <a href="#contact" className="hover:underline">Contact</a>
                    <a href="#privacy" className="hover:underline">Privacy Policy</a>
                </div>
                <div className="flex justify-center items-center gap-8 text-3xl mt-2 mb-4">
                    <a href="#" aria-label="Facebook" className="hover:text-blue-300" style={{display: 'inline-block'}}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="16" fill="#1877F2"/>
                            <path d="M21 10.5h-2.2c-.2 0-.3.1-.3.3v2.1h2.5c.2 0 .3.1.3.3l-.1 2.1c0 .2-.1.3-.3.3h-2.4v6.1c0 .2-.1.3-.3.3h-2.2c-.2 0-.3-.1-.3-.3v-6.1h-1.5c-.2 0-.3-.1-.3-.3v-2.1c0-.2.1-.3.3-.3h1.5v-1.3c0-1.7 1.1-2.7 2.7-2.7h2.2c.2 0 .3.1.3.3v2.1c0 .2-.1.3-.3.3z" fill="#fff"/>
                        </svg>
                    </a>
                    <a href="#" aria-label="Twitter" className="hover:text-blue-300" style={{display: 'inline-block'}}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="16" fill="#1DA1F2"/>
                            <path d="M24.5 12.1c-.5.2-1 .4-1.6.5.6-.4 1-1 1.2-1.6-.5.3-1.1.6-1.7.7-.5-.5-1.2-.9-2-.9-1.5 0-2.7 1.2-2.7 2.7 0 .2 0 .4.1.6-2.2-.1-4.1-1.2-5.4-2.8-.2.4-.3.8-.3 1.2 0 .9.5 1.7 1.2 2.2-.4 0-.8-.1-1.1-.3v.1c0 1.3.9 2.3 2.1 2.6-.2.1-.4.1-.7.1-.2 0-.3 0-.5-.1.3 1 1.2 1.7 2.2 1.7-0.8.6-1.8.9-2.8.9-.2 0-.4 0-.6-.1 1 .7 2.2 1.1 3.5 1.1 4.2 0 6.5-3.5 6.5-6.5v-.3c.4-.3.8-.7 1.1-1.1z" fill="#fff"/>
                        </svg>
                    </a>
                    <a href="#" aria-label="LinkedIn" className="hover:text-blue-300" style={{display: 'inline-block'}}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="16" fill="#0077B5"/>
                            <path d="M12.7 22h-2.6v-8.1h2.6V22zm-1.3-9.2c-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4zm10.1 9.2h-2.6v-4c0-1-.4-1.7-1.3-1.7-.7 0-1.1.5-1.3 1-.1.2-.1.5-.1.8V22h-2.6s.1-8.1 0-8.1h2.6v1.1c.3-.5 1-1.3 2.3-1.3 1.7 0 3 1.1 3 3.5V22z" fill="#fff"/>
                        </svg>
                    </a>
                    <a href="#" aria-label="Instagram" className="hover:text-blue-300" style={{display: 'inline-block'}}>
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#fff"/>
    <defs>
      <radialGradient id="ig-gradient" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="#fdf497"/>
        <stop offset="45%" stop-color="#fdf497"/>
        <stop offset="60%" stop-color="#fd5949"/>
        <stop offset="90%" stop-color="#d6249f"/>
        <stop offset="100%" stop-color="#285AEB"/>
      </radialGradient>
    </defs>
    <rect x="8.5" y="8.5" width="15" height="15" rx="4" stroke="url(#ig-gradient)" stroke-width="2" fill="none"/>
    <circle cx="16" cy="16" r="4" stroke="url(#ig-gradient)" stroke-width="2" fill="none"/>
    <circle cx="21.2" cy="12.8" r="1" fill="url(#ig-gradient)"/>
  </svg>
</a>
                </div>
                <div className="text-gray-300 text-base mt-2 mb-4">© 2025 Fabulinus. All rights reserved.</div>
            </div>
        </footer>
    );
};

// Blank pages for navigation (About, Courses, Contact)
const About = () => <section id="about" className="min-h-screen flex items-center justify-center bg-white text-gray-700"><h1 className="text-3xl font-bold">About Page (Coming Soon)</h1></section>;
const Courses = () => <section id="courses" className="min-h-screen flex items-center justify-center bg-white text-gray-700"><h1 className="text-3xl font-bold">Courses Page (Coming Soon)</h1></section>;
const Contact = () => <section id="contact" className="min-h-screen flex items-center justify-center bg-white text-gray-700"><h1 className="text-3xl font-bold">Contact Page (Coming Soon)</h1></section>;

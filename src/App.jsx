import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf, ShoppingBag, Info, Star, Recycle, CheckCircle, MapPin, Phone, Mail, Truck, Users, ShieldCheck, Navigation, Search, Calculator, Calendar, Sprout, ChevronRight, Stethoscope, Award, BadgeCheck, ArrowRight, Eye, Droplet, Sun } from 'lucide-react';

const FloatingLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const newLeaves = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 1.5 + 0.8}rem`,
      duration: `${Math.random() * 15 + 10}s`,
      delay: `${Math.random() * 10}s`,
      color: `var(--green-${Math.floor(Math.random() * 4 + 3) * 100})`
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden hidden md:block">
      {leaves.map(leaf => (
        <Leaf
          key={leaf.id}
          className="leaf text-primary-400"
          style={{
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
            animationDuration: leaf.duration,
            animationDelay: leaf.delay,
          }}
        />
      ))}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2 md:py-3' : 'bg-cream/90 backdrop-blur-md py-4 md:py-5'}`}>
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 md:gap-3 z-50">
          <img src="/HomePageImages/Logo.png" alt="Saruliyadda Logo" className="h-8 md:h-12 w-auto" />
          <div>
            <span className="block font-serif font-bold text-lg md:text-2xl text-primary-900 leading-tight">Saruliyadda</span>
            <span className="block text-[10px] md:text-xs text-primary-600 font-medium tracking-wider uppercase">Garden Shop</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {['Home', 'About', 'Clinic', 'Calculator', 'Brands', 'Products'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-primary-800 font-medium transition-colors">
              {item}
            </a>
          ))}
          <a href="#products" className="btn-primary py-2.5 px-5 text-sm">
            <ShoppingBag size={16} /> View Catalog
          </a>
        </nav>

        <div className="flex items-center gap-4 lg:hidden z-50">
          {/* Mobile Toggle */}
          <button className="text-primary-900 p-2 -mr-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {['Home', 'About', 'Clinic', 'Calculator', 'Brands', 'Products', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-3xl text-primary-900 font-serif font-bold hover:text-primary-600 transition-colors">
              {item}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

const HeroSlider = () => {
  const slides = [
    { img: '/HomePageImages/fruit 2.jpg', tag: '100% Organic', title: 'Grow Your Garden the Natural Way.', sub: 'Premium organic compost, delivered with love from Saruliyadda.' },
    { img: '/HomePageImages/fruit 5.jpg', tag: 'Bountiful Harvests', title: 'Nutrients for Every Season.', sub: 'Give your plants the foundation they need to thrive and produce.' },
    { img: '/HomePageImages/fruit 3.jpg', tag: 'Sustainable Farming', title: 'Protecting Mother Earth.', sub: 'Our compost helps retain soil moisture and reduce chemical runoff.' },
    { img: '/HomePageImages/fruit 6.jpg', tag: 'Expert Care', title: 'Healthy Soil, Healthy Life.', sub: 'Join 5000+ gardeners transforming their land with Saruliyadda.' },
    { img: '/HomePageImages/fruit 1.jpg', tag: 'Vibrant Blooms', title: 'Unlock Your Garden\'s Potential.', sub: 'From vegetables to exotic flowers, we have the right feed for you.' }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-24 overflow-hidden bg-primary-900">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover opacity-40 scale-105" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/80 to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-12 md:py-0">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/20 mb-6 md:mb-8 animate-fade-in-up">
            <Leaf size={14} className="text-primary-300 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-semibold tracking-wide uppercase">{slides[current].tag}</span>
          </div>
          
          <h1 key={current} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight animate-fade-in-up">
            {slides[current].title.split('.')[0]}.<br />
            <span className="text-primary-300">{slides[current].title.split('.')[1]}</span>
          </h1>
          
          <p key={`${current}-sub`} className="text-base sm:text-lg md:text-xl text-primary-50 mb-8 md:mb-10 max-w-lg leading-relaxed opacity-90 animate-fade-in-up delay-100">
            {slides[current].sub}
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 animate-fade-in-up delay-200">
            <a href="#products" className="btn-primary bg-white text-primary-900 hover:bg-primary-50 hover:text-primary-900 w-full sm:w-auto justify-center group">
              <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" /> Browse Catalog
            </a>
            <a href="#clinic" className="btn-primary bg-primary-800 text-white hover:bg-primary-700 border-none w-full sm:w-auto justify-center group shadow-[0_4px_14px_rgba(27,67,50,0.39)]">
              <Stethoscope size={20} className="group-hover:rotate-12 transition-transform" /> Plant Clinic
            </a>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${current === idx ? 'bg-primary-300 w-8' : 'bg-white/40 hover:bg-white'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

const TrustBar = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 5000;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-primary-900 py-8 md:py-12 border-t border-primary-800 relative z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-white">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl md:bg-transparent md:p-0 md:rounded-none border border-white/10 md:border-none">
            <Leaf size={32} className="text-primary-400 shrink-0" />
            <div><strong className="block text-base md:text-lg">100% Organic</strong><span className="text-primary-300 text-xs md:text-sm">Natural ingredients only</span></div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl md:bg-transparent md:p-0 md:rounded-none border border-white/10 md:border-none">
            <Truck size={32} className="text-primary-400 shrink-0" />
            <div><strong className="block text-base md:text-lg">Island-Wide</strong><span className="text-primary-300 text-xs md:text-sm">Delivery across Sri Lanka</span></div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl md:bg-transparent md:p-0 md:rounded-none border border-white/10 md:border-none">
            <Users size={32} className="text-primary-400 shrink-0" />
            <div><strong className="block text-base md:text-lg">{count.toLocaleString()}+ Gardeners</strong><span className="text-primary-300 text-xs md:text-sm">Join our growing family</span></div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl md:bg-transparent md:p-0 md:rounded-none border border-white/10 md:border-none">
            <ShieldCheck size={32} className="text-primary-400 shrink-0" />
            <div><strong className="block text-base md:text-lg">Authorized Dealer</strong><span className="text-primary-300 text-xs md:text-sm">Premium Global Brands</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustedBrands = () => {
  return (
    <section id="brands" className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-semibold text-xs sm:text-sm mb-4 shadow-sm border border-primary-100">
            <Award size={14} className="sm:w-4 sm:h-4" /> Trusted Excellence
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-4 leading-tight">We Partner with the Best</h2>
          <p className="text-gray-600 text-sm sm:text-lg">We only stock products from globally recognized brands that guarantee safety, quality, and exceptional yields.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Brand 1 */}
          <div className="bg-cream rounded-[2rem] p-8 md:p-10 border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
            <div className="h-24 flex items-center mb-6">
              <img src="/HomePageImages/PartnerLogo7.png" alt="Unipower" className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">Unipower Quality</h3>
            <p className="text-gray-600 mb-6 flex-1">
              Unipower brings world-class agricultural technology directly to Sri Lankan farmers. Known for their precise Yara Mila and Osmocote fertilizers, they ensure your plants get the exact nutrients they need at every growth stage.
            </p>
            <ul className="space-y-2 mb-8">
              {['Global Norwegian Technology (Yara)', 'High-purity micro-nutrients', 'Proven yield increases'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-primary-900 font-medium">
                  <BadgeCheck size={16} className="text-green-500" /> {item}
                </li>
              ))}
            </ul>
            <a href="#products" className="text-primary-600 font-bold hover:text-primary-800 flex items-center gap-2 uppercase tracking-wide text-sm mt-auto">
              View Unipower Range <ArrowRight size={16} />
            </a>
          </div>

          {/* Brand 2 */}
          <div className="bg-cream rounded-[2rem] p-8 md:p-10 border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
            <div className="h-24 flex items-center mb-6">
              <img src="/HomePageImages/PartnerLogo1.png" alt="CIC" className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">CIC Agriculture</h3>
            <p className="text-gray-600 mb-6 flex-1">
              As a pioneer in Sri Lankan agriculture, CIC provides specialized seeds, crop protection, and fertilizers tailored specifically for the Sri Lankan climate and soil conditions, ensuring resilient and healthy growth.
            </p>
            <ul className="space-y-2 mb-8">
              {['Tailored for Sri Lankan climate', 'Rigorous quality testing', 'Decades of local trust'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-primary-900 font-medium">
                  <BadgeCheck size={16} className="text-green-500" /> {item}
                </li>
              ))}
            </ul>
            <a href="#products" className="text-primary-600 font-bold hover:text-primary-800 flex items-center gap-2 uppercase tracking-wide text-sm mt-auto">
              View CIC Range <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-16 md:py-24 bg-white relative overflow-hidden">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative order-2 lg:order-1 px-4 sm:px-0 mt-8 lg:mt-0">
          <img src="/HomePageImages/fruit 7.jpg" alt="Our garden" className="rounded-3xl shadow-2xl w-full object-cover h-[300px] sm:h-[400px] lg:h-[500px]" />
          <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 bg-primary-800 text-white p-4 sm:p-8 rounded-2xl shadow-xl text-center border-4 border-white">
            <span className="block font-serif text-3xl sm:text-5xl font-bold mb-1">20+</span>
            <span className="block text-[10px] sm:text-sm uppercase tracking-wider text-primary-200 font-semibold">Years of Growing</span>
          </div>
          <div className="absolute -top-4 -left-2 sm:-top-6 sm:-left-6 bg-green-500 text-white p-3 sm:p-5 rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 animate-bounce border-4 border-white" style={{animationDuration: '3s'}}>
            <Recycle className="w-6 h-6 sm:w-8 sm:h-8" />
            <div>
              <span className="block text-lg sm:text-2xl font-bold leading-none">10K+</span>
              <span className="block text-[8px] sm:text-xs uppercase tracking-wider mt-1">Tons Recycled</span>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-semibold text-xs sm:text-sm mb-4 sm:mb-6">
            <Info size={14} className="sm:w-4 sm:h-4" /> The Saruliyadda Story
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-4 sm:mb-6 leading-tight">Your Trusted Partner in Organic Gardening</h2>
          <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
            Welcome to Saruliyadda Garden Shop! Founded by <strong>Mr. D. Upul Priyadarshana</strong>, we've spent over two decades helping Sri Lankan gardeners, farmers, and plant lovers grow healthier, greener gardens — the natural way.
          </p>
          <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
            We are the proud creators of <strong>Saruliyadda Compost</strong>, a premium organic fertilizer made entirely from natural materials. We're also authorized distributors of CIC and UNIPOWER products.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {['Expert gardening consultancy', 'Premium organic compost', 'Wide range of supplies', 'Two convenient locations'].map((feat, i) => (
              <div key={i} className="flex items-center gap-3 text-primary-900 font-medium text-sm sm:text-base bg-primary-50 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none">
                <CheckCircle size={18} className="text-primary-600 shrink-0" /> 
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PlantClinic = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const issues = [
    {
      id: 1,
      symptom: "Yellowing Leaves",
      emoji: "🍂",
      keywords: ["yellow", "pale", "color", "fading", "light", "leaves", "bottom leaves"],
      diagnosis: "Nitrogen Deficiency or Overwatering.",
      solution: "Apply our Grow More Nitro Plus or mix Saruliyadda Cattle Manure into the topsoil to boost Nitrogen.",
    },
    {
      id: 2,
      symptom: "Poor Flowering/Fruiting",
      emoji: "🌸",
      keywords: ["flower", "fruit", "bloom", "yield", "drop", "small", "no flowers", "dropping flowers"],
      diagnosis: "Phosphorus/Potassium Deficiency.",
      solution: "Use Biofol Flower Booster or Osmocote High K during the blooming stage.",
    },
    {
      id: 3,
      symptom: "Stunted or Slow Growth",
      emoji: "🌱",
      keywords: ["slow", "small", "stunted", "not growing", "stop", "growth"],
      diagnosis: "Poor Soil Structure / Lack of Nutrients.",
      solution: "Till in Saruliyadda Premium Compost to aerate the soil and introduce beneficial microorganisms.",
    },
    {
      id: 4,
      symptom: "Wilting in Sun / Dry Soil",
      emoji: "☀️",
      keywords: ["wilt", "dry", "droop", "heat", "sun", "water", "dying in sun", "wilting"],
      diagnosis: "Poor moisture retention or extreme heat.",
      solution: "Apply Coco Chips as mulch on the surface, and consider setting up our Shade Nets.",
    },
    {
      id: 5,
      symptom: "Holes in Leaves / Pest Damage",
      emoji: "🐛",
      keywords: ["hole", "bite", "insect", "pest", "bug", "eat", "caterpillar", "brown spots", "eaten"],
      diagnosis: "Pest Infestation (Caterpillars/Beetles).",
      solution: "Install Insect Proof Nets to physically protect crops from pests without harmful chemicals.",
    },
    {
      id: 6,
      symptom: "Root Rot (Black/Mushy Roots)",
      emoji: "🥀",
      keywords: ["mushy", "black roots", "dying", "smell", "rot", "root"],
      diagnosis: "Severe Overwatering and Poor Drainage.",
      solution: "Mix Coir Dust and Coco Chips into your soil to drastically improve drainage and aeration.",
    }
  ];

  const filteredIssues = issues.filter(issue => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return issue.symptom.toLowerCase().includes(query) || 
           issue.keywords.some(k => query.includes(k) || k.includes(query));
  });

  return (
    <section id="clinic" className="py-16 md:py-24 bg-primary-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-white text-primary-800 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-semibold text-xs sm:text-sm mb-4 shadow-sm border border-primary-100">
            <Stethoscope size={14} className="sm:w-4 sm:h-4 text-primary-600" /> Plant Diagnosis
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-4 md:mb-6">Describe Your Plant's Fault</h2>
          
          <div className="relative max-w-lg mx-auto">
            <input 
              type="text" 
              placeholder="e.g. 'My plant has yellow leaves' or 'holes'" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIssue(null);
              }}
              className="w-full pl-5 pr-12 py-3 sm:py-4 rounded-full border-2 border-primary-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-sm sm:text-base bg-white shadow-md text-gray-800"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-primary-400" size={20} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Symptoms List */}
          <div className="space-y-3 sm:space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredIssues.length > 0 ? (
              filteredIssues.map(issue => (
                <button
                  key={issue.id}
                  onClick={() => setSelectedIssue(issue)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group ${selectedIssue?.id === issue.id ? 'bg-primary-800 border-primary-800 text-white shadow-lg shadow-primary-900/20' : 'bg-white border-white hover:border-primary-300 text-gray-800 shadow-sm'}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-2xl sm:text-3xl">{issue.emoji}</span>
                    <span className="font-semibold text-base sm:text-lg">{issue.symptom}</span>
                  </div>
                  <ChevronRight className={`transition-transform ${selectedIssue?.id === issue.id ? 'text-primary-300 rotate-90 md:rotate-0' : 'text-gray-300 group-hover:text-primary-400'}`} />
                </button>
              ))
            ) : (
              <div className="text-center py-10 bg-white rounded-2xl border border-gray-100 h-full flex flex-col justify-center">
                <p className="text-gray-500 text-lg">No matching faults found.</p>
                <button onClick={() => setSearchQuery('')} className="text-primary-600 font-semibold mt-2 hover:underline">View all common faults</button>
              </div>
            )}
          </div>

          {/* Diagnosis Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-primary-100 relative h-full flex flex-col min-h-[350px]">
            {!selectedIssue ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-center py-8">
                <Leaf size={64} className="mb-4 opacity-20" />
                <p className="text-base sm:text-lg">Select a matching fault from the left to get a diagnosis.</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-fade-in-up">
                <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6 w-fit">
                  Diagnosis
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{selectedIssue.diagnosis}</h4>
                
                <div className="h-px w-full bg-gray-100 my-4 sm:my-6"></div>
                
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4 w-fit">
                  Recommended Solution
                </div>
                <p className="text-gray-700 text-sm sm:text-lg leading-relaxed mb-8 flex-1">
                  {selectedIssue.solution}
                </p>
                
                <button 
                  onClick={() => {
                    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary w-full justify-center py-3.5 sm:py-4 bg-primary-50 text-primary-900 hover:bg-primary-100 border border-primary-200 text-sm sm:text-base mt-auto"
                >
                  <Search size={18} /> View Recommended Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const SoilCalculator = () => {
  const [area, setArea] = useState(10);
  const [depth, setDepth] = useState(2);

  const calculateCompost = () => {
    const volume = area * (depth / 100); 
    const kg = volume * 600; 
    return Math.ceil(kg);
  };

  return (
    <section id="calculator" className="py-16 md:py-24 bg-primary-900 relative text-white">
      <div className="absolute inset-0 bg-[url('/Images/Compost20KG.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 md:p-12 rounded-[2rem] shadow-2xl">
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-500 rounded-full mb-4 shadow-lg">
              <Calculator size={24} className="text-white sm:w-8 sm:h-8" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3 md:mb-4 leading-tight">Compost Calculator</h2>
            <p className="text-primary-200 text-sm sm:text-base max-w-lg mx-auto">Not sure how much you need? Calculate the perfect amount for your garden bed effortlessly.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-center">
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-primary-200 mb-2 uppercase tracking-wide">Garden Area (Square Meters)</label>
                <div className="flex items-center bg-white/10 rounded-xl px-4 py-3 border border-white/20 focus-within:border-white focus-within:bg-white/20 transition-all">
                  <input type="number" min="1" value={area} onChange={e => setArea(Number(e.target.value))} className="bg-transparent w-full outline-none text-xl md:text-2xl font-bold" />
                  <span className="text-primary-300 ml-2 font-medium">m²</span>
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-primary-200 mb-2 uppercase tracking-wide">Compost Depth (Centimeters)</label>
                <div className="flex items-center bg-white/10 rounded-xl px-4 py-3 border border-white/20 focus-within:border-white focus-within:bg-white/20 transition-all">
                  <input type="number" min="1" value={depth} onChange={e => setDepth(Number(e.target.value))} className="bg-transparent w-full outline-none text-xl md:text-2xl font-bold" />
                  <span className="text-primary-300 ml-2 font-medium">cm</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 text-primary-900 text-center shadow-inner mt-4 lg:mt-0 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600"></div>
              <h4 className="text-sm sm:text-base font-bold text-gray-500 mb-2 uppercase tracking-wide">You Will Need Approximately</h4>
              <div className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-primary-800 mb-3 md:mb-4">
                {calculateCompost()} <span className="text-2xl sm:text-3xl text-primary-600">KG</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-6">We recommend purchasing <strong className="text-primary-800">{Math.ceil(calculateCompost() / 20)}</strong> bags of our 20KG Premium Compost.</p>
              <button onClick={() => {document.getElementById('products').scrollIntoView({ behavior: 'smooth' });}} className="btn-primary bg-primary-800 w-full justify-center py-3.5 sm:py-4 sm:text-lg hover:-translate-y-1 transition-transform border-none">
                <ShoppingBag size={20} /> View Compost Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PlantingCalendar = () => {
  const seasons = [
    {
      name: "Maha Season",
      months: "September to March",
      desc: "The major farming season, matching the North-East monsoon. High rainfall.",
      crops: ["Paddy", "Beans", "Tomatoes", "Carrots", "Pumpkin"],
      icon: <Droplet className="text-blue-500 w-8 h-8" />,
      color: "border-blue-100 bg-blue-50/30"
    },
    {
      name: "Yala Season",
      months: "May to August",
      desc: "The minor farming season, matching the South-West monsoon. Drier conditions.",
      crops: ["Chili", "Brinjal", "Okra", "Green Gram", "Cowpea"],
      icon: <Sun className="text-yellow-500 w-8 h-8" />,
      color: "border-yellow-100 bg-yellow-50/30"
    }
  ];

  return (
    <section id="calendar" className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-semibold text-xs sm:text-sm mb-4">
            <Calendar size={14} className="sm:w-4 sm:h-4" /> Cultivation Guide
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-3 md:mb-4">Sri Lanka Planting Calendar</h2>
          <p className="text-gray-600 text-sm sm:text-lg">Optimize your harvest by planting the right crops at the right time in Sri Lanka's two major farming seasons.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto">
          {seasons.map((season, idx) => (
            <div key={idx} className={`rounded-3xl border-2 ${season.color} p-8 flex flex-col h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-3xl font-bold text-gray-900 mb-1">{season.name}</h3>
                  <span className="font-semibold text-primary-600 uppercase tracking-wider text-sm">{season.months}</span>
                </div>
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                  {season.icon}
                </div>
              </div>
              <p className="text-gray-600 mb-8 flex-1">{season.desc}</p>
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Recommended Crops</h4>
                <div className="flex flex-wrap gap-2">
                  {season.crops.map(crop => (
                    <span key={crop} className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProduct]);

  const allProducts = [
    // Saruliyadda Range
    { id: 'p1', name: "Compost 05 KG", cat: "saruliyadda", img: "/Images/Compost05KG.jpg", desc: "Perfect for home gardens, flower pots, and small vegetable patches." },
    { id: 'p2', name: "Compost 10 KG", cat: "saruliyadda", img: "/Images/Compost10KG.jpg", desc: "Our bestseller! Ideal for medium gardens, raised beds, and landscaping." },
    { id: 'p3', name: "Compost 20 KG", cat: "saruliyadda", img: "/Images/Compost20KG.jpg", desc: "Best value for farms, large gardens, and commercial growing operations." },
    { id: 'p4', name: "Coco Chips", cat: "saruliyadda", img: "/Images/CocoChips.jpg" },
    { id: 'p5', name: "Coir Dust", cat: "saruliyadda", img: "/Images/CoirDust.jpg" },
    { id: 'p6', name: "Cattle Manure", cat: "saruliyadda", img: "/Images/CattleMannure.jpg" },
    { id: 'p7', name: "Dahaiyya", cat: "saruliyadda", img: "/Images/Dhaiyya.jpg" },

    // Unipower
    { id: 'p8', name: "Yara Mila Target", cat: "unipower", img: "/Images/YaraMilaTarget.jpg" },
    { id: 'p9', name: "Yara Mila Complex", cat: "unipower", img: "/Images/YaraMilaComplex.jpg" },
    { id: 'p10', name: "Yara Mila Winner", cat: "unipower", img: "/Images/YaraMilaWinner.jpg" },
    { id: 'p11', name: "Yara Mila Grower", cat: "unipower", img: "/Images/YaraMilaGrover.jpg" },
    { id: 'p12', name: "Yara Mila Calcinit", cat: "unipower", img: "/Images/YaraMilaCalcinit.jpg" },
    { id: 'p13', name: "Yara Liva Tropicote", cat: "unipower", img: "/Images/YaraLivaTropicote.jpg" },
    { id: 'p14', name: "Yara Mila 25-7-7", cat: "unipower", img: "/Images/YaraMila25-7-7.jpg" },
    { id: 'p15', name: "Yara Mila 15-15-15", cat: "unipower", img: "/Images/YaraMila15-15-15.jpg" },
    { id: 'p16', name: "Nutrivant Plus", cat: "unipower", img: "/Images/NutrivantPlus.jpg" },
    { id: 'p17', name: "Osmocote High N", cat: "unipower", img: "/Images/OsmocoteHighN.jpg" },
    { id: 'p18', name: "Osmocote High K", cat: "unipower", img: "/Images/OsmocoteHighK.jpg" },
    { id: 'p19', name: "Osmocote All Purpose", cat: "unipower", img: "/Images/OsmocoteAllPurpose.jpg" },
    { id: 'p20', name: "Albert Solution", cat: "unipower", img: "/Images/AlbertSolution.jpg" },
    { id: 'p21', name: "Agri Phoska YPM", cat: "unipower", img: "/Images/AgriPhoskaYPM.png" },
    { id: 'p22', name: "Agri Phoska APM", cat: "unipower", img: "/Images/AgroPhoskaAPM.png" },
    { id: 'p23', name: "Grow More Nitro Plus", cat: "unipower", img: "/Images/GrowMoreNitroPlus.jpg" },
    { id: 'p24', name: "Grow More Plant Starter", cat: "unipower", img: "/Images/GrowMorePlantStarter.jpg" },
    { id: 'p25', name: "Grow More K44", cat: "unipower", img: "/Images/GrowMoreK44.jpg" },
    { id: 'p26', name: "Grow More Bloom Special", cat: "unipower", img: "/Images/GrowMoreBloomSpecial.jpg" },
    { id: 'p27', name: "Grow More 3 in 1", cat: "unipower", img: "/Images/GrowMore3in1.jpg" },
    { id: 'p28', name: "Crop Master", cat: "unipower", img: "/Images/CropMaster.jpg" },
    { id: 'p29', name: "Clonex", cat: "unipower", img: "/Images/Clonex.jpg" },
    { id: 'p30', name: "Rapid Root", cat: "unipower", img: "/Images/RapidRoot.jpg" },
    { id: 'p31', name: "Yara Vita Zintrac", cat: "unipower", img: "/Images/YaraVitaZintrac.png" },
    { id: 'p32', name: "Yara Vita Bortrac", cat: "unipower", img: "/Images/YaraVitaBortrac.png" },
    { id: 'p33', name: "Biofol Green Flush", cat: "unipower", img: "/Images/BiofolGreenFlush.png" },
    { id: 'p34', name: "Biofol Flower Booster", cat: "unipower", img: "/Images/BiofolFlowerBooster.png" },
    { id: 'p35', name: "Peters Professional", cat: "unipower", img: "/Images/PetersProfessional.png" },

    // Tools & Accessories
    { id: 'p36', name: "Insect Proof Net", cat: "tools", img: "/Images/InsectProofNet.jpg" },
    { id: 'p37', name: "Poly Mulch", cat: "tools", img: "/Images/PolyMulch.jpg" },
    { id: 'p38', name: "Shade Nets", cat: "tools", img: "/Images/ShadeNets.jpg" },
    { id: 'p39', name: "Trellising Twine", cat: "tools", img: "/Images/Trellising Twine.jpg" }
  ];

  const filteredProducts = allProducts.filter(p => {
    const matchCat = filter === 'all' || p.cat === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="products" className="py-16 md:py-24 bg-cream relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-white text-primary-800 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-semibold text-xs sm:text-sm mb-4 shadow-sm border border-primary-100">
            <ShoppingBag size={14} className="sm:w-4 sm:h-4" /> Our Products
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-3 md:mb-4">Explore Our Catalog</h2>
          <p className="text-gray-600 text-sm sm:text-lg">Browse our premium organic compost, fertilizers, and gardening tools below.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'saruliyadda', label: '🌿 Saruliyadda' },
            { id: 'unipower', label: '⚡ Unipower' },
            { id: 'tools', label: '🛠️ Tools & Nets' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold transition-all duration-300 border-2 text-sm sm:text-base whitespace-nowrap shrink-0 ${filter === btn.id ? 'bg-primary-800 text-white border-primary-800 shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:border-primary-400'}`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12 sm:mb-16 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for a product..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-full border-2 border-white focus:border-primary-600 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-sm sm:text-base bg-white shadow-sm"
          />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 sm:py-20 text-gray-400">
            <Search size={48} className="mx-auto mb-4 opacity-50 sm:w-16 sm:h-16" />
            <h4 className="text-xl sm:text-2xl font-serif text-gray-500 mb-2">No products found</h4>
            <p className="text-sm sm:text-base">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {filteredProducts.map((p, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedProduct(p)}
                className="bg-white p-3 sm:p-5 rounded-2xl border border-gray-100 hover:border-primary-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full group"
              >
                <div className="aspect-square bg-gray-50/50 rounded-xl mb-3 sm:mb-4 overflow-hidden flex items-center justify-center p-2 sm:p-4 relative">
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur text-primary-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-all flex items-center gap-1">
                      <Eye size={14} /> Quick View
                    </span>
                  </div>
                  <img src={p.img} alt={p.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" onError={(e) => e.target.src = '/HomePageImages/Logo.png'} />
                </div>
                <div className="mt-auto text-center px-1 mb-2 flex-1 flex flex-col">
                  <span className="text-[10px] sm:text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1 truncate">{p.cat}</span>
                  <h4 className="font-semibold text-gray-900 leading-snug text-sm sm:text-base line-clamp-2">{p.name}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-[2rem] max-w-4xl w-full flex flex-col md:flex-row overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 my-8 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProduct(null)} className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-900 bg-white/80 backdrop-blur rounded-full p-2 z-20 shadow-sm">
              <X size={20} />
            </button>
            
            <div className="w-full md:w-1/2 bg-cream p-8 md:p-12 flex items-center justify-center relative group">
              <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full max-w-[250px] md:max-w-none h-auto max-h-[300px] md:max-h-[450px] object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500" onError={(e) => e.target.src = '/HomePageImages/Logo.png'} />
            </div>
            
            <div className="w-full md:w-1/2 p-8 md:p-12 relative flex flex-col justify-center">
              <button onClick={() => setSelectedProduct(null)} className="hidden md:flex absolute top-6 right-6 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors">
                <X size={20} />
              </button>
              
              <span className="inline-block bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4">{selectedProduct.cat}</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">{selectedProduct.name}</h2>
              <div className="w-12 h-1 bg-primary-500 rounded-full mb-6"></div>
              
              <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
                {selectedProduct.desc || "Premium quality product recommended by experts for achieving the best agricultural and gardening results. Please inquire for availability."}
              </p>
              
              <div className="mt-auto">
                <a 
                  href={`https://wa.me/94777676958?text=${encodeURIComponent(`Hi Saruliyadda! 🌱 I would like to know more about the product: ${selectedProduct.name}.`)}`} 
                  target="_blank" rel="noreferrer"
                  className="btn-primary w-full justify-center text-base sm:text-lg py-3.5 sm:py-4 bg-[#25D366] hover:bg-[#1ebe57] border-none shadow-[0_4px_14px_rgba(37,211,102,0.39)] hover:-translate-y-1"
                >
                  <Phone size={20} /> Ask about this product
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const Stores = () => (
  <section id="stores" className="py-16 md:py-24 bg-white relative border-t border-gray-100">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-semibold text-xs sm:text-sm mb-4">
          <MapPin size={14} className="sm:w-4 sm:h-4" /> Visit Us
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-3 md:mb-4">Our Store Locations</h2>
        <p className="text-gray-600 text-sm sm:text-lg">Come visit us! Our friendly team is ready to help you find exactly what your garden needs.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
        <div className="bg-cream p-8 sm:p-10 rounded-3xl border border-primary-100 text-center hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
          <MapPin size={40} className="mx-auto text-primary-600 mb-5 sm:mb-6 sm:w-12 sm:h-12" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary-900 mb-2 sm:mb-3">Bandarawatta Store</h3>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">645-D, Kandy Road, Bandarawatta, Kadawatha</p>
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 mb-6 sm:mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <p className="font-medium text-primary-800 text-xs sm:text-sm">Open Daily: 7 AM – 6 PM</p>
          </div>
          <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="btn-outline w-full justify-center bg-white hover:bg-primary-900 hover:text-white hover:border-primary-900 text-sm sm:text-base py-3">
            <Navigation size={16} className="sm:w-4 sm:h-4" /> Get Directions
          </a>
        </div>
        <div className="bg-cream p-8 sm:p-10 rounded-3xl border border-primary-100 text-center hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
          <MapPin size={40} className="mx-auto text-primary-600 mb-5 sm:mb-6 sm:w-12 sm:h-12" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary-900 mb-2 sm:mb-3">Makola Store</h3>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">281/B Makola Road, Kiribathgoda</p>
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 mb-6 sm:mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <p className="font-medium text-primary-800 text-xs sm:text-sm">Open Daily: 7 AM – 6 PM</p>
          </div>
          <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="btn-outline w-full justify-center bg-white hover:bg-primary-900 hover:text-white hover:border-primary-900 text-sm sm:text-base py-3">
            <Navigation size={16} className="sm:w-4 sm:h-4" /> Get Directions
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-16 md:py-24 bg-primary-900 text-white relative">
    <div className="absolute inset-0 bg-[url('/HomePageImages/fruit%202.jpg')] opacity-[0.05] bg-cover bg-center"></div>
    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-semibold text-xs sm:text-sm mb-4 sm:mb-6 text-primary-300">
            <Phone size={14} className="sm:w-4 sm:h-4" /> Get in Touch
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">We'd Love to Hear From You</h2>
          <p className="text-primary-200 text-base sm:text-lg mb-8 sm:mb-12 max-w-md leading-relaxed">Have questions about our products? Need gardening advice? Drop us a message or visit our stores!</p>
          
          <div className="space-y-6 sm:space-y-8">
            <div className="flex gap-4 sm:gap-5 items-start">
              <div className="bg-primary-800 p-3 sm:p-4 rounded-2xl shadow-inner"><Phone size={20} className="text-primary-300 sm:w-6 sm:h-6" /></div>
              <div>
                <strong className="block text-lg sm:text-xl mb-1 text-white">Phone & Hotline</strong>
                <p className="text-primary-200 text-sm sm:text-base font-medium">+94 777 676 958<br/>+94 777 676 408</p>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-5 items-start">
              <div className="bg-primary-800 p-3 sm:p-4 rounded-2xl shadow-inner"><Mail size={20} className="text-primary-300 sm:w-6 sm:h-6" /></div>
              <div>
                <strong className="block text-lg sm:text-xl mb-1 text-white">Email</strong>
                <a href="mailto:hello@saruliyadda.com" className="text-primary-200 hover:text-white transition-colors text-sm sm:text-base font-medium">hello@saruliyadda.com</a>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] text-gray-800 shadow-2xl relative">
          <div className="absolute top-0 right-8 w-20 h-2 bg-primary-500 rounded-b-full"></div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary-900 mb-6 sm:mb-8">Send a Message</h3>
          <form className="space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <input type="text" placeholder="Your Name" className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all text-sm sm:text-base" required />
              <input type="email" placeholder="Your Email" className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all text-sm sm:text-base" required />
            </div>
            <textarea placeholder="How can we help you?" rows="4" className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all resize-none text-sm sm:text-base" required></textarea>
            <button className="btn-primary w-full justify-center py-3.5 sm:py-4 text-base sm:text-lg mt-2 shadow-[0_4px_14px_rgba(27,67,50,0.3)] hover:-translate-y-1">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const OurCompost = () => (
  <section className="py-16 md:py-24 bg-primary-50 relative">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 bg-white text-primary-800 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-semibold text-xs sm:text-sm mb-4 shadow-sm border border-primary-100">
          <Award size={14} className="sm:w-4 sm:h-4 text-primary-600" /> Our Signature Product
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-3 md:mb-4">Saruliyadda Premium Organic Compost</h2>
        <p className="text-gray-600 text-sm sm:text-lg">The heart of everything we do — carefully crafted compost that transforms your soil and supercharges your plants.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { img: "/Images/Compost05KG.jpg", name: "5 KG Pack", desc: "Perfect for home gardens, flower pots, and small vegetable patches.", popular: false },
          { img: "/Images/Compost10KG.jpg", name: "10 KG Pack", desc: "Our bestseller! Ideal for medium gardens, raised beds, and landscaping.", popular: true },
          { img: "/Images/Compost20KG.jpg", name: "20 KG Pack", desc: "Best value for farms, large gardens, and commercial growing operations.", popular: false }
        ].map((item, idx) => (
          <div key={idx} className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col h-full border ${item.popular ? 'border-primary-400 shadow-xl relative transform md:-translate-y-4' : 'border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2'} transition-all duration-300`}>
            {item.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">Most Popular</div>
            )}
            <img src={item.img} alt={item.name} className="w-full h-48 object-contain mb-6 mix-blend-multiply" />
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3 text-center">{item.name}</h3>
            <p className="text-gray-600 text-center mb-8 flex-1 text-sm sm:text-base">{item.desc}</p>
            <a href={`https://wa.me/94777676958?text=${encodeURIComponent(`Hi! I'm interested in the ${item.name} compost.`)}`} target="_blank" rel="noreferrer" className={`btn-primary w-full justify-center ${item.popular ? '' : 'bg-white text-primary-900 border-2 border-primary-200 hover:bg-primary-50'} py-3 text-sm sm:text-base`}>
              Inquire via WhatsApp
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-16 md:py-24 bg-cream">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-semibold text-xs sm:text-sm mb-4">
          <Star size={14} className="sm:w-4 sm:h-4 text-primary-600" /> Customer Love
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">What Our Gardeners Say</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {[
          { text: "Saruliyadda compost completely transformed my vegetable garden. My tomatoes and beans have never been this healthy! Highly recommend.", name: "Kamala Perera", role: "Home Gardener, Kadawatha" },
          { text: "I've been buying from Saruliyadda for 5 years now. Their products are top quality and Mr. Upul always gives excellent advice.", name: "Nuwan Fernando", role: "Landscape Designer, Colombo" },
          { text: "Best compost in Sri Lanka! My orchids are blooming beautifully. The Makola store staff is always so friendly and helpful.", name: "Dilini Jayawardena", role: "Orchid Enthusiast, Kiribathgoda" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex text-yellow-400 mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <p className="text-gray-700 italic mb-8 leading-relaxed">"{item.text}"</p>
            <div>
              <strong className="block text-gray-900 font-bold">{item.name}</strong>
              <span className="text-sm text-gray-500">{item.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PartnersMarquee = () => {
  const logos = [
    { img: '/HomePageImages/PartnerLogo1.png', label: 'CIC' },
    { img: '/HomePageImages/PartnerLogo3.jpg', label: 'Partner' },
    { img: '/HomePageImages/PartnerLogo5.jpg', label: 'Partner' },
    { img: '/HomePageImages/PartnerLogo7.png', label: 'Unipower' },
    { img: '/HomePageImages/PartnerLogo8.png', label: 'Partner' }
  ];
  return (
    <section className="py-12 md:py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-400 uppercase tracking-widest mb-8 md:mb-12">Authorized Distributor Of</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16">
          {logos.map((logo, idx) => (
            <img key={idx} src={logo.img} alt={logo.label} className="h-12 sm:h-16 md:h-20 w-auto object-contain mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-primary-200 selection:text-primary-900 overflow-x-hidden">
      <FloatingLeaves />
      <Navbar />
      
      <main>
        <HeroSlider />
        <TrustBar />
        
        {/* Core Offerings at the top */}
        <OurCompost />
        <Products />
        <PlantClinic />
        
        {/* Supporting info & Tools below */}
        <SoilCalculator />
        <PlantingCalendar />
        <TrustedBrands />
        
        {/* Company info & Social proof at bottom */}
        <Testimonials />
        <About />
        <PartnersMarquee />
        <Stores />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-[#0a1811] text-primary-200 py-12 md:py-16 mt-auto">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-10 md:mb-12 border-b border-white/10 pb-10 md:pb-12">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-5 md:mb-6">
                <img src="/HomePageImages/Logo.png" alt="Logo" className="h-10 md:h-12 brightness-0 invert" />
                <div>
                  <span className="block font-serif font-bold text-xl md:text-2xl text-white">Saruliyadda</span>
                  <span className="block text-xs tracking-widest text-primary-500 uppercase">Garden Shop</span>
                </div>
              </div>
              <p className="text-primary-200/80 leading-relaxed max-w-md text-sm md:text-base">
                Your trusted partner in organic gardening since 2003. We're on a mission to help Sri Lankan farmers grow healthier, happier plants while protecting our beautiful earth.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6">Quick Links</h4>
              <ul className="space-y-2 md:space-y-3">
                {['Home', 'About', 'Clinic', 'Calculator', 'Products'].map(item => (
                  <li key={item}><a href={`#${item.toLowerCase()}`} className="text-sm md:text-base hover:text-white hover:underline transition-all">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6">Products</h4>
              <ul className="space-y-2 md:space-y-3">
                {['Organic Compost', 'Unipower Range', 'CIC Products', 'Garden Tools', 'Seeds & Pots'].map(item => (
                  <li key={item}><a href="#products" className="text-sm md:text-base hover:text-white hover:underline transition-all">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-primary-200/60 gap-4 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} Saruliyadda Garden Shop. All rights reserved.</p>
            <p>Powered by <a href="#" className="text-primary-400 hover:text-white font-medium">Trexide Labs</a></p>
          </div>
        </div>
      </footer>
      
      {/* WhatsApp FAB */}
      <a href="https://wa.me/94777676958" target="_blank" rel="noreferrer" className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all z-[90] animate-bounce">
        <Phone className="w-6 h-6 md:w-8 md:h-8" />
      </a>
    </div>
  );
}

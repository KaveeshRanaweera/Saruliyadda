import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Leaf, ShoppingBag, Info, Star, Recycle, CheckCircle, MapPin, Phone, Mail, Truck, Users, ShieldCheck, Navigation, Search, Calculator, Calendar, Sprout, ChevronRight, Stethoscope, Award, BadgeCheck, ArrowRight, Eye, Droplet, Sun } from 'lucide-react';

// Helper function to handle image paths with base path
const img = (path) => `${typeof __BASE_PATH__ !== 'undefined' ? __BASE_PATH__ : '/'}${path.startsWith('/') ? path.slice(1) : path}`;

const FloatingLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const shades = ['#d8f3dc', '#b7e4c7', '#95d5b2', '#74c69d', '#52b788'];
    const newLeaves = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 1.6 + 0.8}rem`,
      duration: `${Math.random() * 18 + 12}s`,
      delay: `${Math.random() * 12}s`,
      color: shades[Math.floor(Math.random() * shades.length)]
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden hidden md:block">
      {leaves.map(leaf => (
        <Leaf
          key={leaf.id}
          className="leaf"
          style={{
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
            animationDuration: leaf.duration,
            animationDelay: leaf.delay,
            color: leaf.color,
            opacity: 0.45
          }}
        />
      ))}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ['home', 'about', 'clinic', 'calculator', 'products', 'stores', 'contact'];
      const scrollPosition = window.scrollY + 200; // offset for navbar height
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync scroll lock when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#home', icon: Leaf },
    { name: 'About', href: '#about', icon: Info },
    { name: 'Clinic', href: '#clinic', icon: Stethoscope },
    { name: 'Calculator', href: '#calculator', icon: Calculator },
    { name: 'Products', href: '#products', icon: ShoppingBag },
    { name: 'Stores', href: '#stores', icon: MapPin },
    { name: 'Contact', href: '#contact', icon: Phone }
  ];

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning ☀️';
    if (hours < 18) return 'Good Afternoon 🌤️';
    return 'Good Evening 🌙';
  };

  const getStoreStatus = () => {
    const hours = new Date().getHours();
    if (hours >= 7 && hours < 18) {
      return { open: true, text: 'Open Now (Daily 7 AM - 6 PM)' };
    }
    return { open: false, text: 'Closed Now (Opens at 7 AM)' };
  };

  const storeStatus = getStoreStatus();

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isOpen ? 'bg-transparent shadow-none py-4' : scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2 md:py-3' : 'bg-cream/90 backdrop-blur-md py-4 md:py-5'}`}>
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 md:gap-3 z-50" onClick={() => setIsOpen(false)}>
          <img src={img('HomePageImages/Logo.png')} alt="Saruliyadda Logo" className="h-8 md:h-12 w-auto" />
          <div>
            <span className="block font-serif font-bold text-lg md:text-2xl text-primary-900 leading-tight">Saruliyadda</span>
            <span className="block text-[10px] md:text-xs text-primary-600 font-medium tracking-wider uppercase">Garden Shop</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`font-semibold transition-all duration-300 text-sm xl:text-base relative py-1 ${activeSection === link.href.substring(1) ? 'text-primary-800 font-bold' : 'text-gray-600 hover:text-primary-800'}`}
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-800 rounded-full animate-fade-in-up"></span>
              )}
            </a>
          ))}
          <a href="#products" className="btn-primary py-2.5 px-5 text-sm">
            <ShoppingBag size={16} /> View Catalog
          </a>
        </nav>

        <div className="flex items-center gap-4 lg:hidden z-50">
          {/* Mobile Toggle with morphing CSS animation */}
          <button 
            className="text-primary-900 p-2.5 -mr-2 rounded-full hover:bg-primary-50 transition-colors flex items-center justify-center w-11 h-11 relative" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-5">
              <span className={`absolute block h-0.5 w-6 bg-primary-900 rounded-full transform transition-all duration-300 ${isOpen ? 'rotate-45 top-2' : 'top-0'}`} />
              <span className={`absolute block h-0.5 w-6 bg-primary-900 rounded-full transition-all duration-300 top-2 ${isOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`absolute block h-0.5 w-6 bg-primary-900 rounded-full transform transition-all duration-300 ${isOpen ? '-rotate-45 top-2' : 'top-4'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Nav Overlay/Drawer */}
        <div className={`fixed inset-0 bg-cream/98 backdrop-blur-lg z-40 flex flex-col justify-between pt-24 pb-8 px-6 transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="space-y-4">
            {/* Authentic Warm Sri Lankan Greeting & Store Status */}
            <div className="pl-3 mb-2 flex flex-col gap-2">
              <div>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-primary-900 leading-tight">Ayubowan! 👋</h4>
                <p className="text-xs text-gray-500 font-semibold">{getGreeting()} &bull; Welcome back</p>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm border border-primary-100/50 text-[10px] font-bold w-fit mt-1">
                <span className={`w-2 h-2 rounded-full ${storeStatus.open ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className={storeStatus.open ? 'text-green-700' : 'text-red-700'}>{storeStatus.text}</span>
              </div>
            </div>

            <div className="h-px bg-primary-100/60 w-full" />

            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-3 pl-3">Main Navigation</p>
              {navLinks.map((link, idx) => {
                const Icon = link.icon;
                const isLinkActive = activeSection === link.href.substring(1);
                return (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)} 
                    className={`flex items-center gap-4 py-3.5 px-4 text-base font-bold rounded-2xl transition-all duration-200 ${isLinkActive ? 'text-primary-800 bg-primary-50/80 shadow-sm' : 'text-primary-900 hover:text-primary-600 hover:bg-primary-50'}`}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <span className={`p-2 rounded-xl ${isLinkActive ? 'bg-primary-800 text-white shadow-sm' : 'bg-primary-100/50 text-primary-700'}`}>
                      <Icon size={18} />
                    </span>
                    <span className="tracking-tight text-lg">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-8 border-t border-primary-100 pt-6 space-y-4">
            <div className="flex flex-col gap-1 pl-3 text-xs text-gray-500">
              <span className="font-semibold text-primary-800 font-serif">Saruliyadda Kadawatha & Kiribathgoda</span>
              <span>Open Daily: 7:00 AM – 6:00 PM</span>
              <a href="tel:+94777676958" className="text-primary-600 font-bold mt-1 hover:underline">+94 777 676 958</a>
            </div>

            <a 
              href="https://wa.me/94777676958" 
              target="_blank" rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full justify-center py-3.5 bg-[#25D366] hover:bg-[#1ebe57] text-white border-none shadow-[0_4px_14px_rgba(37,211,102,0.25)] text-sm font-bold rounded-full"
            >
              <Phone size={18} /> Chat with Mr. Upul
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

const HeroSlider = () => {
  const slides = [
    { img: img('HomePageImages/fruit 2.jpg'), tag: '100% Organic', title: 'Grow Your Garden the Natural Way.', sub: 'Premium organic compost, delivered with love from Saruliyadda.' },
    { img: img('HomePageImages/fruit 5.jpg'), tag: 'Bountiful Harvests', title: 'Nutrients for Every Season.', sub: 'Give your plants the foundation they need to thrive and produce.' },
    { img: img('HomePageImages/fruit 3.jpg'), tag: 'Sustainable Farming', title: 'Protecting Mother Earth.', sub: 'Our compost helps retain soil moisture and reduce chemical runoff.' },
    { img: img('HomePageImages/fruit 6.jpg'), tag: 'Expert Care', title: 'Healthy Soil, Healthy Life.', sub: 'Join 5000+ gardeners transforming their land with Saruliyadda.' },
    { img: img('HomePageImages/fruit 1.jpg'), tag: 'Vibrant Blooms', title: 'Unlock Your Garden\'s Potential.', sub: 'From vegetables to exotic flowers, we have the right feed for you.' }
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
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out z-0 ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img 
            src={slide.img} 
            alt={`Slide ${index + 1}`} 
            className={`w-full h-full object-cover opacity-40 transition-transform duration-[6000ms] ease-out ${index === current ? 'scale-100' : 'scale-110'}`} 
          />
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
              <img src={img('HomePageImages/PartnerLogo7.png')} alt="Unipower" className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
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
              <img src={img('HomePageImages/PartnerLogo1.png')} alt="CIC" className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
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
        <div className="relative order-2 lg:order-1 px-2 sm:px-0 mt-6 sm:mt-8 lg:mt-0">
          <img src={img('HomePageImages/fruit 7.jpg')} alt="Our garden" className="rounded-3xl shadow-2xl w-full object-cover h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px]" />
          <div className="absolute -bottom-3 -right-1 sm:-bottom-6 sm:-right-6 bg-primary-800 text-white p-3 sm:p-6 md:p-8 rounded-2xl shadow-lg md:shadow-xl text-center border-2 sm:border-4 border-white">
            <span className="block font-serif text-2xl sm:text-4xl md:text-5xl font-bold mb-1">20+</span>
            <span className="block text-[9px] sm:text-xs md:text-sm uppercase tracking-wider text-primary-200 font-semibold">Years</span>
          </div>
          <div className="absolute -top-3 -left-1 sm:-top-6 sm:-left-6 bg-green-500 text-white p-2.5 sm:p-4 md:p-5 rounded-2xl shadow-lg md:shadow-xl flex items-center gap-2 sm:gap-3 animate-bounce border-2 sm:border-4 border-white" style={{animationDuration: '3s'}}>
            <Recycle className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            <div>
              <span className="block text-base sm:text-xl md:text-2xl font-bold leading-none">10K+</span>
              <span className="block text-[7px] sm:text-[10px] md:text-xs uppercase tracking-wider mt-0.5">Tons</span>
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
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [displayedIssue, setDisplayedIssue] = useState(null);
  const diagnosisRef = useRef(null);

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

  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue);
    setIsScanning(true);
    setScanProgress(0);
    setDisplayedIssue(null);
    
    // Smoothly scroll to diagnosis box on mobile screens
    setTimeout(() => {
      if (window.innerWidth < 1024 && diagnosisRef.current) {
        diagnosisRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 50);
  };

  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            setDisplayedIssue(selectedIssue);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [isScanning, selectedIssue]);

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
                setDisplayedIssue(null);
                setIsScanning(false);
              }}
              className="w-full pl-5 pr-12 py-3 sm:py-4 rounded-full border-2 border-primary-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-sm sm:text-base bg-white shadow-md text-gray-800"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-primary-400" size={20} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 max-w-5xl mx-auto">
          {/* Symptoms List */}
          <div className="space-y-2 sm:space-y-3 max-h-[350px] sm:max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredIssues.length > 0 ? (
              filteredIssues.map(issue => (
                <button
                  key={issue.id}
                  onClick={() => handleSelectIssue(issue)}
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
                <button onClick={() => { setSearchQuery(''); setSelectedIssue(null); setDisplayedIssue(null); }} className="text-primary-600 font-semibold mt-2 hover:underline">View all common faults</button>
              </div>
            )}
          </div>

          {/* Diagnosis Box */}
          <div ref={diagnosisRef} className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-primary-100 relative h-full flex flex-col min-h-[300px] sm:min-h-[350px]">
            {isScanning ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <div className="relative w-24 h-24 mb-6">
                  {/* Outer spinning green ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin"></div>
                  {/* Leaf pulsing inside */}
                  <div className="absolute inset-0 flex items-center justify-center text-primary-600">
                    <Leaf size={36} className="animate-bounce" />
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3">
                  AI Diagnosis Scan Active
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">Analyzing: {selectedIssue?.symptom}</h4>
                <p className="text-gray-500 text-xs sm:text-sm mb-4">Cross-referencing agricultural database...</p>
                <div className="w-48 bg-gray-100 h-2 rounded-full overflow-hidden mx-auto">
                  <div className="bg-primary-600 h-full transition-all duration-150" style={{ width: `${scanProgress}%` }}></div>
                </div>
              </div>
            ) : !displayedIssue ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-center py-8">
                <Leaf size={64} className="mb-4 opacity-20" />
                <p className="text-base sm:text-lg">Select a matching fault from the left to run the AI diagnosis scan.</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-fade-in-up">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider w-fit">
                    Diagnosis Complete
                  </div>
                  <span className="text-xs text-gray-400 font-semibold font-mono">Accuracy: 98%</span>
                </div>
                
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{displayedIssue.diagnosis}</h4>
                
                <div className="h-px w-full bg-gray-100 my-4 sm:my-6"></div>
                
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4 w-fit">
                  Recommended Solution
                </div>
                <p className="text-gray-700 text-sm sm:text-lg leading-relaxed mb-6 flex-1">
                  {displayedIssue.solution}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                  <button 
                    onClick={() => {
                      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-primary justify-center py-3 bg-primary-50 text-primary-900 hover:bg-primary-100 border border-primary-200 text-sm"
                  >
                    <Search size={16} /> Recommended Products
                  </button>
                  <a 
                    href={`https://wa.me/94777676958?text=${encodeURIComponent(`Hi Saruliyadda! 🌱 My plant is showing symptoms of ${displayedIssue.symptom} (${displayedIssue.diagnosis}). Can you suggest the best fertilizer or advice?`)}`}
                    target="_blank" rel="noreferrer"
                    className="btn-primary justify-center py-3 bg-[#25D366] hover:bg-[#1ebe57] border-none shadow-[0_4px_14px_rgba(37,211,102,0.25)] text-sm text-white"
                  >
                    <Phone size={16} /> Consult Advisor
                  </a>
                </div>
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
  const [depth, setDepth] = useState(5);
  const [plantType, setPlantType] = useState('vegetables');
  const [soilType, setSoilType] = useState('average');

  useEffect(() => {
    if (plantType === 'vegetables') setDepth(8);
    else if (plantType === 'flowers') setDepth(5);
    else if (plantType === 'lawn') setDepth(2);
    else if (plantType === 'trees') setDepth(12);
    else if (plantType === 'nursery') setDepth(4);
  }, [plantType]);

  const calculateCompost = () => {
    const volume = area * (depth / 100);
    let soilMultiplier = 1.0;
    if (soilType === 'clay') soilMultiplier = 1.25; 
    if (soilType === 'sandy') soilMultiplier = 1.15; 
    
    const kg = volume * 600 * soilMultiplier; 
    return Math.ceil(kg);
  };

  const getSoilAdvice = () => {
    if (soilType === 'clay') {
      return "Clay soil is heavy and drains poorly. Mixing in Saruliyadda premium compost will break up compaction, dramatically improve drainage, and let roots breathe.";
    } else if (soilType === 'sandy') {
      return "Sandy soil drains very quickly and loses nutrients easily. Saruliyadda compost acts like a sponge, helping your sandy soil retain vital moisture and fertilizer.";
    } else {
      return "Your loamy/average soil is a great base! Regularly tilling in compost keeps it rich in microbial life, maintains pH balance, and sustains high yields.";
    }
  };

  return (
    <section id="calculator" className="py-16 md:py-24 bg-primary-900 relative text-white">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url('${img('Images/Compost20KG.jpg')}')` }}></div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 md:p-10 rounded-[2rem] shadow-2xl">
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-500 rounded-full mb-4 shadow-lg">
              <Calculator size={24} className="text-white sm:w-8 sm:h-8" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-3 md:mb-4 leading-tight">Interactive Compost Calculator</h2>
            <p className="text-primary-200 text-sm sm:text-base max-w-lg mx-auto">Get scientific, tailored soil suggestions and exact quantities based on what you are growing.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {/* Input Panel */}
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <label className="block text-xs font-bold text-primary-200 mb-1.5 uppercase tracking-wider">What are you growing?</label>
                <select 
                  value={plantType} 
                  onChange={e => setPlantType(e.target.value)} 
                  className="w-full bg-white/10 rounded-xl px-3 py-3 border border-white/20 focus:border-white focus:bg-white/20 outline-none text-white font-semibold text-sm transition-all cursor-pointer"
                >
                  <option value="vegetables" className="text-primary-900 font-semibold">🥦 Vegetables & Greens</option>
                  <option value="flowers" className="text-primary-900 font-semibold">🌸 Flowers & Ornamentals</option>
                  <option value="lawn" className="text-primary-900 font-semibold">🌱 Lawns & Grass Turf</option>
                  <option value="trees" className="text-primary-900 font-semibold">🌳 Fruit Trees & Shrubs</option>
                  <option value="nursery" className="text-primary-900 font-semibold">🍀 Seedlings & Nurseries</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-primary-200 mb-1.5 uppercase tracking-wider">Existing Soil Type</label>
                <select 
                  value={soilType} 
                  onChange={e => setSoilType(e.target.value)} 
                  className="w-full bg-white/10 rounded-xl px-3 py-3 border border-white/20 focus:border-white focus:bg-white/20 outline-none text-white font-semibold text-sm transition-all cursor-pointer"
                >
                  <option value="average" className="text-primary-900 font-semibold">Loamy / Average Soil</option>
                  <option value="clay" className="text-primary-900 font-semibold">Clay Soil (Heavy, needs drainage)</option>
                  <option value="sandy" className="text-primary-900 font-semibold">Sandy Soil (Dry, loses water)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-primary-200 mb-1.5 uppercase tracking-wider">Garden Area</label>
                  <div className="flex items-center bg-white/10 rounded-xl px-3 py-2.5 border border-white/20 focus-within:border-white transition-all">
                    <input type="number" min="1" max="10000" value={area} onChange={e => setArea(Math.max(1, Number(e.target.value)))} className="bg-transparent w-full outline-none font-bold text-base sm:text-lg" />
                    <span className="text-primary-300 ml-1 text-xs font-semibold">m²</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-primary-200 mb-1.5 uppercase tracking-wider">Layer Depth</label>
                  <div className="flex items-center bg-white/10 rounded-xl px-3 py-2.5 border border-white/20 focus-within:border-white transition-all">
                    <input type="number" min="1" max="50" value={depth} onChange={e => setDepth(Math.max(1, Number(e.target.value)))} className="bg-transparent w-full outline-none font-bold text-base sm:text-lg" />
                    <span className="text-primary-300 ml-1 text-xs font-semibold">cm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Bed Preview */}
            <div className="bg-primary-950/40 border border-white/10 rounded-2xl p-4 flex flex-col justify-between h-full">
              <h5 className="text-[10px] font-bold text-primary-300 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Sprout size={14} className="text-emerald-400" /> Interactive Bed Preview
              </h5>
              <div className="flex-1 flex items-center justify-center min-h-[140px]">
                <div className="relative w-full max-w-[160px] aspect-[4/3] rounded-lg overflow-hidden border border-primary-800 bg-[#3d2b1f] flex flex-col justify-end shadow-lg transition-all duration-500" style={{ transform: `scale(${Math.min(1.1, 0.85 + area/150)})` }}>
                  {/* Plant illustrations on top */}
                  <div className="absolute top-2 left-0 right-0 flex justify-around px-2 z-10">
                    {Array.from({ length: Math.min(5, Math.max(2, Math.floor(area / 10) + 2)) }).map((_, i) => (
                      <Sprout 
                        key={i} 
                        className="text-emerald-400 animate-pulse shrink-0" 
                        style={{ 
                          width: `${Math.min(1.8, 0.8 + depth/7)}rem`, 
                          height: `${Math.min(1.8, 0.8 + depth/7)}rem`,
                          animationDelay: `${i * 0.25}s`,
                          animationDuration: `${2.5 + i * 0.4}s`
                        }} 
                      />
                    ))}
                  </div>
                  
                  {/* Compost top layer */}
                  <div 
                    className="bg-[#5c3e21] border-b border-primary-950/30 transition-all duration-500 relative overflow-hidden" 
                    style={{ height: `${Math.min(75, 15 + depth * 4.5)}%` }}
                  >
                    {/* Soil texture dots */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px]"></div>
                    <div className="absolute bottom-1.5 left-2 text-[8px] text-primary-200 font-bold font-mono">COMPOST: {depth}cm</div>
                  </div>
                  
                  {/* Base soil layer */}
                  <div className="bg-[#24150b] h-[25%] relative overflow-hidden">
                    <div className="absolute bottom-1 left-2 text-[7px] text-amber-900/80 font-bold font-mono">BASE: {soilType.toUpperCase()}</div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-primary-200/70 italic text-center mt-2 leading-tight">Visualizing {area}m² garden bed with {depth}cm organic top layer.</p>
            </div>

            {/* Results Panel */}
            <div className="bg-white rounded-2xl p-6 text-primary-900 text-center shadow-inner relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-400 to-primary-600"></div>
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-widest">You Will Need Approximately</h4>
                <div className="font-serif text-5xl sm:text-6xl font-bold text-primary-800 leading-none my-3">
                  {calculateCompost()} <span className="text-lg sm:text-2xl text-primary-600 font-sans font-bold">KG</span>
                </div>
                <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                  We recommend purchasing <strong className="text-primary-800">{Math.ceil(calculateCompost() / 20)}</strong> bags of our 20KG Premium Compost.
                </p>
                <div className="bg-primary-50 rounded-xl p-3 border border-primary-100 text-left mb-4">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-primary-800 mb-1 flex items-center gap-1">
                    <Info size={12} /> Soil Advice
                  </h5>
                  <p className="text-[11px] text-gray-700 leading-relaxed font-medium">
                    {getSoilAdvice()}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {document.getElementById('products').scrollIntoView({ behavior: 'smooth' });}} 
                className="btn-primary bg-primary-800 hover:bg-primary-700 text-white w-full justify-center py-3 text-sm hover:-translate-y-0.5 transition-all border-none font-bold"
              >
                <ShoppingBag size={18} /> View Compost Products
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
    { 
      id: 'p1', 
      name: "Compost 05 KG", 
      cat: "saruliyadda", 
      img: img('Images/Compost05KG.jpg'), 
      desc: "Perfect for home gardens, flower pots, and small balcony patches. This fully organic compost is finely screened for simple tilling and immediate nutrient absorption.",
      spec: ["Weight: 5 KG Bag", "100% Organic matter", "Fine screened texture", "Ideal for: Pots, balcony herbs"]
    },
    { 
      id: 'p2', 
      name: "Compost 10 KG", 
      cat: "saruliyadda", 
      img: img('Images/Compost10KG.jpg'), 
      desc: "Our customer bestseller! Sized perfectly for raised vegetable beds, ornamental borders, and medium-sized landscaping projects. Explodes with beneficial microbes.",
      spec: ["Weight: 10 KG Bag", "Microbe-rich culture", "Excellent water retention", "Ideal for: Veggie beds, shrubs"]
    },
    { 
      id: 'p3', 
      name: "Compost 20 KG", 
      cat: "saruliyadda", 
      img: img('Images/Compost20KG.jpg'), 
      desc: "The ultimate value formulation. Ideal for large-scale crop gardens, farming, and commercial agricultural nurseries requiring heavy volumes of rich soil enhancement.",
      spec: ["Weight: 20 KG Bag", "Maximum bulk value", "Aids sandy & clay soil", "Ideal for: Farming, lawns"]
    },
    { 
      id: 'p4', 
      name: "Coco Chips", 
      cat: "saruliyadda", 
      img: img('Images/CocoChips.jpg'),
      desc: "Coarse cut coconut husk pieces that improve soil aeration and water retention. Perfect for orchids, anthuriums, and high-drainage tropical potting mixes.",
      spec: ["Volume: Approx 5L", "Prevents compaction", "Excellent drainage", "Ideal for: Orchids, Anthuriums"]
    },
    { 
      id: 'p5', 
      name: "Coir Dust", 
      cat: "saruliyadda", 
      img: img('Images/CoirDust.jpg'),
      desc: "Premium washed coco peat that holds up to 8 times its weight in water. Ideal for making your own premium seeding starters, potting mixes, and keeping soil moist.",
      spec: ["Weight: Approx 2 KG", "Exceptional water retention", "Neutral pH (5.5-6.5)", "Ideal for: Seed germination"]
    },
    { 
      id: 'p6', 
      name: "Cattle Manure", 
      cat: "saruliyadda", 
      img: img('Images/CattleMannure.jpg'),
      desc: "Sun-dried and aged organic cow manure. A natural, nitrogen-rich organic booster that encourages leafy green growth and restores organic structure to worn-out soils.",
      spec: ["Weight: Approx 5 KG", "Aged and weed-free", "High Nitrogen (N)", "Ideal for: Leafy greens, grass lawns"]
    },
    { 
      id: 'p7', 
      name: "Dahaiyya", 
      cat: "saruliyadda", 
      img: img('Images/Dhaiyya.jpg'),
      desc: "Carbonized and raw paddy husks. Acts as a soil conditioner that aerates heavy soils, adds vital natural silica to plant cell walls, and prevents root-binding.",
      spec: ["Volume: Approx 10L", "Rich in natural Silica", "Aerate heavy soils", "Ideal for: Root growth, drainage"]
    },

    // Unipower
    { 
      id: 'p8', 
      name: "Yara Mila Target", 
      cat: "unipower", 
      img: img('Images/YaraMilaTarget.jpg'),
      desc: "Advanced granular NPK fertilizer with balanced nutrients. Formulated for quick uptake, promoting crop uniformity and outstanding leafy growth.",
      spec: ["NPK: 15-15-15 + Trace", "Fast dissolving", "Norwegian technology", "Ideal for: Fast-growing crops"]
    },
    { 
      id: 'p9', 
      name: "Yara Mila Complex", 
      cat: "unipower", 
      img: img('Images/YaraMilaComplex.jpg'),
      desc: "Highly soluble, premium NPK fertilizer containing vital secondary nutrients and micronutrients. Highly recommended for heavy feeders and vegetables.",
      spec: ["NPK: 12-11-18 + Mg + S", "Chloride-free", "Prilled granules", "Ideal for: Fruits and vegetables"]
    },
    { 
      id: 'p10', 
      name: "Yara Mila Winner", 
      cat: "unipower", 
      img: img('Images/YaraMilaWinner.jpg'),
      desc: "Formulated to produce superior yields and crop quality. Balanced nutrients ensure your flowering and fruiting plants receive stable nourishment.",
      spec: ["NPK: 15-09-20 + Mg + S", "Excellent potassium", "Improves crop grade", "Ideal for: Fruit trees, flowering"]
    },
    { 
      id: 'p11', 
      name: "Yara Mila Grower", 
      cat: "unipower", 
      img: img('Images/YaraMilaGrover.jpg'),
      desc: "Engineered for maximum vegetative growth and leaf development. Perfect for leafy greens and initial crop stages.",
      spec: ["NPK Formulation", "High Nitrogen source", "Uniform prills", "Ideal for: Leafy greens, herbs"]
    },
    { 
      id: 'p12', 
      name: "Yara Mila Calcinit", 
      cat: "unipower", 
      img: img('Images/YaraMilaCalcinit.jpg'),
      desc: "Fully water-soluble calcium nitrate fertilizer. Prevents blossom end rot in tomatoes and peppers, improves crop quality and shelf life.",
      spec: ["100% Water Soluble", "Calcium & Nitrate Nitrogen", "Strengthens cell walls", "Ideal for: Tomatoes, peppers"]
    },
    { 
      id: 'p13', 
      name: "Yara Liva Tropicote", 
      cat: "unipower", 
      img: img('Images/YaraLivaTropicote.jpg'),
      desc: "High quality calcium nitrate fertilizer for soil application. Improves cell integrity, plant structural strength, and prevents disease.",
      spec: ["Granular formulation", "Calcium enriched", "Soil-applied nutrition", "Ideal for: Fruit trees, cash crops"]
    },
    { 
      id: 'p14', 
      name: "Yara Mila 25-7-7", 
      cat: "unipower", 
      img: img('Images/YaraMila25-7-7.jpg'),
      desc: "High nitrogen agricultural NPK fertilizer. Drives rapid foliage production, grass greening, and massive vegetative development.",
      spec: ["High N: 25-07-07", "Fast acting", "Norwegian quality", "Ideal for: Lawns, foliage crops"]
    },
    { 
      id: 'p15', 
      name: "Yara Mila 15-15-15", 
      cat: "unipower", 
      img: img('Images/YaraMila15-15-15.jpg'),
      desc: "Perfectly balanced macro-nutrient NPK fertilizer. Safe and reliable for multi-purpose farming, garden flowers, and general crop nutrition.",
      spec: ["Balanced NPK 1:1:1", "Universal crop feeder", "Granular application", "Ideal for: General gardening"]
    },
    { 
      id: 'p16', 
      name: "Nutrivant Plus", 
      cat: "unipower", 
      img: img('Images/NutrivantPlus.jpg'),
      desc: "Specialized foliar fertilizer with Fertivant technology that binds nutrients to leaves, ensuring long-term absorption and maximum yield.",
      spec: ["Foliar spray tech", "Leaf sticking agent", "Rich in trace minerals", "Ideal for: Fruit trees, cash crops"]
    },
    { 
      id: 'p17', 
      name: "Osmocote High N", 
      cat: "unipower", 
      img: img('Images/OsmocoteHighN.jpg'),
      desc: "Premium controlled-release fertilizer that feeds plants continuously for up to 6 months. High Nitrogen promotes dense, green foliage with zero risk of root burn.",
      spec: ["Longevity: 5-6 Months", "Resin coated technology", "NPK: 19-06-12", "Ideal for: Foliage, houseplants"]
    },
    { 
      id: 'p18', 
      name: "Osmocote High K", 
      cat: "unipower", 
      img: img('Images/OsmocoteHighK.jpg'),
      desc: "Specialized controlled-release fertilizer with extra potassium. Feeds up to 6 months, promoting profuse blooms, large fruit sizes, and high drought resistance.",
      spec: ["Longevity: 5-6 Months", "Resin coated technology", "NPK: 11-11-18", "Ideal for: Orchids, Anthuriums, Blooms"]
    },
    { 
      id: 'p19', 
      name: "Osmocote All Purpose", 
      cat: "unipower", 
      img: img('Images/OsmocoteAllPurpose.jpg'),
      desc: "Balanced controlled-release fertilizer for all indoor and outdoor plants. Safe, reliable, and feeds for 6 months.",
      spec: ["Longevity: 5-6 Months", "Resin coated technology", "NPK: 14-14-14", "Ideal for: General houseplants"]
    },
    { 
      id: 'p20', 
      name: "Albert Solution", 
      cat: "unipower", 
      img: img('Images/AlbertSolution.jpg'),
      desc: "The most trusted complete hydroponic and foliar fertilizer in Sri Lanka. Dissolves 100% in water to feed indoor plants, vegetables, orchids, and nursery crops.",
      spec: ["Weight: 400g / 1KG", "100% Water soluble", "Macro + Micro nutrients", "Ideal for: Hydroponics, foliar feed"]
    },
    { 
      id: 'p21', 
      name: "Agri Phoska YPM", 
      cat: "unipower", 
      img: img('Images/AgriPhoskaYPM.png'),
      desc: "High yield potassium-phosphorus fertilizer mix. Maximizes fruit weight, juice sweetness, and flower count on agricultural crops.",
      spec: ["Fruition booster", "NPK specialized", "Premium brand", "Ideal for: Fruit trees, cash crops"]
    },
    { 
      id: 'p22', 
      name: "Agri Phoska APM", 
      cat: "unipower", 
      img: img('Images/AgroPhoskaAPM.png'),
      desc: "Specialized nutrient mix focusing on plant structure and root establishment. Prevents nutrient deficiencies in poor soils.",
      spec: ["Root & Stem support", "Trace elements included", "Granular blend", "Ideal for: Flowering crops"]
    },
    { 
      id: 'p23', 
      name: "Grow More Nitro Plus", 
      cat: "unipower", 
      img: img('Images/GrowMoreNitroPlus.jpg'),
      desc: "High-nitrogen formulation (NPK 30-10-10) for lush green vegetative growth and rapid leaf development. Dissolves fully for quick root uptake.",
      spec: ["NPK: 30-10-10", "High Nitrogen", "Water soluble powder", "Ideal for: Grass, green leafy plants"]
    },
    { 
      id: 'p24', 
      name: "Grow More Plant Starter", 
      cat: "unipower", 
      img: img('Images/GrowMorePlantStarter.jpg'),
      desc: "NPK 10-30-20 formula to encourage strong root systems, transplant shock reduction, and early establishment of seedlings.",
      spec: ["NPK: 10-30-20", "High Phosphorus", "Roots & seedlings boost", "Ideal for: Transplants, saplings"]
    },
    { 
      id: 'p25', 
      name: "Grow More K44", 
      cat: "unipower", 
      img: img('Images/GrowMoreK44.jpg'),
      desc: "High-potassium formula (NPK 10-10-44) designed to improve fruit size, color, sweetness, and overall stress resistance.",
      spec: ["NPK: 10-10-44", "High Potassium", "Water soluble powder", "Ideal for: Fruit sizing, sweetness"]
    },
    { 
      id: 'p26', 
      name: "Grow More Bloom Special", 
      cat: "unipower", 
      img: img('Images/GrowMoreBloomSpecial.jpg'),
      desc: "High-phosphorus professional water-soluble NPK fertilizer. Drives intense blooming, strong bud formation, and vigorous root expansion during flowering.",
      spec: ["NPK: 10-52-10", "High phosphorus", "Quick foliar absorption", "Ideal for: Orchids, roses, fruits"]
    },
    { 
      id: 'p27', 
      name: "Grow More 3 in 1", 
      cat: "unipower", 
      img: img('Images/GrowMore3in1.jpg'),
      desc: "Balanced multi-purpose formula for all-round plant health, leaf greening, and bloom support.",
      spec: ["NPK: 20-20-20", "Perfect balance", "Foliar & soil use", "Ideal for: Regular home gardening"]
    },
    { 
      id: 'p28', 
      name: "Crop Master", 
      cat: "unipower", 
      img: img('Images/CropMaster.jpg'),
      desc: "Complete liquid formulation of balanced macro nutrients. Improves greening and yields on small-scale commercial plots.",
      spec: ["Liquid fertilizer", "Foliar uptake", "Balanced nutrition", "Ideal for: Vegetable farms"]
    },
    { 
      id: 'p29', 
      name: "Clonex", 
      cat: "unipower", 
      img: img('Images/Clonex.jpg'),
      desc: "Professional-grade rooting hormone gel. Seals cut tissue and supplies vital hormones and vitamins to stimulate rapid root hair growth in plant cuttings.",
      spec: ["Hormone Gel form", "Immediate root sealing", "Incredibly high success rate", "Ideal for: Plant cloning, cuttings"]
    },
    { 
      id: 'p30', 
      name: "Rapid Root", 
      cat: "unipower", 
      img: img('Images/RapidRoot.jpg'),
      desc: "Concentrated rooting powder that speeds up development of primary and secondary roots. Helps cuttings take root faster.",
      spec: ["Powder formula", "Speeds up rooting", "Prevents stem rot", "Ideal for: Stem cuttings"]
    },
    { 
      id: 'p31', 
      name: "Yara Vita Zintrac", 
      cat: "unipower", 
      img: img('Images/YaraVitaZintrac.png'),
      desc: "Highly concentrated flowable liquid zinc formulation. Prevents and treats zinc deficiencies, which cause leaf distortion and stunted shoots.",
      spec: ["Zinc: 700 g/l", "Liquid flowable", "Fast leaf absorption", "Ideal for: Fruit trees, grains"]
    },
    { 
      id: 'p32', 
      name: "Yara Vita Bortrac", 
      cat: "unipower", 
      img: img('Images/YaraVitaBortrac.png'),
      desc: "Concentrated liquid boron formulation designed for safe foliar application. Essential for flower pollination, seed set, and cell division.",
      spec: ["Boron: 150 g/l", "Pollination booster", "Safe liquid formula", "Ideal for: Tomatoes, papaws, coconut"]
    },
    { 
      id: 'p33', 
      name: "Biofol Green Flush", 
      cat: "unipower", 
      img: img('Images/BiofolGreenFlush.png'),
      desc: "Premium liquid foliage spray. Rich in magnesium and iron to restore deep green gloss to pale, yellowing leaves in record time.",
      spec: ["Greening liquid", "High Magnesium & Iron", "Anti-yellowing action", "Ideal for: Pale foliage, houseplants"]
    },
    { 
      id: 'p34', 
      name: "Biofol Flower Booster", 
      cat: "unipower", 
      img: img('Images/BiofolFlowerBooster.png'),
      desc: "Advanced liquid foliar fertilizer enriched with seaweed extract, hormones, and micronutrients. Triggers heavy budding, prevents flower drop, and enhances color vibrancy.",
      spec: ["Volume: 500ml", "Enriched with Seaweed", "Bud trigger formula", "Ideal for: Flower gardens, cash crops"]
    },
    { 
      id: 'p35', 
      name: "Peters Professional", 
      cat: "unipower", 
      img: img('Images/PetersProfessional.png'),
      desc: "World-famous professional soluble fertilizer. Features M-77 chelating formula to maximize nutrient availability and root absorption.",
      spec: ["Soluble crystalline NPK", "M-77 Chelating tech", "Professional choice", "Ideal for: Orchids, nursery flora"]
    },

    // Tools & Accessories
    { 
      id: 'p36', 
      name: "Insect Proof Net", 
      cat: "tools", 
      img: img('Images/InsectProofNet.jpg'),
      desc: "Heavy-duty, UV-stabilized white mesh net that forms an impenetrable physical barrier against whiteflies, aphids, caterpillars, and birds without spraying chemicals.",
      spec: ["Material: HDPE UV-Stabilized", "Aperture: 40 mesh", "Allows air & rain pass", "Ideal for: Organic vegetable beds"]
    },
    { 
      id: 'p37', 
      name: "Poly Mulch", 
      cat: "tools", 
      img: img('Images/PolyMulch.jpg'),
      desc: "High-quality silver-black mulching film. Suppresses weeds, conserves soil moisture, regulates soil temperature, and repels insects.",
      spec: ["Silver/Black layer", "Suppresses weeds", "Conserves soil moisture", "Ideal for: Crop beds, strawberry"]
    },
    { 
      id: 'p38', 
      name: "Shade Nets", 
      cat: "tools", 
      img: img('Images/ShadeNets.jpg'),
      desc: "Premium agricultural netting that filters harsh solar radiation. Protects sensitive seedlings, orchids, and young foliage from sun scorching and leaf drying.",
      spec: ["Shading rate: 50% / 70%", "UV-stabilized thread", "Reduces ambient heat", "Ideal for: Plant nurseries, orchids"]
    },
    { 
      id: 'p39', 
      name: "Trellising Twine", 
      cat: "tools", 
      img: img('Images/Trellising Twine.jpg'),
      desc: "Ultra-strong, UV-resistant climbing twine. Ideal for trellising vines, cucumbers, tomatoes, and other greenhouse creepers safely.",
      spec: ["UV protected", "Soft on plant stems", "Heavy load capacity", "Ideal for: Tomatoes, creepers"]
    }
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
        <div className="flex justify-start md:justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-3 px-4 md:px-0 -mx-4 md:mx-0 scrollbar-hide snap-x snap-mandatory">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'saruliyadda', label: '🌿 Saruliyadda' },
            { id: 'unipower', label: '⚡ Unipower' },
            { id: 'tools', label: '🛠️ Tools & Nets' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold transition-all duration-300 border-2 text-sm sm:text-base whitespace-nowrap shrink-0 snap-start ${filter === btn.id ? 'bg-primary-800 text-white border-primary-800 shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:border-primary-400'}`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-3 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for a product..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-full border-2 border-white focus:border-primary-600 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-sm sm:text-base bg-white shadow-sm text-gray-800"
          />
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 p-1"
              aria-label="Clear Search"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-12">
          Showing {filteredProducts.length} of {allProducts.length} Products
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 sm:py-20 text-gray-400">
            <Search size={48} className="mx-auto mb-4 opacity-50 sm:w-16 sm:h-16" />
            <h4 className="text-xl sm:text-2xl font-serif text-gray-500 mb-2">No products found</h4>
            <p className="text-sm sm:text-base">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
            {filteredProducts.map((p) => (
              <div 
                key={p.id} 
                onClick={() => setSelectedProduct(p)}
                className="bg-white p-2.5 sm:p-5 rounded-2xl border border-gray-100 hover:border-primary-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full group animate-in fade-in-50 duration-300"
              >
                <div className="aspect-square bg-gray-50/50 rounded-xl mb-2 sm:mb-4 overflow-hidden flex items-center justify-center p-2 sm:p-4 relative">
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur text-primary-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-all flex items-center gap-1">
                      <Eye size={14} /> Quick View
                    </span>
                  </div>
                  <img src={p.img} alt={p.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" onError={(e) => e.target.src = img('HomePageImages/Logo.png')} />
                </div>
                <div className="mt-auto text-center px-1 mb-1 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] sm:text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1 truncate">{p.cat}</span>
                    <h4 className="font-semibold text-gray-900 leading-snug text-xs sm:text-base line-clamp-2">{p.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-[2rem] max-w-4xl w-full flex flex-col md:flex-row overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 my-4 sm:my-8 relative max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProduct(null)} className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-900 bg-white/80 backdrop-blur rounded-full p-2 z-20 shadow-sm">
              <X size={20} />
            </button>
            
            <div className="w-full md:w-1/2 bg-cream p-6 sm:p-8 md:p-12 flex items-center justify-center relative group shrink-0">
              <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full max-w-[200px] md:max-w-none h-auto max-h-[220px] md:max-h-[450px] object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500" onError={(e) => e.target.src = img('HomePageImages/Logo.png')} />
            </div>
            
            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 relative flex flex-col justify-center overflow-y-auto md:overflow-visible">
              <button onClick={() => setSelectedProduct(null)} className="hidden md:flex absolute top-6 right-6 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors">
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block bg-primary-50 text-primary-700 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 sm:py-1 rounded-full w-fit">{selectedProduct.cat}</span>
                <span className="inline-block bg-green-50 text-green-700 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 sm:py-1 rounded-full w-fit">Authorized Stock</span>
              </div>
              
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">{selectedProduct.name}</h2>
              <div className="w-12 h-1 bg-primary-500 rounded-full mb-4"></div>
              
              <p className="text-gray-600 text-xs sm:text-base mb-5 sm:mb-6 leading-relaxed">
                {selectedProduct.desc || "Premium quality product recommended by experts for achieving the best agricultural and gardening results. Please inquire for availability."}
              </p>

              {/* Product Specifications */}
              {selectedProduct.spec && selectedProduct.spec.length > 0 && (
                <div className="mb-5 sm:mb-6 bg-primary-50/50 rounded-2xl p-4 border border-primary-100/50">
                  <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary-800 mb-2 flex items-center gap-1.5">
                    <BadgeCheck size={14} className="text-primary-600" /> Key Details & Specs
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedProduct.spec.map((item, index) => (
                      <li key={index} className="text-[11px] sm:text-xs text-gray-700 flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0"></span>
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-auto pt-4 md:pt-0">
                <a 
                  href={`https://wa.me/94777676958?text=${encodeURIComponent(`Hi Saruliyadda! 🌱 I would like to know more about the product: ${selectedProduct.name}.`)}`} 
                  target="_blank" rel="noreferrer"
                  className="btn-primary w-full justify-center text-sm sm:text-lg py-3 bg-[#25D366] hover:bg-[#1ebe57] border-none shadow-[0_4px_14px_rgba(37,211,102,0.39)] hover:-translate-y-1 font-bold"
                >
                  <Phone size={18} /> Inquire on WhatsApp
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
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
        <div className="bg-cream p-6 sm:p-8 md:p-10 rounded-3xl border border-primary-100 text-center hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
          <MapPin size={32} className="mx-auto text-primary-600 mb-4 sm:mb-5 md:mb-6 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-primary-900 mb-2 sm:mb-3">Bandarawatta Store</h3>
          <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">645-D, Kandy Road, Bandarawatta, Kadawatha</p>
          <div className="inline-flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full border border-gray-100 mb-4 sm:mb-6 md:mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <p className="font-medium text-primary-800 text-[11px] sm:text-xs md:text-sm">Open Daily: 7 AM – 6 PM</p>
          </div>
          <a href="https://maps.google.com/?q=Saruliyadda+Garden+Shop+Kadawatha" target="_blank" rel="noreferrer" className="btn-outline w-full justify-center bg-white hover:bg-primary-900 hover:text-white hover:border-primary-900 text-xs sm:text-sm md:text-base py-2.5 sm:py-3 font-semibold">
            <Navigation size={14} className="sm:w-4 sm:h-4 animate-bounce" /> Navigate to Bandarawatta
          </a>
        </div>
        <div className="bg-cream p-6 sm:p-8 md:p-10 rounded-3xl border border-primary-100 text-center hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
          <MapPin size={32} className="mx-auto text-primary-600 mb-4 sm:mb-5 md:mb-6 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-primary-900 mb-2 sm:mb-3">Makola Store</h3>
          <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">281/B Makola Road, Kiribathgoda</p>
          <div className="inline-flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full border border-gray-100 mb-4 sm:mb-6 md:mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <p className="font-medium text-primary-800 text-[11px] sm:text-xs md:text-sm">Open Daily: 7 AM – 6 PM</p>
          </div>
          <a href="https://maps.google.com/?q=Saruliyadda+Garden+Shop+Kiribathgoda" target="_blank" rel="noreferrer" className="btn-outline w-full justify-center bg-white hover:bg-primary-900 hover:text-white hover:border-primary-900 text-xs sm:text-sm md:text-base py-2.5 sm:py-3 font-semibold">
            <Navigation size={14} className="sm:w-4 sm:h-4 animate-bounce" /> Navigate to Makola
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate high-fidelity network request delay
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-primary-900 text-white relative">
      <div className="absolute inset-0 opacity-[0.05] bg-cover bg-center" style={{ backgroundImage: `url('${img('HomePageImages/fruit 2.jpg')}')` }}></div>
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
                  <a href="mailto:hello@saruliyadda.com" className="text-primary-200 hover:text-white transition-colors text-sm sm:text-base font-semibold">hello@saruliyadda.com</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="min-h-[350px] relative">
            {submitted ? (
              <div className="bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] text-gray-800 shadow-2xl relative text-center flex flex-col items-center justify-center min-h-[350px] animate-fade-in-up">
                <div className="absolute top-0 right-8 w-20 h-2 bg-primary-500 rounded-b-full"></div>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-6 animate-bounce">
                  <CheckCircle size={36} />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary-900 mb-3">Message Received!</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-sm leading-relaxed">
                  Thank you, <strong className="text-primary-800">{formData.name}</strong>. Mr. Upul Priyadarshana or one of our gardening experts will contact you at <strong className="text-primary-800">{formData.email}</strong> very soon.
                </p>
                <button 
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
                  className="btn-primary py-2.5 px-6 text-sm hover:translate-y-0 shadow-md font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white p-6 sm:p-8 md:p-10 rounded-[2rem] text-gray-800 shadow-2xl relative">
                <div className="absolute top-0 right-8 w-20 h-2 bg-primary-500 rounded-b-full"></div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary-900 mb-6 sm:mb-8">Send a Message</h3>
                <form className="space-y-3 sm:space-y-4 md:space-y-5" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all text-sm sm:text-base text-gray-800 font-medium" 
                      required 
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all text-sm sm:text-base text-gray-800 font-medium" 
                      required 
                    />
                  </div>
                  <textarea 
                    placeholder="How can we help you?" 
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    rows="4" 
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all resize-none text-sm sm:text-base text-gray-800 font-medium" 
                    required
                  ></textarea>
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full justify-center py-3 sm:py-3.5 md:py-4 text-base sm:text-lg mt-2 sm:mt-3 shadow-[0_4px_14px_rgba(27,67,50,0.3)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

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

      <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
        {[
          { img: img('Images/Compost05KG.jpg'), name: "5 KG Pack", desc: "Perfect for home gardens, flower pots, and small vegetable patches.", popular: false },
          { img: img('Images/Compost10KG.jpg'), name: "10 KG Pack", desc: "Our bestseller! Ideal for medium gardens, raised beds, and landscaping.", popular: true },
          { img: img('Images/Compost20KG.jpg'), name: "20 KG Pack", desc: "Best value for farms, large gardens, and commercial growing operations.", popular: false }
        ].map((item, idx) => (
          <div key={idx} className={`bg-white rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col h-full border ${item.popular ? 'border-primary-400 shadow-lg md:shadow-xl relative transform md:-translate-y-4' : 'border-gray-100 shadow-sm hover:shadow-lg md:hover:shadow-xl md:hover:-translate-y-2'} transition-all duration-300`}>
            {item.popular && (
              <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg">Most Popular</div>
            )}
            <img src={item.img} alt={item.name} className="w-full h-32 sm:h-40 md:h-48 object-contain mb-4 sm:mb-5 md:mb-6 mix-blend-multiply" />
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">{item.name}</h3>
            <p className="text-gray-600 text-center mb-4 sm:mb-6 md:mb-8 flex-1 text-xs sm:text-sm md:text-base">{item.desc}</p>
            <a href={`https://wa.me/94777676958?text=${encodeURIComponent(`Hi! I'm interested in the ${item.name} compost.`)}`} target="_blank" rel="noreferrer" className={`btn-primary w-full justify-center ${item.popular ? '' : 'bg-white text-primary-900 border-2 border-primary-200 hover:bg-primary-50'} py-2.5 sm:py-3 md:py-3.5 text-xs sm:text-sm md:text-base`}>
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

      <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
        {[
          { text: "Saruliyadda compost completely transformed my vegetable garden. My tomatoes and beans have never been this healthy! Highly recommend.", name: "Kamala Perera", role: "Home Gardener, Kadawatha" },
          { text: "I've been buying from Saruliyadda for 5 years now. Their products are top quality and Mr. Upul always gives excellent advice.", name: "Nuwan Fernando", role: "Landscape Designer, Colombo" },
          { text: "Best compost in Sri Lanka! My orchids are blooming beautifully. The Makola store staff is always so friendly and helpful.", name: "Dilini Jayawardena", role: "Orchid Enthusiast, Kiribathgoda" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg md:hover:shadow-xl transition-all duration-300">
            <div className="flex text-yellow-400 mb-4 sm:mb-5 md:mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} className="sm:w-[18px] sm:h-[18px]" fill="currentColor" />)}
            </div>
            <p className="text-gray-700 italic mb-4 sm:mb-6 md:mb-8 leading-relaxed text-xs sm:text-sm md:text-base">"{item.text}"</p>
            <div>
              <strong className="block text-sm sm:text-base text-gray-900 font-bold">{item.name}</strong>
              <span className="text-xs text-gray-500">{item.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PartnersMarquee = () => {
  const logos = [
    { img: img('HomePageImages/PartnerLogo1.png'), label: 'CIC' },
    { img: img('HomePageImages/PartnerLogo3.jpg'), label: 'Partner' },
    { img: img('HomePageImages/PartnerLogo5.jpg'), label: 'Partner' },
    { img: img('HomePageImages/PartnerLogo7.png'), label: 'Unipower' },
    { img: img('HomePageImages/PartnerLogo8.png'), label: 'Partner' }
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
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                <img src={img('HomePageImages/Logo.png')} alt="Logo" className="h-10 md:h-12 brightness-0 invert" />
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
      
      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop} 
        className={`fixed bottom-20 right-4 md:bottom-24 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-primary-800 text-white rounded-full flex items-center justify-center shadow-lg border border-primary-700/50 hover:bg-primary-700 hover:-translate-y-1 transition-all duration-300 z-50 ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ChevronRight className="-rotate-90 w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* WhatsApp FAB */}
      <a href="https://wa.me/94777676958" target="_blank" rel="noreferrer" className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all z-[90] animate-bounce">
        <Phone className="w-6 h-6 md:w-8 md:h-8" />
      </a>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, 
  Clock, 
  Shield, 
  Menu, 
  X, 
  Check, 
  MapPin, 
  Phone, 
  CheckCircle2
} from 'lucide-react';

// --- MOCK DATA ---
const featuresData = [
  {
    id: 1,
    icon: <Shield className="w-8 h-8 md:w-10 md:h-10 text-red-500 mb-3 md:mb-4" />,
    title: "Elite Coaching",
    desc: "Train with certified industry professionals dedicated to pushing your boundaries."
  },
  {
    id: 2,
    icon: <Clock className="w-8 h-8 md:w-10 md:h-10 text-red-500 mb-3 md:mb-4" />,
    title: "24/7 Access",
    desc: "Your schedule, your rules. Secure entry to our state-of-the-art facility anytime."
  },
  {
    id: 3,
    icon: <Dumbbell className="w-8 h-8 md:w-10 md:h-10 text-red-500 mb-3 md:mb-4" />,
    title: "Next-Gen Equipment",
    desc: "Biomechanical machinery and premium free weights imported exclusively for our members."
  }
];

const classesData = [
  {
    id: 1,
    name: "Strength & Conditioning",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
    desc: "Build foundational power and muscular endurance through heavily guided compound movements.",
    trainer: "Alex Mercer",
    time: "Mon/Wed/Fri - 6:00 AM"
  },
  {
    id: 2,
    name: "High-Intensity Interval Training (HIIT)",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop",
    desc: "Shred fat and skyrocket your cardiovascular health in rapid, intense 45-minute sessions.",
    trainer: "Sarah Jenkins",
    time: "Tue/Thu - 5:30 PM"
  },
  {
    id: 3,
    name: "Restorative Yoga & Mobility",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1520&auto=format&fit=crop",
    desc: "Recover actively. Enhance your joint mobility, flexibility, and mental clarity.",
    trainer: "Elena Rostova",
    time: "Weekends - 9:00 AM"
  }
];

const pricingData = [
  {
    id: 1,
    tier: "Standard",
    price: "49",
    features: ["Access to main gym floor", "Locker room access", "1 Free assessment", "Standard support"],
    isPopular: false
  },
  {
    id: 2,
    tier: "Elite",
    price: "89",
    features: ["24/7 Facility access", "All group classes", "Monthly body comp scan", "Priority support", "Guest pass (2/mo)"],
    isPopular: true
  },
  {
    id: 3,
    tier: "Platinum",
    price: "149",
    features: ["Everything in Elite", "Weekly 1-on-1 PT session", "Nutrition planning", "Sauna & Spa access", "Unlimited guest passes"],
    isPopular: false
  }
];

// --- COMPONENTS ---

const Background = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#0A0A0A]">
    <motion.div
      animate={{ scale: [1.05, 1.15, 1.05], x: [0, -20, 0], y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 30, repeatType: 'mirror', ease: 'linear' }}
      className="absolute inset-0 w-full h-full"
    >
      <img 
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop" 
        alt="Gym Background" 
        className="w-full h-full object-cover filter grayscale opacity-30"
      />
    </motion.div>
    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 via-[#0A0A0A]/80 to-[#0A0A0A] z-1" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A0A0A]/80 to-[#0A0A0A] z-1" />
  </div>
);

const Toast = ({ message, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] flex items-center gap-3 bg-black/90 backdrop-blur-xl border border-white/20 text-white px-4 py-3 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] w-[90%] max-w-[90%] sm:max-w-md"
      >
        <div className="bg-green-500/20 p-1.5 rounded-full flex-shrink-0">
          <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
        </div>
        <p className="font-medium tracking-wide text-xs sm:text-sm md:text-base leading-snug break-words flex-1">
          {message}
        </p>
      </motion.div>
    )}
  </AnimatePresence>
);

const Navbar = ({ onJoinClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  // MOBILE FIX: Added scroll offset and delay to prevent browser conflict
  const handleNavClick = (id) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -70; // Navbar ki height tak adjust karne ke liye
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150); // Menu aaram se band hone ka time
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/70 border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        <div className="flex items-center gap-1.5 md:gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Dumbbell className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
          <span className="text-xl md:text-2xl font-black tracking-tighter text-white drop-shadow-md">APEX<span className="text-red-500">FIT</span></span>
        </div>
        
        <div className="hidden lg:flex gap-8 items-center font-medium text-sm tracking-wide text-gray-300">
          <button onClick={() => handleNavClick('about')} className="hover:text-red-500 transition-colors drop-shadow-md">FEATURES</button>
          <button onClick={() => handleNavClick('classes')} className="hover:text-red-500 transition-colors drop-shadow-md">CLASSES</button>
          <button onClick={() => handleNavClick('pricing')} className="hover:text-red-500 transition-colors drop-shadow-md">PRICING</button>
          <button onClick={() => handleNavClick('contact')} className="hover:text-red-500 transition-colors drop-shadow-md">CONTACT</button>
          <button onClick={onJoinClick} className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]">
            JOIN NOW
          </button>
        </div>

        <button className="lg:hidden text-white p-2 hover:text-red-500 transition-colors focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 gap-5 text-gray-200 font-medium text-center">
              <button onClick={() => handleNavClick('about')} className="py-2 hover:text-red-500 text-lg w-full">FEATURES</button>
              <button onClick={() => handleNavClick('classes')} className="py-2 hover:text-red-500 text-lg w-full">CLASSES</button>
              <button onClick={() => handleNavClick('pricing')} className="py-2 hover:text-red-500 text-lg w-full">PRICING</button>
              <button onClick={() => handleNavClick('contact')} className="py-2 hover:text-red-500 text-lg w-full">CONTACT</button>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => onJoinClick(), 150);
                }} 
                className="bg-red-600 text-white px-5 py-4 rounded-xl font-bold w-full mt-4 shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:bg-red-500"
              >
                JOIN NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ showToast, onScrollToPricing }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center items-center pt-24 pb-12 px-4 md:px-6 z-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center text-center lg:items-start lg:text-left gap-4 sm:gap-5 md:gap-6 w-full">
          <motion.div variants={itemVariants} className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-red-500/50 bg-red-500/20 text-red-100 font-semibold text-[10px] sm:text-xs md:text-sm uppercase tracking-widest backdrop-blur-md shadow-[0_0_10px_rgba(239,68,68,0.2)] inline-block">
            Forging Elite Fitness
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[1.1] sm:leading-[1] tracking-tighter drop-shadow-2xl w-full break-words">
            CRUSH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">YOUR LIMITS</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-md font-light leading-relaxed drop-shadow-md">
            Redefine your potential in a facility engineered for performance, power, and absolute results. No excuses.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mt-2 md:mt-4 w-full sm:w-auto px-2 sm:px-0">
            <button 
              onClick={() => showToast("Redirecting to your 7-day free trial setup...")}
              className="bg-red-600 text-white w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold text-sm md:text-base lg:text-lg hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] focus:outline-none active:scale-95"
            >
              Start Free Trial
            </button>
            <button 
              onClick={onScrollToPricing}
              className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold text-sm md:text-base lg:text-lg text-white border border-white/30 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all focus:outline-none active:scale-95"
            >
              View Plans
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1, delay: 0.4 }} 
          className="relative flex justify-center items-center w-full mt-6 lg:mt-0"
        >
          <motion.div 
            animate={{ y: [-8, 8] }} 
            transition={{ repeat: Infinity, duration: 4, repeatType: 'mirror', ease: 'easeInOut' }} 
            className="w-[85%] max-w-[260px] sm:max-w-sm lg:max-w-md aspect-[4/5] bg-gradient-to-br from-white/10 to-white/5 rounded-[32px] border border-white/20 backdrop-blur-xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-90" />
            <img 
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop" 
              alt="Gym Athlete" 
              className="w-full h-full object-cover rounded-[24px] filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 pointer-events-none" 
            />
            
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20">
              <div className="text-4xl md:text-5xl font-black text-white leading-none drop-shadow-lg">2.4K</div>
              <div className="text-red-500 font-bold tracking-widest text-[10px] sm:text-xs md:text-sm mt-1 md:mt-2 uppercase drop-shadow-md">Members Active</div>
            </div>
            
            <motion.div 
              animate={{ x: [-4, 4], y: [-2, 2] }} 
              transition={{ repeat: Infinity, duration: 5, repeatType: 'mirror', ease: 'easeInOut' }} 
              className="absolute top-4 right-4 md:top-6 md:right-6 bg-black/50 backdrop-blur-md border border-white/10 p-2 md:p-3 rounded-xl md:rounded-2xl z-20 flex items-center gap-1.5 md:gap-3 shadow-xl"
            >
              <div className="bg-red-500/20 p-1 md:p-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500" />
              </div>
              <div className="text-[10px] md:text-xs font-bold text-white whitespace-nowrap">Open 24/7</div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section id="about" className="py-16 md:py-24 px-4 md:px-6 relative z-10 border-t border-white/5 bg-[#0A0A0A]/80 backdrop-blur-sm w-full">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-3 tracking-tight text-white drop-shadow-md">The Apex Standard</h2>
          <div className="w-16 md:w-24 h-1 bg-red-600 mx-auto rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 w-full">
          {featuresData.map((feature, i) => (
            <motion.div key={feature.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ scale: 1.02, y: -5 }} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-md hover:bg-white/10 hover:border-red-500/50 transition-all duration-300 group shadow-lg flex flex-col items-center sm:items-start text-center sm:text-left w-full">
              <div className="transform group-hover:scale-110 transition-transform duration-300 origin-center sm:origin-left drop-shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white drop-shadow-sm">{feature.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Classes = ({ showToast }) => {
  const [activeClass, setActiveClass] = useState(null);

  const handleBookSession = (e, className) => {
    e.stopPropagation(); // Prevents accordion from toggling when clicking button
    showToast(`${className} session successfully added to your calendar!`);
  };

  return (
    <section id="classes" className="py-16 md:py-24 px-4 md:px-6 relative z-10 border-t border-white/5 bg-transparent w-full">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-16 gap-4 md:gap-6 text-center md:text-left">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-3 tracking-tight drop-shadow-md">Signature Classes</h2>
            <div className="w-16 md:w-24 h-1 bg-red-600 mx-auto md:mx-0 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          </div>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-md drop-shadow-md bg-black/40 p-3 rounded-lg backdrop-blur-md border border-white/5">Interactive sessions designed to break plateaus. Select a discipline below to view details.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 w-full">
          {classesData.map((cls) => {
            const isActive = activeClass === cls.id;
            return (
              <motion.div 
                layout 
                key={cls.id} 
                onClick={() => setActiveClass(isActive ? null : cls.id)} 
                className={`relative overflow-hidden rounded-2xl cursor-pointer border transition-all duration-500 shadow-xl ${isActive ? 'border-red-500 bg-black/80 backdrop-blur-xl shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-white/10 bg-black/50 backdrop-blur-md hover:bg-white/10'}`}
              >
                <motion.div layout="position" className="h-40 sm:h-48 md:h-56 overflow-hidden relative group">
                  <div className={`absolute inset-0 bg-black/40 z-10 transition-opacity duration-300 ${isActive ? 'opacity-70' : 'group-hover:opacity-20'}`} />
                  <img src={cls.image} alt={cls.name} className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'scale-110 grayscale-0' : 'grayscale opacity-80 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100'}`} />
                  <h3 className="absolute bottom-3 left-4 md:bottom-4 md:left-6 right-4 md:right-6 text-lg md:text-2xl font-bold z-20 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{cls.name}</h3>
                </motion.div>
                <AnimatePresence>
                  {isActive && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="px-4 md:px-6 pb-4 md:pb-6 text-gray-200">
                      <div className="pt-4 border-t border-white/10 mt-2">
                        <p className="mb-4 text-xs sm:text-sm md:text-base leading-relaxed font-light">{cls.desc}</p>
                        <div className="flex items-center gap-2 mb-2 bg-white/5 p-2 rounded-lg text-xs sm:text-sm">
                          <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500 flex-shrink-0" />
                          <span className="font-semibold text-white tracking-wide">Lead: {cls.trainer}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg text-xs sm:text-sm">
                          <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500 flex-shrink-0" />
                          <span className="tracking-wide">{cls.time}</span>
                        </div>
                        <button 
                          onClick={(e) => handleBookSession(e, cls.name)}
                          className="mt-4 md:mt-6 w-full py-3 bg-red-600/90 hover:bg-red-500 text-white rounded-xl font-bold text-xs sm:text-sm md:text-base transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)] focus:outline-none active:scale-95"
                        >
                          Book Session
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ showToast }) => {
  return (
    <section id="pricing" className="py-16 md:py-24 px-4 md:px-6 relative z-10 border-t border-white/5 bg-[#0A0A0A]/90 backdrop-blur-md w-full">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-3 tracking-tight drop-shadow-md">Membership Tiers</h2>
          <div className="w-16 md:w-24 h-1 bg-red-600 mx-auto rounded-full mb-4 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          <p className="text-xs sm:text-sm md:text-base text-gray-400">Select the plan that matches your ambition.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center w-full max-w-sm sm:max-w-md lg:max-w-6xl mx-auto">
          {pricingData.map((plan, i) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -5 }} className={`relative rounded-3xl w-full ${plan.isPopular ? 'p-[2px] bg-gradient-to-b from-red-500 via-purple-500 to-red-500 transform lg:scale-105 z-20 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'p-[1px] bg-white/20 z-10 backdrop-blur-md hover:bg-white/30 transition-colors'}`}>
              {plan.isPopular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center z-30">
                  <span className="bg-red-600 text-white text-[10px] md:text-xs font-bold px-4 py-1 md:py-1.5 rounded-full tracking-widest uppercase shadow-[0_5px_15px_rgba(220,38,38,0.5)]">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="bg-[#0A0A0A]/95 backdrop-blur-2xl rounded-[22px] h-full p-6 md:p-8 flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white text-center lg:text-left">{plan.tier}</h3>
                <div className="mb-5 md:mb-6 flex items-baseline justify-center lg:justify-start gap-1 border-b border-white/10 pb-5 md:pb-6">
                  <span className="text-4xl md:text-5xl font-black text-white">${plan.price}</span>
                  <span className="text-xs sm:text-sm md:text-base text-gray-500 font-medium">/mo</span>
                </div>
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 flex-grow">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 md:gap-3 text-gray-300 text-xs sm:text-sm md:text-base">
                      <div className={`p-1 rounded-full flex-shrink-0 mt-0.5 ${plan.isPopular ? 'bg-red-500/20' : 'bg-white/10'}`}>
                        <Check className={`w-3 h-3 md:w-4 md:h-4 ${plan.isPopular ? 'text-red-500' : 'text-gray-400'}`} />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => showToast(`${plan.tier} Membership selected. Redirecting...`)}
                  className={`w-full py-3 md:py-4 rounded-xl font-bold text-xs sm:text-sm md:text-base transition-all duration-300 ${plan.isPopular ? 'bg-red-600 text-white hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.7)]' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'} focus:outline-none active:scale-95`}
                >
                  Choose {plan.tier}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactFooter = ({ showToast }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay realistically
    setTimeout(() => {
      showToast("Message sent successfully! Our elite team will reach out shortly.");
      e.target.reset(); 
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <footer id="contact" className="relative z-10 border-t border-white/10 bg-black/95 backdrop-blur-xl pt-16 md:pt-24 pb-8 md:pb-10 px-4 md:px-6 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mb-12 md:mb-20 w-full">
          
          <div className="w-full">
            <h2 className="text-3xl sm:text-4xl font-black uppercase mb-2 tracking-tight drop-shadow-md text-center lg:text-left">Join The Ranks</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-6 md:mb-8 text-center lg:text-left max-w-sm mx-auto lg:mx-0">Drop us a line to schedule your free facility tour or assessment.</p>
            
            <form className="space-y-3 sm:space-y-4 w-full" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input required type="text" placeholder="First Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white/10 transition-all backdrop-blur-sm" />
                <input required type="text" placeholder="Last Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white/10 transition-all backdrop-blur-sm" />
              </div>
              <input required type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white/10 transition-all backdrop-blur-sm" />
              <textarea required rows="4" placeholder="How can we help you crush your goals?" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 sm:py-3.5 text-xs sm:text-sm md:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white/10 transition-all resize-none backdrop-blur-sm"></textarea>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-white text-black font-bold uppercase tracking-wide px-6 md:px-8 py-3.5 md:py-4 rounded-xl hover:bg-red-600 hover:text-white transition-colors w-full lg:w-auto text-xs sm:text-sm md:text-base shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none active:scale-95"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center w-full">
            <div className="bg-white/5 border border-white/10 rounded-[28px] md:rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden w-full">
              <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-red-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-20 h-20 md:w-32 md:h-32 bg-red-500/10 rounded-full blur-3xl" />
              
              <h3 className="text-xl sm:text-2xl font-bold mb-6 md:mb-8 text-white relative z-10 text-center sm:text-left">Facility Details</h3>
              <div className="space-y-5 md:space-y-8 relative z-10 w-full">
                <div className="flex items-start gap-4 group">
                  <div className="bg-black/50 border border-white/10 p-3 md:p-3.5 rounded-xl group-hover:bg-red-600 transition-colors shadow-lg flex-shrink-0">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-red-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base md:text-lg">Location</h4>
                    <p className="text-[11px] sm:text-xs md:text-sm text-gray-400 mt-1 leading-relaxed">1200 Ironworks Blvd.<br/>Metropolis, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="bg-black/50 border border-white/10 p-3 md:p-3.5 rounded-xl group-hover:bg-red-600 transition-colors shadow-lg flex-shrink-0">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-red-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base md:text-lg">Hours</h4>
                    <p className="text-[11px] sm:text-xs md:text-sm text-gray-400 mt-1 leading-relaxed">Members: 24/7 Access<br/>Staffed: 6 AM - 10 PM Daily</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="bg-black/50 border border-white/10 p-3 md:p-3.5 rounded-xl group-hover:bg-red-600 transition-colors shadow-lg flex-shrink-0">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-red-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base md:text-lg">Contact</h4>
                    <p className="text-[11px] sm:text-xs md:text-sm text-gray-400 mt-1 leading-relaxed">+1 (555) 019-2837<br/>hello@apexfit.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

       <div className="border-t border-white/10 pt-6 flex flex-col items-center justify-center gap-4 text-gray-500 text-[10px] sm:text-xs md:text-sm w-full">
          <p className="text-center">&copy; {new Date().getFullYear()} Hitesh Rai Sharma. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6 justify-center">
          </div>
        </div>
        </div>
    </footer>
  );
};

export default function App() {
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 4000); 
  };

  // MOBILE FIX: Added offset for Global JOIN NOW button too
  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-red-500/30 selection:text-white overflow-x-hidden w-full">
      <Background />
      <Navbar onJoinClick={scrollToPricing} />
      
      <main className="w-full flex flex-col">
        <Hero showToast={showToast} onScrollToPricing={scrollToPricing} />
        <Features />
        <Classes showToast={showToast} />
        <Pricing showToast={showToast} />
      </main>
      
      <ContactFooter showToast={showToast} />
      
      <Toast message={toast.message} isVisible={toast.visible} />
    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import { FaTwitter, FaDiscord, FaLinkedin } from 'react-icons/fa';

const DMIHeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [isInIframe, setIsInIframe] = useState(false);
  const heroRef = useRef(null);

  // Check if component is rendered in iframe
  useEffect(() => {
    try {
      setIsInIframe(window.self !== window.top);
    } catch (e) {
      setIsInIframe(true);
    }
  }, []);

  // Mouse tracking for gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.dataset.section]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleCTAClick = (e, type) => {
    e.preventDefault();
    
    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 10;
    `;
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    
    console.log(`${type} clicked`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes logoScale {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes emojiFloat {
          0%, 100% { transform: translateY(3px); }
          50% { transform: translateY(-3px); }
        }

        @keyframes logoHover {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(0deg); }
          100% { transform: scale(1.05) rotate(0deg); }
        }

        @keyframes buttonPulse {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-2px) scale(1.02); }
        }

        @keyframes buttonShine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        @keyframes titleColorShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        #lovable-badge {
            position: fixed;
            bottom: 10px;
            right: 10px;
            width: 141px;
            padding: 5px 13px;	
            background-color: #000;
            color: #fff;
            font-size: 12px;
            border-radius: 5px;
            font-family: sans-serif;
            display: flex;
            align-items: center;
            gap: 4px;
            z-index: 1000000;
            text-transform: none !important;
            font-feature-settings: normal !important;
            font-weight: 400 !important;
        }

        .hero-enter {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 1s ease-out 0.5s forwards;
        }

        .logo-enter {
          opacity: 0;
          transform: scale(0.8);
          animation: logoScale 1s ease-out 0.2s forwards;
        }

        .dmi-logo {
          transition: all 0.9s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          opacity: 1;
        }

        .dmi-logo:hover {
          transform: scale(1.05);
          animation: logoHover 0.9s ease-in-out;    
          box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
        }

        .dmi-logo::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0s;
        }

        .dmi-logo:hover::before {
          left: 100%;
        }

        .headline-enter {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 1s ease-out 0.8s forwards;
        }

        .subheadline-enter {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 1s ease-out 1.1s forwards;
        }

        .cta-enter {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 1s ease-out 1.4s forwards;
        }

        .floating-circle {
          animation: float 6s ease-in-out infinite;
        }

        .emoji-float {
          animation: emojiFloat 2s ease-in-out infinite;
        }

        .emoji-float-delayed {
          animation: emojiFloat 2s ease-in-out infinite 0.5s;
        }

        .emoji-float-delayed-2 {
          animation: emojiFloat 2s ease-in-out infinite 1s;
        }

        .playful-button {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #dc2626, #ef4444, #f97316, #dc2626);
          background-size: 300% 300%;
          animation: buttonPulse 3s ease-in-out infinite;
          border-radius: 50px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        }

        .playful-button:hover {
          animation: buttonShine 1.5s ease-in-out infinite, buttonPulse 3s ease-in-out infinite;
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
          transform: translateY(-3px) scale(1.05);
        }

        .playful-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.6s;
        }

        .playful-button:hover::before {
          left: 100%;
        }

        .artistic-button {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
          backdrop-filter: blur(10px);
          border: 2px solid transparent;
          background-clip: padding-box;
          border-radius: 50px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .artistic-button::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50px;
          padding: 2px;
          background: linear-gradient(45deg, #dc2626, #f97316, #eab308, #dc2626);
          background-size: 300% 300%;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          z-index: -1;
          animation: buttonShine 3s ease-in-out infinite;
        }

        .artistic-button:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .artistic-button:hover::after {
          animation-duration: 1s;
        }
        
        .feature-card {
           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-title {
           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
           background: linear-gradient(135deg, #1f2937, #1f2937);
           background-clip: text;
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
        }

        .feature-card:hover .feature-title {
           color: #dc2626;
           text-shadow: 0 0 10px rgba(221, 37, 37, 0.58);
        }
        
        .feature-title-dark {
           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
           background: linear-gradient(135deg,rgb(217, 223, 231),rgb(242, 181, 181));
           background-clip: text;
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
        }

        .feature-card:hover .feature-title-dark {
           color: #dc2626;
           text-shadow: 0 0 10px rgba(235, 227, 227, 0.58);
        }
        
        .module-card {
          position: relative;
        }
        
        .module-arrow {
            position: absolute;
            bottom: 20px;
            right: 20px;
            opacity: 0;
            transition: all 0.3s ease;
            color: #dc2626;
            font-size: 2rem;
            font-weight: 900;
            pointer-events: none;
            transform: translate(10px, 10px);   
        }
        
        .module-card:hover .module-arrow {
            opacity: 1;
            transform: translate(0, 0);
        }

        .scroll-section {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }

        .scroll-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .gradient-text {
          background: linear-gradient(135deg, #1f2937 0%, #e30613 50%, #1f2937 100%);
          background-size: 200% 200%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-position: ${mousePosition.x}% ${mousePosition.y}%;
          transition: background-position 0.3s ease;
        }








        /* -------------------------------------------- Responsive breakpoints -----------------------------------------------------------*/
        @media (max-width: 640px) {
          .hero-title {
            font-size: 2.5rem;
            line-height: 1.1;
          }
          
          .hero-subtitle {
            font-size: 1rem;
            padding: 0 1rem;
          }
          
          .floating-circle {
            display: none;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .hero-title {
            font-size: 3.5rem;
            line-height: 1.1;
          }
          
          .hero-subtitle {
            font-size: 1.125rem;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-title {
            font-size: 4.5rem;
            line-height: 1.1;
          }
          
          .hero-subtitle {
            font-size: 1.25rem;
          }
        }

        @media (min-width: 1025px) {
          .hero-title {
            font-size: 6rem;
            line-height: 1.1;
          }
          
          .hero-subtitle {
            font-size: 1.5rem;
          }
        }

        @media (min-width: 1280px) {
          .hero-title {
            font-size: 7rem;
            line-height: 1.1;
          }
          
          .hero-subtitle {
            font-size: 1.75rem;
          }
        }
      `}</style>









      {/*------------------------------------------------------------------------------------------------Hero Section-----------------------------------------------------------------------------------------*/}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-red-100 to-red-50 floating-circle opacity-40"
            style={{ top: '20%', left: '10%' }}
          />
          <div 
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-yellow-50 floating-circle opacity-30"
            style={{ top: '60%', right: '15%', animationDelay: '2s' }}
          />
          <div 
            className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-amber-50 floating-circle opacity-35"
            style={{ bottom: '30%', left: '20%', animationDelay: '4s' }}
          />
        </div>
        
        <div className="max-w-4xl text-center z-10 hero-enter">
          {!isInIframe && (
            <div className="inline-block bg-red-600 text-white uppercase px-6 py-5 rounded-xl font-black text-2xl tracking-wider shadow-md mb-8 logo-enter dmi-logo">
              DMI
            </div>
          )}

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 headline-enter">
            <span className="gradient-text">
              Design Made<br />Intelligent
            </span>
          </h1>

          <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 mb-7 headline-enter">
            From Startup to Scale. AI Powered Design
          </h2>
          
          <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed subheadline-enter">
            From brand kit to launch-ready content, websites & apps — powered by AI. 
            Transform your brand identity into a complete digital ecosystem in minutes, not months.
          </p>
          <p className='text-lg md:text-xl lg:text-xl font-medium text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed'>
            Trusted by 500+ growing businesses to create professional, consistent brand experiences across all channels.
          </p>

          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center cta-enter">
            <button
              onClick={(e) => handleCTAClick(e, 'Demo')}
              className="playful-button px-8 py-4 text-white font-semibold text-lg min-w-48 flex items-center justify-center gap-3"
            >
              <span className="emoji-float">🎮</span>
              Try the Demo
              <span className="text-xl">→</span>
            </button>
            <button
              onClick={(e) => handleCTAClick(e, 'Waitlist')}
              className="artistic-button px-8 py-4 text-gray-800 font-semibold text-lg min-w-48 flex items-center justify-center gap-3"
            >
              <span className="emoji-float-delayed">✨</span>
              Join Waitlist
              <span className="text-xl">↗</span>
            </button>
          </div>
        </div>
      </section>







      {/*------------------------------------------------------------------------------------Additional Scroll Content-------------------------------------------------------------------------*/}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <section 
          data-section="intro"
          className={`text-center mb-16 scroll-section ${visibleSections.has('intro') ? 'visible' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8">
            Revolutionizing Brand Design
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience the future of brand creation with our AI-powered platform that understands your vision and brings it to life across all digital touchpoints.
          </p>
        </section>

        <section 
          data-section="features"
          className={`mb-16 scroll-section ${visibleSections.has('features') ? 'visible' : ''}`}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🧠",
                title: "AI-Powered Design",
                description: "Generate stunning brand assets and layouts using advanced AI that learns from your brand guidelines and preferences.",
                animationClass: "emoji-float"
              },
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Create professional websites, mobile apps, and marketing materials in minutes instead of weeks.",
                animationClass: "emoji-float-delayed"
              },
              {
                icon: "🚀",
                title: "Scale Instantly",
                description: "Launch across multiple platforms simultaneously with consistent branding and optimized performance.",
                animationClass: "emoji-float-delayed-2"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="feature-card bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 hover:border-red-200 hover:bg-white/80 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <div className={`w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-2xl mb-6 ${feature.animationClass}`}>
                  {feature.icon}
                </div>
                <h3 className="feature-title text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section 
          data-section="social-proof"
          className={`text-center mb-16 scroll-section ${visibleSections.has('social-proof') ? 'visible' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Join 500+ Funded Startups
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From ideation to launch, DMI empowers businesses to create professional brand identities, social content, and app interfaces that scale with their growth.
          </p>
        </section>

        <section 
          data-section="cta-bottom"
          className={`text-center py-12 scroll-section ${visibleSections.has('cta-bottom') ? 'visible' : ''}`}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-8">
            Ready to Transform Your Brand?
          </h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={(e) => handleCTAClick(e, 'Free Trial')}
              className="playful-button px-8 py-4 text-white font-semibold text-lg min-w-48"
            >
              Start Free Trial
            </button>
            <button
              onClick={(e) => handleCTAClick(e, 'Watch Demo')}
              className="artistic-button px-8 py-4 text-gray-800 font-semibold text-lg min-w-48"
            >
              Watch Demo
            </button>
          </div>
        </section>









        {/*-------------------------------------------------------------------------------------How It Works Section----------------------------------------------------------------------------------------*/}
        <section 
          data-section="how-it-works"
          className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white mb-20 scroll-section  ${visibleSections.has('how-it-works') ? 'visible' : ''}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              How It <span className="text-red-500">Works</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              From brand upload to global distribution - our AI handles everything so you can focus on growing your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                icon: "📁",
                title: "Upload Brand Kit",
                description: "Drop your logo, fonts, colors, and brand guidelines. Our AI analyzes your brand DNA instantly.",
                animationClass: "emoji-float"
              },
              {
                step: "02",
                icon: "🤖",
                title: "AI Generates Content",
                description: "Watch as intelligent algorithms create stunning social media posts, web designs, and app interfaces.",
                animationClass: "emoji-float-delayed"
              },
              {
                step: "03",
                icon: "🎯",
                title: "Auto-Publish Everywhere",
                description: "Seamlessly distribute to Instagram, TikTok, LinkedIn, and your website with one click.",
                animationClass: "emoji-float-delayed-2"
              },
              {
                step: "04",
                icon: "📊",
                title: "Continuous Optimization",
                description: "AI learns from performance data to improve your brand assets and maximize engagement.",
                animationClass: "emoji-float"
              }
            ].map((step, index) => (
              <div key={index} className="feature-card bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-red-500/50 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-red-600/50">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                    {step.step}
                  </div>
                  <div className={`text-2xl ${step.animationClass}`}>{step.icon}</div>
                </div>
                <h3 className="feature-title-dark text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>








        {/*----------------------------------------------------------------------------- -Powerful Modules Section------------------------------------------------------------------------------*/}
        <section 
          data-section="modules"
          className={`mb-20 scroll-section ${visibleSections.has('modules') ? 'visible' : ''}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
              Powerful <span className="text-red-600">Modules</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Four integrated AI-powered tools that work together to transform your brand presence across all channels.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🎨",
                title: "BrandKit OS",
                description: "Centralized brand management system that maintains consistency across all touchpoints.",
                features: ["Logo Management", "Color Palettes", "Typography", "Brand Guidelines"],
                animationClass: "emoji-float"
              },
              {
                icon: "📱",
                title: "Social Media Studio",
                description: "AI-powered content creation for Instagram, TikTok, LinkedIn, and more platforms.",
                features: ["Auto-posting", "Content Calendar", "Hashtag Optimization", "Analytics"],
                animationClass: "emoji-float-delayed"
              },
              {
                icon: "💻",
                title: "Web/App Generator",
                description: "Instantly generate responsive websites and mobile apps that match your brand.",
                features: ["Responsive Design", "Mobile Apps", "E-commerce Ready", "SEO Optimized"],
                animationClass: "emoji-float-delayed-2"
              },
              {
                icon: "🚀",
                title: "Brand Genesis AI",
                description: "Launch new brands from scratch with AI-generated logos, websites, and identity systems.",
                features: ["Logo Generation", "Name Suggestions", "Market Analysis", "Launch Strategy"],
                animationClass: "emoji-float"
              }
            ].map((module, index) => (
              <div key={index} className="feature-card module-card bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 cursor-pointer">
                <div className={`w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-2xl mb-6 ${module.animationClass}`}>
                  {module.icon}
                </div>
                <h3 className="feature-title text-xl font-bold text-gray-800 mb-4">{module.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{module.description}</p>
                <ul className="space-y-2">
                  {module.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="module-arrow">→</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-center">
            {[
              { number: "500+", label: "Brands Transformed"},
              { number: "$50M+", label: "Revenue Generated"},
              { number: "98%", label: "Client Satisfaction"},
              { number: "24h", label: "Average Delivery"}
            ].map((stat, index) => (
              <div key={index} className="items-center space-x-3 bg-white rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 cursor-default">
                <div className="text-3xl md:text-4xl font-black text-red-600 mb-2">{stat.number}</div>
                <div className="text-sm font-semibold text-gray-800 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </section>






        {/*----------------------------------------------------------------------Trusted Companies Section ---------------------------------------------------------------------------------------*/}
        <section 
          data-section="companies"
          className={`text-center mb-20 scroll-section ${visibleSections.has('companies') ? 'visible' : ''}`}
        >
          <p className="text-lg text-gray-500 mb-8">Join innovative companies already creating with DMI</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { name: "Shapercult", color: "from-pink-400 to-purple-400", icon: "💎" },
              { name: "XPay", color: "from-blue-400 to-cyan-400", icon: "💳" },
              { name: "Rise", color: "from-green-400 to-emerald-400", icon: "📈" },
              { name: "Rasoishop", color: "from-orange-400 to-red-400", icon: "🛒" }
            ].map((company, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className={`w-10 h-10 bg-gradient-to-br ${company.color} rounded-xl flex items-center justify-center text-lg`}>
                  {company.icon}
                </div>
                <span className="font-semibold text-gray-700">{company.name}</span>
              </div>
            ))}
          </div>
        </section>







        {/* ------------------------------------------------------------ Why DMI Exists Section -----------------------------------------------------------------------------*/}
        <section 
          data-section="why-dmi"
          className={`text-center mb-20 scroll-section ${visibleSections.has('why-dmi') ? 'visible' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Why DMI Exists
          </h2>
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "🚀",
                title: "Democratize Design",
                description: "Make professional-grade design accessible to every startup, regardless of budget or team size.",
                bgColor: "from-pink-100 to-red-100",
                animationClass: "emoji-float"
              },
              {
                icon: "⚡",
                title: "Accelerate Growth",
                description: "Eliminate design bottlenecks that slow down product launches and marketing campaigns.",
                bgColor: "from-orange-100 to-red-100",
                animationClass: "emoji-float-delayed"
              },
              {
                icon: "🎯",
                title: "Ensure Consistency",
                description: "Maintain brand coherence across all touchpoints with AI-powered design systems.",
                bgColor: "from-red-100 to-pink-100",
                animationClass: "emoji-float-delayed-2"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.bgColor} rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto ${item.animationClass}`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Startups Onboarded", sublabel: "in private beta" },
              { number: "50M+", label: "Designs Generated", sublabel: "Since launch" },
              { number: "99.8%", label: "Platform Uptime", sublabel: "Enterprise-grade SLA" },
              { number: "24h", label: "Avg. Brand Delivery", sublabel: "From brief to assets" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-black text-red-600 mb-2">{stat.number}</div>
                <div className="text-sm font-semibold text-gray-800 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </section>







        {/* ------------------------------------------------------------- Revolution CTA Section ----------------------------------------------------------------------------*/}
        <section 
          data-section="revolution-cta"
          className={`bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 text-white text-center mb-20 scroll-section ${visibleSections.has('revolution-cta') ? 'visible' : ''}`}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            Be Part of the <span className="text-red-500">Design Revolution</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of brands already transforming their presence with AI-powered design.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { number: "1000+", label: "Active Brands" },
              { number: "50M+", label: "Designs Created" },
              { number: "99.8%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-800/50 rounded-3xl p-8 mb-8 border border-gray-700">
            <h3 className="text-2xl font-bold mb-6">Get Early Access</h3>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
              />
              <button
                onClick={(e) => handleCTAClick(e, 'Join Revolution')}
                className="playful-button px-6 py-3 text-white font-semibold whitespace-nowrap"
              >
                Join Revolution →
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-4 flex items-center justify-center">
              <span className="text-red-400 mr-2">🚀</span>
              Be among the first 1000 users to get lifetime Pro features
            </p>
          </div>
          
          <div className="mb-8">
            <p className="text-gray-300 mb-4">Want a personalized demo? Schedule a call with our founding team.</p>
            <button
              onClick={(e) => handleCTAClick(e, 'Schedule Demo')}
              className="artistic-button px-8 py-4 text-gray-800 font-semibold text-lg"
            >
              📅 Schedule Demo Call
            </button>
          </div>
          
          <div className="flex justify-center space-x-8">
            {[
              { icon: <FaLinkedin />, label: "LinkedIn" },
              { icon: <FaDiscord />, label: "Discord" },
              { icon: <FaTwitter />, label: "Twitter" }
            ].map((social, index) => (
              <button
                key={index}
                className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300"
                onClick={(e) => handleCTAClick(e, social.label)}
              >
                <div className="text-2xl mb-1">{social.icon}</div>
                <span className="text-sm">{social.label}</span>
              </button>
            ))}
          </div>
        </section>







        {/* ----------------------------------------------------- Footer ----------------------------------------------------------*/}
        <footer className="border-t border-gray-200 pt-12 pb-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-red-600 text-white px-3 py-2 rounded-lg font-bold text-lg mr-3">
                  DMI
                </div>
                <span className="font-semibold text-gray-800">Design Made Intelligent</span>
              </div>
              <p className="text-gray-600">
                Democratizing world-class design through AI innovation.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><button onClick={(e) => handleCTAClick(e, 'About')} className="hover:text-red-600 transition-colors">About</button></li>
                <li><button onClick={(e) => handleCTAClick(e, 'Careers')} className="hover:text-red-600 transition-colors">Careers</button></li>
                <li><button onClick={(e) => handleCTAClick(e, 'Blog')} className="hover:text-red-600 transition-colors">Blog</button></li>
                <li><button onClick={(e) => handleCTAClick(e, 'Press Kit')} className="hover:text-red-600 transition-colors">Press Kit</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600">
                <li><button onClick={(e) => handleCTAClick(e, 'Privacy Policy')} className="hover:text-red-600 transition-colors">Privacy Policy</button></li>
                <li><button onClick={(e) => handleCTAClick(e, 'Terms of Service')} className="hover:text-red-600 transition-colors">Terms of Service</button></li>
                <li><button onClick={(e) => handleCTAClick(e, 'Contact')} className="hover:text-red-600 transition-colors">Contact</button></li>
                <li><button onClick={(e) => handleCTAClick(e, 'Support')} className="hover:text-red-600 transition-colors">Support</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
                <p className="text-gray-500 text-sm mb-2">
                © 2024 DMI. All rights reserved. Powered by AI, crafted by humans.
                </p>
                <p className="text-green-400 text-xs flex items-center justify-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                System Status: Operational
                </p>
            </div>
        </footer>
      </div>
    </div>
  );
};
export default DMIHeroSection;
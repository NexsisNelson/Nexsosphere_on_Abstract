import React, { useEffect, useRef } from 'react';
import { Rocket, Shield, Coins, Users, ArrowRight, Sparkles } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Update {
  date: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Shield className="w-6 h-6 text-green-500" />,
    title: "Secure Trading",
    description: "Advanced security protocols and multi-signature wallets for safe transactions"
  },
  {
    icon: <Coins className="w-6 h-6 text-green-500" />,
    title: "DeFi Integration",
    description: "Seamless access to lending, staking, and liquidity pools"
  },
  {
    icon: <Sparkles className="w-6 h-6 text-green-500" />,
    title: "NFT Marketplace",
    description: "Create, buy, and sell unique digital assets with ease"
  },
  {
    icon: <Users className="w-6 h-6 text-green-500" />,
    title: "Community Governance",
    description: "Participate in platform decisions through decentralized voting"
  }
];

const updates: Update[] = [
  {
    date: "2024-03-15",
    title: "NFT Auctions Launch",
    description: "Introducing dynamic NFT auctions with time-based bidding"
  },
  {
    date: "2024-03-10",
    title: "Enhanced Security",
    description: "Implementation of advanced fraud detection systems"
  },
  {
    date: "2024-03-05",
    title: "Mobile App Beta",
    description: "Beta testing of our new mobile application begins"
  }
];

export function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      container.style.transform = `
        perspective(1000px)
        rotateY(${x * 5}deg)
        rotateX(${-y * 5}deg)
      `;
    };

    const handleMouseLeave = () => {
      container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const { left, top, width, height } = container.getBoundingClientRect();
      
      const x = (touch.clientX - left) / width - 0.5;
      const y = (touch.clientY - top) / height - 0.5;
      
      container.style.transform = `
        perspective(1000px)
        rotateY(${x * 5}deg)
        rotateX(${-y * 5}deg)
      `;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative min-h-screen" ref={containerRef}>
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-300"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=2400")',
          filter: 'brightness(0.3)'
        }}
      />
      
      {/* Animated Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-gray-900/50 z-1 animate-pulse" />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-20 pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 transition-transform duration-300 hover:scale-105">
            Welcome to <span className="text-green-400">Nexsosphere</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Your gateway to the future of decentralized finance, NFTs, and blockchain innovation
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Updates */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Latest Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {updates.map((update, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="text-green-400 mb-2">{update.date}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{update.title}</h3>
                <p className="text-gray-300">{update.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
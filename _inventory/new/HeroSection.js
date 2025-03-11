"use client";

import Image from 'next/image';
import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import wealth from './assets/herosection_images/wealth.jpg';
import technology from './assets/herosection_images/technology.jpg';
import skills from './assets/herosection_images/skills.jpg';
import royalty from './assets/herosection_images/royalty.jpg';
import influence from './assets/herosection_images/influence.jpg'; 

const slides = [
  {
    text: "Wealth isn't just money—it's the power to write your story.",
    author: "Flexmood",
    description: "Flexmood transforms your mindset, teaching you to master the art of financial dominance.",
    bgGradient: "from-black via-gold-900 to-yellow-700",
    image: wealth,
    overlayColor: "bg-gradient-to-r from-yellow-900/60 to-yellow-700/60"
  },
  {
    text: "Technology is the new throne. Master it, and the world follows.",
    author: "Flexmood",
    description: "Flexmood gives you the tools and edge to rise above in the age of innovation.",
    bgGradient: "from-black via-blue-900 to-electric-blue",
    image: technology,
    overlayColor: "bg-gradient-to-r from-blue-900/50 to-blue-500/50"
  },
  {
    text: "Greatness isn't born; it's engineered. Build rare skills. Own the game.",
    author: "Flexmood",
    description: "Flexmood forges you into a master of craft—irreplaceable, unstoppable, undeniable.",
    bgGradient: "from-black via-emerald-900 to-teal-800",
    image: skills,
    overlayColor: "bg-gradient-to-r from-emerald-900/50 to-teal-800/50"
  },
  {
    text: "The crown belongs to those who demand it. Rule your domain.",
    author: "Flexmood",
    description: "Flexmood sharpens your strategy and vision to lead like the royalty you were meant to be.",
    bgGradient: "from-black via-royal-purple to-indigo-900",
    image: royalty,
    overlayColor: "bg-gradient-to-r from-purple-900/50 to-indigo-900/50"
  },
  {
    text: "Influence isn't given—it's seized. Shape hearts, command minds.",
    author: "Flexmood",
    description: "Flexmood unlocks the secrets of persuasion to build deeper, unshakable relationships.",
    bgGradient: "from-black via-crimson-700 to-deep-pink",
    image: influence,
    overlayColor: "bg-gradient-to-r from-rose-900/70 to-pink-700/50"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const sliderRef = useRef(null);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    resetAutoSlideTimer();
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => 
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
    resetAutoSlideTimer();
  }, []);

  const goToSlide = useCallback((index) => {
    if (index !== currentSlide) {
      setCurrentSlide(index);
      resetAutoSlideTimer();
    }
  }, [currentSlide]);

  const resetAutoSlideTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(nextSlide, 5000);
  }, [nextSlide]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const touchDiff = touchStart - touchEnd;

    if (Math.abs(touchDiff) > 50) {
      if (touchDiff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  useEffect(() => {
    resetAutoSlideTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resetAutoSlideTimer]);

  return (
    <section 
      className="relative w-full overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Feather Effect */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/90 via-black/40 to-transparent z-30 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
        }}
      ></div>

      <div className="mx-auto">
        <div className="relative h-[300px] sm:h-[350px] md:h-[calc(100vh-60px)] lg:h-[calc(100vh-60px)] overflow-hidden w-full">
          <div
            ref={sliderRef}
            className="absolute left-0 flex h-full w-full transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`relative flex h-full w-full flex-shrink-0 flex-col items-center justify-center text-center px-4 sm:px-6 bg-gradient-to-br ${slide.bgGradient}`}
              >
                {/* Responsive Background Image */}
                <div className="absolute inset-0 z-10">
                  <Image
                    src={slide.image}
                    alt={`Flexmood slide ${index + 1}`}
                    fill
                    sizes="100vw"
                    quality={75}
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>

                {/* Color Overlay with Coordinated Colors */}
                <div className={`absolute inset-0 z-20 ${slide.overlayColor}`}></div>

                {/* Text Content */}
                <div className="relative z-30 mx-auto max-w-screen-xl">
                  <h2 
                    className="mb-4 text-xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight sm:leading-snug"
                    style={{
                      textShadow: '0 4px 15px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.5)'
                    }}
                  >
                    &ldquo;{slide.text}&rdquo;
                  </h2>
                  <p 
                    className="mb-4 text-base sm:text-xl font-medium text-white"
                    style={{
                      textShadow: '0 2px 8px rgba(0,0,0,0.6)'
                    }}
                  >
                    - {slide.author}
                  </p>
                  <p 
                    className="text-xs sm:text-sm text-gray-100 max-w-md mx-auto"
                    style={{
                      textShadow: '0 1px 4px rgba(0,0,0,0.5)'
                    }}
                  >
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Navigation Buttons */}
          <div className="hidden md:block">
            <button 
              onClick={prevSlide} 
              className="absolute top-1/2 left-4 transform -translate-y-1/2 z-40"
            >
              <ChevronLeft 
                className="text-white opacity-50 hover:opacity-100 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" 
                size={32} 
                strokeWidth={1.5}
              />
            </button>
            <button 
              onClick={nextSlide} 
              className="absolute top-1/2 right-4 transform -translate-y-1/2 z-40"
            >
              <ChevronRight 
                className="text-white opacity-50 hover:opacity-100 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" 
                size={32} 
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* Dots Navigation - Moved to overlap feather effect */}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40 pb-8"
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.8)]' : 'bg-gray-500'} transition-all duration-300`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Feather Effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-30 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
        }}
      ></div>
    </section>
  );
}
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    text: "Wealth isn’t just money—it’s the power to write your story.",
    author: "Flexmood",
    description: "Flexmood transforms your mindset, teaching you to master the art of financial dominance.",
    bgGradient: "from-black via-gold-900 to-yellow-700"
  },
  {
    text: "Technology is the new throne. Master it, and the world follows.",
    author: "Flexmood",
    description: "Flexmood gives you the tools and edge to rise above in the age of innovation.",
    bgGradient: "from-black via-blue-900 to-electric-blue"
  },
  {
    text: "Greatness isn’t born; it’s engineered. Build rare skills. Own the game.",
    author: "Flexmood",
    description: "Flexmood forges you into a master of craft—irreplaceable, unstoppable, undeniable.",
    bgGradient: "from-black via-emerald-900 to-teal-800"
  },
  {
    text: "The crown belongs to those who demand it. Rule your domain.",
    author: "Flexmood",
    description: "Flexmood sharpens your strategy and vision to lead like the royalty you were meant to be.",
    bgGradient: "from-black via-royal-purple to-indigo-900"
  },
  {
    text: "Influence isn’t given—it’s seized. Shape hearts, command minds.",
    author: "Flexmood",
    description: "Flexmood unlocks the secrets of persuasion to build deeper, unshakable relationships.",
    bgGradient: "from-black via-red-700 to-pink-500"
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
    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Reset timer
    timerRef.current = setTimeout(nextSlide, 5000);
  }, [nextSlide]);

  // Touch event handlers for mobile
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
    // Initial timer setup
    resetAutoSlideTimer();

    // Cleanup function
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
      <div className="mx-auto max-w-screen-xl">
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
                {/* Mesh Gradient Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-3xl opacity-40"></div>

                {/* Text Content */}
                <div className="relative z-20">
                  <h2 className="mb-4 text-xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight sm:leading-snug drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                    &ldquo;{slide.text}&rdquo;
                  </h2>
                  <p className="mb-4 text-base sm:text-xl font-medium text-white/80">
                    - {slide.author}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
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
              className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30"
            >
              <ChevronLeft 
                className="text-white opacity-50 hover:opacity-100 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" 
                size={32} 
                strokeWidth={1.5}
              />
            </button>
            <button 
              onClick={nextSlide} 
              className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30"
            >
              <ChevronRight 
                className="text-white opacity-50 hover:opacity-100 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" 
                size={32} 
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
    </section>
  );
}
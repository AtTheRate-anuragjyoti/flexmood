"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    text: "Master skills and combine them uniquely to shape the future.",
    author: "Flexmood",
    description: "Flexmood helps you master skills and stand out by thinking differently.",
    bgGradient: "from-black via-green-900 to-teal-800"
  },
  {
    text: "Love your craft by honing rare and powerful skills.",
    author: "Flexmood",
    description: "Flexmood guides you to mastery, making you unstoppable.",
    bgGradient: "from-black via-red-900 to-purple-800"
  },
  {
    text: "Creativity grows from refining, combining, and transforming ideas.",
    author: "Flexmood",
    description: "Flexmood helps you turn ideas into unique and creative solutions.",
    bgGradient: "from-black via-purple-900 to-indigo-800"
  },
  {
    text: "Care deeply to build stronger connections quickly.",
    author: "Flexmood",
    description: "Flexmood helps you create authentic, lasting relationships.",
    bgGradient: "from-black via-teal-900 to-blue-800"
  },
  {
    text: "Lead your learning to turn challenges into strengths.",
    author: "Flexmood",
    description: "Flexmood empowers you to master any skill and achieve greatness.",
    bgGradient: "from-black via-blue-900 to-gray-800"
  },
  {
    text: "Greatness is earned through persistence and growth.",
    author: "Flexmood",
    description: "Flexmood turns challenges into steps toward success.",
    bgGradient: "from-black via-orange-900 to-red-800"
  },
  {
    text: "Connect ideas from all fields to gain a unique edge.",
    author: "Flexmood",
    description: "Flexmood helps you master cross-disciplinary thinking.",
    bgGradient: "from-black via-indigo-900 to-blue-700"
  },
  {
    text: "Learn faster and act decisively to stay ahead.",
    author: "Flexmood",
    description: "Flexmood sharpens your skills to outpace the competition.",
    bgGradient: "from-black via-yellow-900 to-orange-800"
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
"use client";

import { useEffect, useState, useRef } from "react";

const slides = [
  {
    text: "The future belongs to those who master diverse skills and fuse them in ways that others can't even imagine.",
    author: "Flexmood",
    description: "Flexmood empowers you to master diverse skills, combine them creatively, and set yourself apart from others. It's time to unlock the future by becoming irreplaceable.",
    bgGradient: "bg-gradient-to-r from-teal-800 to-blue-900"
  },
  {
    text: "To truly love your craft, first forge your skills into something rare and powerful. Only then will you feel unstoppable.",
    author: "Flexmood",
    description: "Flexmood helps you refine your skills, turning them into something extraordinary. Mastery makes you unstoppable and sets you on the path to success.",
    bgGradient: "bg-gradient-to-r from-yellow-600 to-orange-700"
  },
  {
    text: "Creativity is not a spark of magic—it's the relentless power of refining, combining, and transforming ideas.",
    author: "Flexmood",
    description: "Flexmood fuels your creativity by teaching you to refine, combine, and transform ideas into something uniquely yours. Let your creativity lead the way.",
    bgGradient: "bg-gradient-to-r from-purple-800 to-pink-700"
  },
  {
    text: "You can build stronger bonds in two months by truly caring for others than in two years by seeking their approval.",
    author: "Flexmood",
    description: "Flexmood helps you build authentic relationships based on trust and genuine care, creating lasting connections in a shorter time.",
    bgGradient: "bg-gradient-to-r from-green-600 to-teal-700"
  },
  {
    text: "True mastery demands the courage to lead your own learning—take the reins, and transform the impossible into your skill.",
    author: "Flexmood",
    description: "Flexmood empowers you to take charge of your learning. Transform challenges into your strengths and lead your journey to mastery.",
    bgGradient: "bg-gradient-to-r from-red-700 to-orange-800"
  },
  {
    text: "Greatness is not a birthright—it’s earned by those willing to grind, grow, and persist until their vision becomes reality.",
    author: "Flexmood",
    description: "Flexmood guides you on your journey to greatness by helping you transform challenges into opportunities for growth and achievement.",
    bgGradient: "bg-gradient-to-r from-blue-800 to-indigo-800"
  },
  {
    text: "Success belongs to those who connect dots across different realms, weaving a tapestry of brilliance from all walks of knowledge.",
    author: "Flexmood",
    description: "Flexmood teaches you the power of cross-disciplinary learning, allowing you to integrate knowledge from various fields to gain a unique edge.",
    bgGradient: "bg-gradient-to-r from-pink-700 to-purple-800"
  },
  {
    text: "Victory comes not to those who work hard, but to those who learn faster than their competitors and act without hesitation.",
    author: "Flexmood",
    description: "Flexmood equips you with the tools to learn faster and act decisively, giving you the edge to outpace your competition.",
    bgGradient: "bg-gradient-to-r from-yellow-600 to-orange-700"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    }
  };

  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      const transitionEndHandler = () => setIsTransitioning(false);
      sliderRef.current.addEventListener("transitionend", transitionEndHandler);
      return () => {
        sliderRef.current?.removeEventListener("transitionend", transitionEndHandler);
      };
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="mx-auto max-w-screen-xl">
        <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden w-full">
          <div
            ref={sliderRef}
            className="absolute left-0 flex h-full w-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`flex h-full w-full flex-shrink-0 flex-col items-center justify-center text-center px-4 sm:px-6 ${slide.bgGradient}`}
              >
                <h2 className="mb-4 text-md sm:text-2xl md:text-3xl font-bold text-white leading-tight sm:leading-snug">
                  &ldquo;{slide.text}&rdquo;
                </h2>
                <p className="mb-4 text-sm sm:text-lg font-medium text-white">
                  - {slide.author}
                </p>
                <p className="text-[10px] sm:text-base text-white w-full max-w-none">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dots for navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-400'} transition-all duration-300`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}

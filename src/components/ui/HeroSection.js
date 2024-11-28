"use client"

import { useEffect, useState, useRef } from "react"

const slides = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    description: "Flexmood helps you unlock your passion and commitment, turning work into a path of greatness. Master the art of loving your craft and achieving your goals.",
    bgGradient: "bg-gradient-to-r from-gray-900 to-black",  // Dark gradient for mystery and focus
  },
  {
    text: "Don’t count the days, make the days count.",
    author: "Muhammad Ali",
    description: "Flexmood’s productivity tools help you take control of each moment, ensuring every day becomes a step towards personal greatness.",
    bgGradient: "bg-gradient-to-r from-indigo-900 to-black",  // Deep, dark indigo for a bold and mysterious look
  },
  {
    text: "You miss 100% of the shots you don’t take.",
    author: "Wayne Gretzky",
    description: "Flexmood empowers you to seize every opportunity, eliminating hesitation and enabling decisive actions that lead to success.",
    bgGradient: "bg-gradient-to-r from-blue-900 to-indigo-900",  // Dark blue to indigo for a powerful, bold vibe
  },
];





export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sliderRef = useRef(null)

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (sliderRef.current) {
      const transitionEndHandler = () => setIsTransitioning(false)
      sliderRef.current.addEventListener("transitionend", transitionEndHandler)
      return () => {
        sliderRef.current?.removeEventListener("transitionend", transitionEndHandler)
      }
    }
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-gray-100">
      <div className="mx-auto max-w-screen-xl">
        <div className="relative h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden">
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
                className={`flex h-full w-full flex-shrink-0 flex-col items-center justify-center px-4 sm:px-8 md:px-16 text-center ${slide.bgGradient}`}
              >
                <h2 className="mb-2 text-lg sm:text-xl md:text-2xl font-bold text-white">
                  &ldquo;{slide.text}&rdquo;
                </h2>
                <p className="mb-2 sm:mb-4 text-sm sm:text-base md:text-lg italic text-white">
                  - {slide.author}
                </p>
                <p className="text-xs sm:text-sm md:text-base text-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


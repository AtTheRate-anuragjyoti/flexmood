'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import userRegion from '@/utils/region'

const FeedbackModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const region = userRegion((state) => state.region)

  useEffect(() => {
    if (region !== "") {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [region])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleFeedbackClick = () => {
    window.open('https://forms.gle/sR7zSMFrPCiGJcuU9', '_blank')
    handleClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 bg-white rounded-xl shadow-xl mx-3 animate-fade-up">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Quick Feedback</h2>
          <p className="text-gray-600 mb-6">
            Help us improve! Share your thoughts in our quick feedback form - it takes less than a minute.
          </p>
          
          <button
            onClick={handleFeedbackClick}
            className="w-full py-3 px-4 bg-[#ED155D] hover:bg-[#ab0c41] text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Share Feedback
          </button>
          
          <p className="mt-4 text-sm text-gray-500">
            Your feedback helps us serve you better
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal
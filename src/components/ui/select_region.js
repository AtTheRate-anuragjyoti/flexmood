'use client'

import { useState } from 'react'
import india from './assets/india.png'
import globe from './assets/globe.png'
import Image from 'next/image'
import userRegion from '@/utils/region'

export default function SelectRegion() {
  const [selectedRegion, setSelectedRegion] = useState('')

  const region = userRegion((state) => state.region)
  const setIndia = userRegion((state) => state.setRegionIndia)
  const setInter = userRegion((state) => state.setRegionInter)

  const handleRegionSelect = (region) => {
    setSelectedRegion(region)
    if (region === 'india') {
      setIndia()
    } else {
      setInter()
    }
  }

  return (<>
    {region == "" && <div className="fixed h-full inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg mx-3">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Select your region</h2>
        <div className="space-y-4">
          <RegionButton
            image={india}
            alt="India flag"
            text="India"
            onClick={() => handleRegionSelect('india')}
            selected={selectedRegion === 'india'}
          />
          <div className="flex items-center justify-center">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-sm font-medium text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <RegionButton
            image={globe}
            alt="Globe icon"
            text="International"
            onClick={() => handleRegionSelect('international')}
            selected={selectedRegion === 'international'}
          />
        </div>
      </div>
    </div>}
    </>
  )
}

function RegionButton({ image, alt, text, onClick, selected }) {
  return (
    <button
      className={`w-full p-3 text-left transition-colors duration-200 bg-gray-100 rounded-md flex items-center space-x-4 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        selected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <Image src={image} alt={alt} width={30} height={30} className="rounded-full" />
      <span className="text-lg font-medium text-gray-700">{text}</span>
    </button>
    
  )
}
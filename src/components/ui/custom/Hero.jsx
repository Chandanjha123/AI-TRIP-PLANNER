import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'
import GradientText from '../../GradientText'
import ShinyText from '@/components/ShinyText'
import Aurora from '@/components/Aurora'

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Background Aurora */}
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
        className="absolute inset-0 z-0"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-20 lg:px-40 gap-9 min-h-screen -mt-50">
        <h2 className="font-extrabold text-[40px] md:text-[60px] text-center mt-16">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={1}
            showBorder={false}
          >
            Welcome to Ai Trip Planner:
          </GradientText>

          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={1}
            showBorder={false}
          >
            Personalized Itineraries at Your FingerPrints
          </GradientText>
        </h2>

        <p className="text-lg md:text-xl text-gray-400 text-center max-w-3xl">
          <ShinyText
            text="Your personalized itinerary awaits! Let our AI guide you through the world's wonders, creating a unique journey tailored just for you. Explore new destinations and experiences like never before. Start planning your dream trip today!"
            speed={1}
          />
        </p>

        <Link to="/create-trip">
          <Button>Get Started, It's Free</Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero

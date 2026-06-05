import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import CanvasScene from './three/CanvasScene'

import Hero from './sections/Hero'
import Exterior from './sections/Exterior'
import Aerodynamics from './sections/Aerodynamics'
import Performance from './sections/Performance'
import Interior from './sections/Interior'
import Configurator from './sections/Configurator'
import Specs from './sections/Specs'
import CTA from './sections/CTA'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <div className="relative w-full bg-[#050505] min-h-screen text-white">
      <Navbar />
      
      {/* Persistent Fullscreen Canvas */}
      <CanvasScene />
      
      {/* Scrollable Content Container */}
      <div className="relative z-10 w-full flex flex-col pointer-events-none">
        <Hero />
        <Exterior />
        <Aerodynamics />
        <Performance />
        <Interior />
        <Configurator />
        <Specs />
        <CTA />
      </div>
    </div>
  )
}

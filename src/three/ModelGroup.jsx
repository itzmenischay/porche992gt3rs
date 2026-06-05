import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ModelGroup({ children }) {
  const groupRef = useRef()
  const currentRotation = useRef(new THREE.Vector2(0, 0))

  useFrame((state) => {
    if (!groupRef.current) return

    // 1. Target calculation
    // Maximum limits: Y axis ±8 degrees, X axis ±3 degrees
    const maxY = 8 * (Math.PI / 180)
    const maxX = 3 * (Math.PI / 180)

    // Map normalized pointer coordinates [-1, 1] to max rotation
    // Invert pointer.y so moving mouse up pitches the car up naturally
    const targetY = state.pointer.x * maxY
    const targetX = -state.pointer.y * maxX

    // 2. Smooth interpolation (Mouse reactivity)
    // Using 0.03 alpha for slow, premium, organic weight
    currentRotation.current.x = THREE.MathUtils.lerp(currentRotation.current.x, targetX, 0.03)
    currentRotation.current.y = THREE.MathUtils.lerp(currentRotation.current.y, targetY, 0.03)

    // 3. Idle Motion (Breathing & Pitch)
    const time = state.clock.elapsedTime
    // Extremely subtle vertical movement, max amplitude 0.03
    const floatTarget = Math.sin(time * 1.5) * 0.03
    // Very subtle pitch oscillation, max 1 degree
    const pitchOffset = Math.sin(time * 1.0) * (1 * (Math.PI / 180))

    // 4. Combine and Apply
    // Mouse remains dominant because it drives the base rotation
    groupRef.current.rotation.x = currentRotation.current.x + pitchOffset
    groupRef.current.rotation.y = currentRotation.current.y
    
    // Smoothly apply floating motion
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, floatTarget, 0.05)
  })

  // Increased scale to 1.4 for a more dominant, immersive Apple Vision Pro hero look
  return (
    <group ref={groupRef} scale={1.4}>
      {children}
    </group>
  )
}

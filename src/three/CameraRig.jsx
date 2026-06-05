import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export default function CameraRig() {
  // Foundation for future GSAP cinematic movement
  const cameraPosition = useRef(new THREE.Vector3(0, 2, 8))
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((state) => {
    // 1. Subtle Mouse Reactivity (Apple Vision Pro style)
    // Upward mouse raises camera slightly, left/right shifts slightly
    const offsetX = state.pointer.x * 1.0
    const offsetY = state.pointer.y * 0.5

    // 2. Target position blends base position + mouse offset
    const targetPos = new THREE.Vector3(
      cameraPosition.current.x + offsetX,
      cameraPosition.current.y + offsetY,
      cameraPosition.current.z
    )

    // 3. Extremely smooth, weighty interpolation
    state.camera.position.lerp(targetPos, 0.03)

    // 4. Continuously look at the Porsche
    state.camera.lookAt(cameraTarget.current)
  })

  return null
}

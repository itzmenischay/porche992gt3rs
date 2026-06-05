import { useGLTF } from '@react-three/drei'
import { useMemo, useEffect } from 'react'
import { useCarStore } from '../store/useCarStore'
import * as THREE from 'three'

export default function CarModel(props) {
  const { scene } = useGLTF('/models/porche992/scene.gltf')
  const setIsLoaded = useCarStore((state) => state.setIsLoaded)

  useEffect(() => {
    if (scene) {
      setIsLoaded(true)
    }
  }, [scene, setIsLoaded])

  // Calculate pure bounds without mutating the globally cached scene
  const { scale, position } = useMemo(() => {
    if (!scene) return { scale: 1, position: [0, 0, 0] }

    // Ensure pristine state for calculations to prevent HMR accumulation bugs
    scene.position.set(0, 0, 0)
    scene.scale.set(1, 1, 1)
    scene.rotation.set(0, 0, 0)
    scene.updateMatrixWorld(true)

    const box = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()

    box.getSize(size)
    box.getCenter(center)

    const maxDim = Math.max(size.x, size.y, size.z)
    const safeMaxDim = maxDim > 0 ? maxDim : 1
    const targetSize = 4.5
    const computedScale = targetSize / safeMaxDim

    // Calculate position offset to center it and place bottom at y=0
    // Since we apply this as a prop, we multiply center by computedScale
    const computedPosition = [
      -center.x * computedScale,
      -box.min.y * computedScale,
      -center.z * computedScale
    ]

    return { scale: computedScale, position: computedPosition }
  }, [scene])

  return (
    <primitive 
      object={scene} 
      scale={scale} 
      position={position} 
      {...props} 
    />
  )
}

useGLTF.preload('/models/porche992/scene.gltf')

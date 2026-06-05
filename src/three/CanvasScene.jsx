import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import SceneDirector from './SceneDirector'

export default function CanvasScene() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        className="pointer-events-auto"
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      >
        <color attach="background" args={['#050505']} />
        <Suspense fallback={null}>
          <SceneDirector />
        </Suspense>
      </Canvas>
    </div>
  )
}

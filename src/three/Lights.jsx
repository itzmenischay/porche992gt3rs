export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      
      {/* Key Light */}
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
      />
      
      {/* Rim light to highlight contours */}
      <spotLight 
        position={[-5, 5, -5]} 
        intensity={2.5} 
        color="#ffffff" 
        penumbra={1} 
        castShadow 
      />
      
      {/* Back light for separation and premium feel */}
      <spotLight 
        position={[0, 5, -10]} 
        intensity={1.5} 
        color="#ffffff" 
        penumbra={0.5} 
      />
    </>
  )
}

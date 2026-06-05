import CarModel from './CarModel'
// import CameraRig from './CameraRig'
// import EnvironmentComponent from './Environment'
import Lights from './Lights'
// import { ContactShadows } from '@react-three/drei'

export default function SceneDirector() {
  return (
    <>
      {/* <CameraRig /> */}
      <Lights />
      {/* <EnvironmentComponent /> */}
      {/* <ContactShadows 
        position={[0, 0, 0]} 
        opacity={0.6} 
        scale={12} 
        blur={2} 
        far={4} 
        resolution={1024} 
        color="#000000" 
      /> */}
      <CarModel />
    </>
  )
}

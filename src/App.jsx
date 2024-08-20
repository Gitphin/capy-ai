import './App.css';
import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls, Stage } from "@react-three/drei";
import TextInput from './textinput/TextInput';

function Model(props) {
  const { scene } = useGLTF("/capyai3.glb");
  return <primitive object={scene} {...props} />;
}

function App() {
  return (
    <>
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 60, position: [50, 100, 700]}}
        style={{
          top: 0,
          left: 0,
          width: "100vw",
          height: "145vh",
          overflow: "hidden",
          backgroundColor: "#202020"
        }}
      >
        <color attach="background" args={["#202020"]} />
        <PresentationControls speed={1.5} global zoom={2} polar={[-0.1, Math.PI / 4]}>
          <Stage>
            <Model scale={2.5} />
          </Stage>
        </PresentationControls>
      </Canvas>
      <div style={{
        position: 'fixed',
        bottom: '35px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1,
      }}>
        <TextInput />
      </div>
    </>
  );
}

export default App;

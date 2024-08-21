import React, { useState } from 'react';
import './App.css';
import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls, Stage } from "@react-three/drei";
import TextInput from './textinput/TextInput';
import TextOutput from './textoutput/TextOutput';

function Model(props) {
  const { scene } = useGLTF("/capyai3.glb");
  return <primitive object={scene} {...props} />;
}

function App() {
  const [text, setText] = useState('Hello, I am a capybara!');

  const handleTextSubmit = (newText) => {
    setText(newText);
  };

  return (
    <>
      <TextOutput text={text} />
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 60, position: [50, 100, 700] }}
        style={{
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
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
      <TextInput onSubmit={handleTextSubmit} />
      </div>
    </>
  );
}

export default App;
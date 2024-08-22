import React, { useState } from 'react';
import './App.css';
import TextInput from './textinput/TextInput';
import TextOutput from './textoutput/TextOutput';
import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls, Stage } from "@react-three/drei";

function Model(props) {
  const { scene } = useGLTF("/capyai3.glb");
  return <primitive object={scene} {...props} />;
}

function App() {
  const [text, setText] = useState('Hello, I am a capybara!');

  const handle_text_submit = async (new_text) => {
    try {
      const response = await fetch('http://localhost:8000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: new_text }),
      });
      if (!response.ok) {
        throw new Error('Network response invalid');
      }
      const result = await response.json();
      setText(result.response);
    } catch (error) {
      console.error('Error:', error);
    }
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
          backgroundColor: "#202020",
        }}
      >
        <color attach="background" args={["#202020"]} />
        <PresentationControls speed={1.25} global zoom={2.5} polar={[-0.1, Math.PI / 4]}>
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
      }}>
        <TextInput onSubmit={handle_text_submit} />
      </div>
    </>
  );
}

export default App;

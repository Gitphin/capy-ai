import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [text, set_text] = useState('Hello, my name is Marty and I am a capybara!');
  const [is_typing, set_is_typing] = useState(false);
  const [r, setR] = useState(32);
  const [g, setG] = useState(32);
  const [b, setB] = useState(32);

  useEffect(() => {
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }, [r, g, b]);

  const handle_text_submit = async (new_text) => {
    set_is_typing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 250));
      const response = await axios.post('http://localhost:8000/api/submit', {
        text: new_text
      });
      if (response.status !== 200) {
        throw new Error('Network response invalid');
      }
      set_text(response.data.response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      set_is_typing(false);
    }
  };

  return (
    <>
      <TextOutput text={is_typing ? '...' : text} />
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
        }}
      >
        <color attach="background" args={[`rgb(${r}, ${g}, ${b})`]} />
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
      <sliders style={{
        position: 'fixed',
        top: '200px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
        <label>
          R:
          <input
            type="range"
            min="0"
            max="255"
            value={r}
            onChange={(e) => setR(e.target.value)}
          />
          {r}
        </label>
        <br />
        <label>
          G:
          <input
            type="range"
            min="0"
            max="255"
            value={g}
            onChange={(e) => setG(e.target.value)}
          />
          {g}
        </label>
        <br />
        <label>
          B:
          <input
            type="range"
            min="0"
            max="255"
            value={b}
            onChange={(e) => setB(e.target.value)}
          />
          {b}
        </label>
      </sliders>
    </>
  );
}

export default App;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TextInput from './textinput/TextInput';
import TextOutput from './textoutput/TextOutput';
import UserText from './usertext/UserText';
import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls, Stage } from "@react-three/drei";

function Model(props) {
  const { scene } = useGLTF("/capyai3.glb");
  return <primitive object={scene} {...props} />;
}

function generateUUID() {
  return self.crypto.randomUUID();
}

function App() {
  const [usertext, set_usertext] = useState('');
  const [text, set_responsetext] = useState('Hello, my name is Marty and I am a capybara!');
  const [is_typing, set_is_typing] = useState(false);
  const [r, set_r] = useState(32);
  const [g, set_g] = useState(32);
  const [b, set_b] = useState(32);

  useEffect(() => {
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }, [r, g, b]);

  const handle_text_submit = async (new_text) => {
    set_usertext(new_text);
    set_is_typing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 250));

      let session_id = sessionStorage.getItem('session_id');
      if (!session_id) {
        session_id = generateUUID();
        sessionStorage.setItem('session_id', session_id);
      }

      const response = await axios.post('https://capy-back.vercel.app/api/submit', {
        text: new_text,
        session_id: session_id
      });

      if (response.status !== 200) {
        throw new Error('Network response invalid');
      }

      set_responsetext(response.data.response);
   
    } catch (error) {
      console.error('Error:', error);
      set_responsetext('Error occurred, please try again.');
    } finally {
      set_is_typing(false);
    }
  };

  return (
    <>
      <UserText usertext={usertext} />
      <TextOutput text={is_typing ? '...' : text} />
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 60, position: [80, 100, 700] }}
        style={{
          top: 0,
          left: 0,
          width: "100vw",
          height: "60vh",
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
      <div className="sliders">
        <label>
          R:
          <input
            type="range"
            min="0"
            max="255"
            value={r}
            onChange={(e) => set_r(e.target.value)}
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
            onChange={(e) => set_g(e.target.value)}
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
            onChange={(e) => set_b(e.target.value)}
          />
          {b}
        </label>
      </div>
    </>
  );
}

export default App;

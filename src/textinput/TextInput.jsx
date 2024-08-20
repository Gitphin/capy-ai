import React, { useState } from 'react';
import styles from './textinput.module.css';

function TextInput({onSubmit }) {

    const handleTextSubmit = async (text) => {
    try {
      const response = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Response from backend:', result);
    } catch (error) {
      console.error('Error submitting text:', error);
    }
  };

  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(value);
    }
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.textInputContainer}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Talk to the capybara..."
        className={styles.textInput}
      />
      <button type="submit" className={styles.submitButton} onSubmit={handleTextSubmit}>OK</button>
    </form>
  );
}

export default TextInput;

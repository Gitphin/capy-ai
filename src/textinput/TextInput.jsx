import React, { useState } from 'react';
import styles from './textinput.module.css';

function TextInput({ onSubmit }) {
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
      <button type="submit" className={styles.submitButton}>OK</button>
    </form>
  );
}

export default TextInput;
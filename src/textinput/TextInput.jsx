import React, { useState } from 'react';
import styles from './textinput.module.css';
import git from "../../github.png";

function TextInput({ onSubmit }) {
  const [value, setValue] = useState('');

  const handle_change = (event) => {
    setValue(event.target.value);
  };
  const handle_submit = (event) => {
    event.preventDefault();
    if (value.trim() === '') {
      console.error('Error: Cannot submit empty text');
      return;
    }
    if (onSubmit) {
      onSubmit(value);
    }
    setValue('');
  };

  return (
    <>
      <a href="https://github.com/Gitphin/capy-ai"><img className={styles.git} src={git}></img></a>
      <form onSubmit={handle_submit} className={styles.textInputContainer}>
        <input
          type="text"
          value={value}
          onChange={handle_change}
          placeholder="Talk to the capybara..."
          className={styles.textInput}
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={value.trim() === ''}
        >
          OK
        </button>
      </form>
    </>
  );
}

export default TextInput;

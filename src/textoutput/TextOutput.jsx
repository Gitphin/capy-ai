import React from 'react';
import styles from './textoutput.module.css';
import capy from "../../capyicon.png";

export const TextOutput = ({ usertext, text }) => {
  return (
    <section className={styles.section}>
      <div className={styles.static}><img src={capy} alt="Capybara" /></div>
      <p className={styles.text}>{text}</p>
      <p className={styles.usertext}>{usertext}</p>
    </section>
  );
};

export default TextOutput;

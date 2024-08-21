import React from 'react';
import styles from './textoutput.module.css';
import capy from "../../capyicon.png";

export const TextOutput = ({ text }) => {
  return (
    <section>
      <img src={capy} alt="Capybara" />
      <text>{text}</text>
    </section>
  );
};

export default TextOutput;

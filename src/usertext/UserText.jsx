import React from 'react';
import styles from './usertext.module.css';

export const UserText = ({ usertext }) => {
  return (
    <section className={styles.section}>
      <h2>You: </h2>
      <p className={styles.usertext}>{usertext}</p>
    </section>
  );
};

export default UserText;
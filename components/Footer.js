import React from 'react';
import styles from '../styles/Footer.module.scss';
import { AiFillGithub, AiFillMail, AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconButton}>
        <a href="" target="_blank" rel="noopener noreferrer">
          <AiFillGithub />
        </a>
      </div>
      <div className={styles.iconButton}>
        <a
          href="https://www.linkedin.com/in/brian-chung-a2a72b196/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillLinkedin />
        </a>
      </div>
      <div className={styles.iconButton}>
        <a
          href="mailto:brian.chung.cs@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillMail />
          <span className={styles.email}>brian.chung.cs@gmail.com</span>
        </a>
      </div>
    </div>
  );
};

export default Footer;

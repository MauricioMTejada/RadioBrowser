import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import { Radio } from './Radio';

function App() {
  return (
    <div className={styles.App}>
    {/* <div> */}
        <h1>React - Radio Browser</h1>
        <h2>Select your radio style</h2>

        <Radio />

    </div>
  );
}

export default App;

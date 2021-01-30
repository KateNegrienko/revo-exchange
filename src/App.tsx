import React from 'react';
import theme from './App.module.scss';

function App() {
  return (
    <div className={theme.App}>
      <header className={theme['App-header']}>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={theme['App-link']}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

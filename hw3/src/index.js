import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const DATA = [
  {name: "test", id: "test", completed: false}
];
root.render(
  <React.StrictMode>
    <App tasks={DATA}/>
  </React.StrictMode>
);

reportWebVitals();

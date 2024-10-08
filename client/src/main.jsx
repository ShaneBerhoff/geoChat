import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeTheme } from './hooks/useTheme.jsx'
import { initializeFont } from './hooks/useFont.jsx'

initializeTheme();
initializeFont();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

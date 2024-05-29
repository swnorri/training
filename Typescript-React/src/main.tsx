import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App
      id={100}
      title="Starting Title"
      state="open"
    >This is children props</App>
  </React.StrictMode>
)

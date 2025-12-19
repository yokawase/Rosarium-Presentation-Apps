import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  // Fallback if HTML is broken, ensures developer sees the error on screen
  const errorDiv = document.createElement('div');
  errorDiv.innerHTML = "<h1>Fatal Error: Root element 'root' not found in DOM.</h1>";
  document.body.appendChild(errorDiv);
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Failed to mount React app:", error);
  // Re-throw to be caught by the global error handler in index.html
  throw error;
}
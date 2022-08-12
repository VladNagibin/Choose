import React from 'react'
import './index.css';
import { useRoutes } from './Routes';
import { BrowserRouter } from 'react-router-dom'

function App() {
  const routes = useRoutes(true)
  return (
    <BrowserRouter>
      <div>
        {routes}
      </div>
    </BrowserRouter>
  );
}

export default App;

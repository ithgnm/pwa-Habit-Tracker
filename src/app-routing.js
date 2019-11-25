import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/navbar.component'
import Login from './components/login.component';

function App() {

  return (

    <div>
      <Router>

        <Login />

        <Navbar />

        <Route path="/" />

      </Router>
    </div>
    
  );
}

export default App
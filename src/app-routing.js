import React from 'react'
import { withTranslate } from 'react-redux-multilingual'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/navbar.component'
import Login from './components/login.component';

function App({ translate }) {

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

export default withTranslate(App)
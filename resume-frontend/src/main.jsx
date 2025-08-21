import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import Root from "./pages/Root.jsx"
import About from './pages/About'
import Home from './pages/Home.jsx'
import Service from './pages/Service.jsx'
import Resume from './pages/Resume.jsx'
import Contact from './pages/Contact.jsx'

import { BrowserRouter, Route, Routes } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root/>} >
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Service />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

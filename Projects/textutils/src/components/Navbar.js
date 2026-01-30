import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


export default function Navbar({
  title = "Set Title Here",
  aboutText = "About Text Here",
  mode = 'light',
  toggleMode
}) {

  return (
    <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/about">{aboutText}</Link>
            </li>
          </ul>
          <div className="d-flex">
            <div className="bg-primary rounded mx-2" style={{height: '30px', width: '30px', cursor: 'pointer'}} cursor="pointer" onClick={()=>{toggleMode('primary')}}></div>
            <div className="bg-danger rounded mx-2" style={{height: '30px', width: '30px', cursor: 'pointer'}} cursor="pointer" onClick={()=>{toggleMode('danger')}}></div>
            <div className="bg-success rounded mx-2" style={{height: '30px', width: '30px', cursor: 'pointer'}} cursor="pointer" onClick={()=>{toggleMode('success')}}></div>
            <div className="bg-warning rounded mx-2" style={{height: '30px', width: '30px', cursor: 'pointer'}} cursor="pointer" onClick={()=>{toggleMode('warning')}}></div>
            <div className="bg-light rounded mx-2 border" style={{height: '30px', width: '30px', cursor: 'pointer'}} cursor="pointer" onClick={()=>{toggleMode('light')}}></div>
            <div className="bg-dark rounded mx-2" style={{height: '30px', width: '30px', cursor: 'pointer'}} cursor="pointer" onClick={()=>{toggleMode('dark')}}></div>
          </div>
          <div className={`form-check form-switch text-${mode === 'light' ? 'dark' : 'light'} mx-2`}>
              <input className="form-check-input" onClick={() => toggleMode(null)} type="checkbox" role="switch" id="switchCheckDefault" />
              <label className="form-check-label" htmlFor="switchCheckDefault">Toggle Mode</label>
          </div>
        </div>
      </div>
    </nav>
  )
}


Navbar.propTypes = {
  title: PropTypes.string,
  aboutText: PropTypes.string
}
       
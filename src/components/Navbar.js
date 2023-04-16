import React from 'react'
import "./Navbar.css";
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <div className="navbar-screen" style={{alignItems:"center",backgroundColor:"black",color:"white",height:"5.5vh",display:"flex",gap:"10px",paddingLeft:"20px"}}>
        <div className="nav-element"><Link to="/" style={{color:"white",textDecoration:"none"}}>Home</Link></div>
        <div className="nav-element"><Link to="/expense-graph" style={{color:"white",textDecoration:"none"}}>Expense Graph</Link></div>
    </div>
  )
}

export default Navbar
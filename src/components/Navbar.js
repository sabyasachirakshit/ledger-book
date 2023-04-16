import React from 'react'
import "./Navbar.css";
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <div className="navbar-screen" style={{alignItems:"center",backgroundColor:"black",color:"white",height:"15vh",display:"flex",gap:"5px",justifyContent:"center",flexDirection:"column"}}>
        <h2>SR LEDGER BOOK</h2>
        <div className="na-elements" style={{display:"flex",gap:"10px",justifyContent:"center"}}>
            <div className="nav-element"><Link to="/" style={{color:"white",textDecoration:"none"}}>Home</Link></div>
            <div className="nav-element"><Link to="/expense-graph" style={{color:"white",textDecoration:"none"}}>Expense Graph</Link></div>
        </div>
    </div>
  )
}

export default Navbar
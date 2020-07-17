import React from "react"
import "./Footer.css"
import { NavLink } from "react-router-dom"
import linkedin from "../../images/linkedin.png"
import github from "../../images/github.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <NavLink
          exact
          className="link"
          activeClassName="activelink"
          to="/about"
          style={{ textDecoration: "none" }}
        >
          <p>About</p>
        </NavLink>
      </div>
      <div className="logos">
        <a
          href="https://github.com/juliancesaro"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github} alt="Github Logo" width="30px" />
        </a>
        <a
          href="https://www.linkedin.com/in/juliancesaro/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedin} alt="Linkedin Logo" width="30px" />
        </a>
      </div>
    </footer>
  )
}

export default Footer

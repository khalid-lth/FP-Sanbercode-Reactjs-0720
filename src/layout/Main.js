import React from "react"
import { BrowserRouter as Router } from "react-router-dom";

import Header from './header'
import Section from "./Section"
import Footer from "./footer"


const Main = () =>{
  return(
    <>
      <Router>
        <Header/>        
        <Section/>
        <Footer/>
      </Router>
    </>
  )
}

export default Main
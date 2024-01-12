import React from 'react'
import './scrollup.css'
import { FaArrowUp } from "react-icons/fa";

const Scrollup = () => {
    window.addEventListener("scroll", function () {
        const scrollUp = document.querySelector(".scrollup")
        if (this.scrollY >= 560) scrollUp.classList.add("show-scroll")
        else scrollUp.classList.remove("show-scroll")
    })
  return (
    <a href="#" className="scrollup fixed w-8 h-8 z-50 transition-[4s] bg-organic-600 hover:bg-orange-600 flex justify-center items-center">
        {/* <i className="uil uil-arrow-up text-5xl"></i> */}
        <FaArrowUp className="text-white "/>
    </a>
  )
}

export default Scrollup
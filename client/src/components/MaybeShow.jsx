import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const MaybeShow = ({children}) => {
    const location = useLocation();
    const [showNavbar , setshowNavbar] = useState(false)
    useEffect(() => {
       if (location.pathname === "/" || location.pathname === "/register/now" || location.pathname === "/courses" || location.pathname === "/about" || location.pathname === "/about/chairman's-message" || location.pathname === "/about/rector's-message" || location.pathname === "/about/our-history"
       || location.pathname === "/event/:id"       ) {
        setshowNavbar(true)
       }
     
       else{
        setshowNavbar(false)
       }
    } , [location])
  return (
    <div>
      {showNavbar && children}
    </div>
  )
}

export default MaybeShow

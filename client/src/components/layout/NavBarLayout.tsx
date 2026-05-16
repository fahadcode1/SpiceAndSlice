import  Footer  from "./Footer"
import NavBar from "./Navbar"
import { Outlet } from "react-router-dom"

export default function NavBarLayout(){

    return(
        <>
        
        <NavBar />
         <Outlet />
        <Footer />
        
        </>
    )
}
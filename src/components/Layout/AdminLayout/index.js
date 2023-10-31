import Header from "./Header"
import Footer from "./Footer"
import RightSideBar from "./RightSideBar"

export default function AdminLayout({children}) {
    return (
        <div>
            <Header ></Header>
            <RightSideBar>
                {children}    
            </RightSideBar>
            <Footer></Footer>
        </div>
    )
}
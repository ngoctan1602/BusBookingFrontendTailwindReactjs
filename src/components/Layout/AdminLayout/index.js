import Header from "./Header"
import Footer from "./Footer"
import LeftSideBar from "./LeftSideBar"
import "./main.css"


export default function AdminLayout({children}) {
    return (
        <div className="layout">
            <section className="header">
                <Header/>
            </section>
            <section className="main">
                <section className="left-sidebar">
                    <LeftSideBar/>
                </section>
                <section  className="content">
                    {children}
                </section>   
            </section> 
            <Footer className="footer"/>
        </div>
    )
}